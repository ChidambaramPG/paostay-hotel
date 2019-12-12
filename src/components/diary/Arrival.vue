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
              >Booking #{{booking.bookingId}}</a>
            </span>
          </div>
          <div class="mg-t-30">
            <span>Double Room</span>
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
              <i class="icon ion-md-moon tx-warning"></i> 4
            </p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Occupancy</small>
            <p class="tx-medium mg-b-0">2 Adults, 1 Children</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Balance</small>
            <p class="tx-medium mg-b-0">₹1200</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Arrival Time</small>
            <p class="tx-medium mg-b-0">Approx 3 PM</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Booked</small>
            <p class="tx-medium mg-b-0">12 May 2019</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10">
            <small class="tx-12 tx-success mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> Paid Online
            </small>
          </div>
          <div class="mg-t-0">
            <small class="tx-12 tx-info mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> Group Booking
            </small>
          </div>
          <div class="mg-t-25">
            <button
              data-toggle="modal"
              data-target="#action"
              class="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5"
            >Check In</button>
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
  name: "Arrival",
  data(){
      return {
          bookings:[]
      }
  },
  components: {
    
  },
  created() {
    let tday = new Date();
    firebase.firestore()
    .collection("Booking")
    .where("status","==","accepted")
    .where("hotelId","==",firebase.auth().currentUser.uid)
    .get()
    .then( res => {
        res.forEach((booking,index) => {
            console.log(booking.data());
            console.log(booking.id);
            // this.bookings.push(booking)

            let chkDt = new Date(booking.data().checkinDate.seconds * 1000)

            // if(chkDt.getTime() == tday.getTime()){
                this.bookings.push({...booking.data(),bookingId:booking.id})
            // }

        })
    })
  },
  methods: {
    
  }
};
</script>