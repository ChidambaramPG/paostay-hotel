<template>
  <div>
    <NavigationMenu />
    <div class="content content-fixed">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <TopBanner/>
        <div class="row row-xs">
          <div class="col-lg-12 col-xl-12 mg-t-10">
            <div class="card mg-b-10">
              <div class="card-header">
                <div>
                  <h6 class="mg-b-0">Your Most Recent Bookings</h6>
                  <!-- <p class="tx-13 tx-color-03 mg-b-0">Your last 10 Bookings</p> -->
                </div>
              </div>
              <div class="table-responsive pd-25">
                <table class="table table-dashboard mg-b-0" id="booking-history">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Hotel Name</th>
                      <th>Nights</th>
                      <th>Occupancy</th>
                      <th>Price</th>
                      <th>Arrival</th>
                      <th>Departure</th>
                      <th>Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(booking,index) in bookings" :key="index">
                      <td>{{showBookedDate(booking.bookedDate)}}</td>
                      <td>#975</td>
                      <td>{{booking.username}}</td>
                      <td>{{booking.hotelName}}</td>
                      <td>{{calculateNumDays(booking.checkinDate,booking.checkoutDate,)}}</td>
                      <td>{{booking.adultCount}} Adults,{{booking.childCount}} Children</td>
                      <td>₹{{booking.totalAmount}}</td>
                      <td>{{formatDate(booking.checkinDate)}}</td>
                      <td>{{formatDate(booking.checkoutDate)}}</td>
                      <td>
                        <span 
                          class="d-inline-block wd-7 ht-7 bg-primary rounded-circle mg-r-5" 
                          v-if="booking.status == 'accepted'">
                        </span>
                        <span 
                          class="d-inline-block wd-7 ht-7 bg-success rounded-circle mg-r-5" 
                          v-if="booking.status == 'checkedout'">
                        </span>
                        <span 
                          class="d-inline-block wd-7 ht-7 bg-pink rounded-circle mg-r-5" 
                          v-if="booking.status == 'stayedover'">
                        </span>
                        {{booking.status}}
                      </td>
                      <td class="tx-medium">
                        <a href="#recent-booking" class="off-canvas-menu">View Details</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="bookingCanvas">
      <BookingDetails/>
    </div>
  </div>
</template>

<script>

import NavigationMenu from "../components/NavigationMenu.vue";
import TopBanner from "../components/bookings/TopBanner.vue";
import BookingDetails from "../components/offcanvas/BookingDetails.vue";
import store from "../store.js";
import firebase from "firebase";

export default {
  name: "Bookings",
  data(){
    return{
      bookings:[]
    }
  },
  methods:{
    showBookingDet(e){
      // console.log(e)
      store.commit("setBookingStatCanvasStatus",true);
    },
    showDetailsCanvas: function(){

    },
    showBookedDate(dt){
      let dat = new Date(dt.seconds * 1000)
      // console.log(dat)
      return dat.getDate()+"/"+dat.getMonth()+"/"+dat.getFullYear()
    },
    calculateNumDays(d1,d2){
      let cin = new Date(d1.seconds *1000)
      let cout = new Date(d2.seconds *1000)

      let diffTime = Math.abs(cout-cin)

      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    formatDate(d1){
      let dat = new Date(d1.seconds * 1000)
      let months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
      return dat.getDate()+" "+ months[dat.getMonth()]+" "+dat.getFullYear();
    }
    
  },
  created(){
    firebase.firestore()
    .collection("Booking")
    .where("hotelId","==",firebase.auth().currentUser.uid)
    .get()
    .then( snapshot => {
      // console.log(snapshot)
      snapshot.forEach( bkng => {
        // console.log(bkng.data());
        this.bookings.push(bkng.data());
      })
    })
  },  
  components: {
    NavigationMenu,
    TopBanner,
    BookingDetails
  },
};
</script>

