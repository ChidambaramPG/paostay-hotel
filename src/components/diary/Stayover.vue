<template>
  <div class="card mg-b-10">
      
    <ul class="list-group list-group-flush tx-13">
      <li class="list-group-item d-flex pd-sm-x-20" v-for="(booking,index) in bookings" :key="index">
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <h5 class="tx-normal tx-rubik tx-spacing--1 mg-b-5">{{booking.username}}</h5>
            <span>
              <a
                href="#recent-booking"
                class="tx-underline off-canvas-menu tx-12 tx-color-03 mg-b-0 tx-rubik"
              >Booking #{{booking.id}}</a>
            </span>
          </div>
          <div class="mg-t-30">
            <span>{{getRoomTypeName(booking.roomTypeId)}}</span>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Booking type</small>
            <p class="tx-medium mg-b-0">Bed & Breakfast</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Nights</small>
            <p class="tx-medium mg-b-0">
              <i class="icon ion-md-moon tx-warning"></i> {{calculateDateDiffeence(booking.checkinDate,booking.checkoutDate)}}
            </p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Occupancy</small>
            <p class="tx-medium mg-b-0">{{booking.adultCount}} Adults, {{booking.childCount}} Children</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Balance</small>
            <p class="tx-medium mg-b-0">₹{{booking.totalAmount}}</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Arrival Time</small>
            <p class="tx-medium mg-b-0">Approx 3 PM</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Booked</small>
            <p class="tx-medium mg-b-0">{{dateConvert(booking.bookedDate)}}</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10">
            <small class="tx-12 tx-success mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> {{booking.paymentType}}
            </small>
          </div>
          <div class="mg-t-0">
            <!-- <small class="tx-12 tx-info mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> Group Booking
            </small> -->
          </div>
          <div class="mg-t-25">
            <!-- <button
              data-toggle="modal"
              data-target="#action"
              class="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
            >Check In</button> -->
          </div>
        </div>
      </li>
    </ul>
    <div class="card-footer bd-t-0"></div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../../store.js";

export default {
  name: "Stayover",
  data(){
    return{
      bookings:[]
    }
  },
  components: {
    
  },
  mounted() {
    firebase.firestore()
    .collection("Booking")
    .where("status","==","stayedover")
    .where("hotelId","==",firebase.auth().currentUser.uid)
    .get()
    .then( res => {
        res.forEach(booking => {
          console.log(booking)
          this.bookings.push({...booking.data(),id:booking.id})
        })
    })
  },
  methods: {
    getRoomTypeName(rid){
      let roomName = '';
      if(this.getRoomTypes.length >0){
        this.getRoomTypes.forEach(item => {
          // console.log(item.roomName,item.roomTypeId)
          if(rid == item.roomTypeId){
            roomName = item.roomName;
          }
        })
      }
      return roomName;
    },
    calculateDateDiffeence(d1, d2) {
      let date1 = new Date(d1.seconds * 1000);
      let date2 = new Date(d2.seconds * 1000);
      // console.log(d1);
      let timeDiff = date2.getTime() - date1.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);

      return Math.ceil(DaysDiff);
    },
    dateConvert(d1) {
      // console.log(d1);
      let date = new Date();
      if (d1 != undefined) {
        date = new Date(d1.seconds * 1000);
      }

      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      let conDt =
        date.getDate() +
        " " +
        monthNames[date.getMonth()] +
        " " +
        date.getFullYear() +
        " ";

      return conDt;
    },
  },
  computed:{
    getRoomTypes(){
      return store.state.roomTypes;
    }
  }
};
</script>