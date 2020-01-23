<template>
  <div class="card mg-b-10 mg-t-30">
    <div class="card-header d-flex align-items-start justify-content-between">
      <h6 class="lh-5 mg-b-0">
        Arriving Today
        <span class="badge badge-pill badge-info">{{arrivingTodayRequests.length}}</span>
      </h6>
    </div>
    <ul class="list-group list-group-flush tx-13">
      <li
        class="list-group-item d-flex pd-sm-x-20"
        v-for="(arrival, index) in arrivingTodayRequests"
        :key="index"
      >
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <h5 class="tx-normal tx-rubik tx-spacing--1 mg-b-5">
              {{ arrival.username }}
            </h5>
            <span>
              <a
                href="#recent-booking"
                class="tx-underline off-canvas-menu tx-12 tx-color-03 mg-b-0 tx-rubik"
                >Booking #928</a
              >
            </span>
          </div>
          <div class="mg-t-30">
            <span>Double Room</span>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase"
              >Booking type</small
            >
            <p class="tx-medium mg-b-0">Bed & Breakfast</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Nights</small>
            <p class="tx-medium mg-b-0">
              <i class="icon ion-md-moon tx-warning"></i> {{ 4 }}
            </p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase"
              >Occupancy</small
            >
            <p class="tx-medium mg-b-0">
              {{ arrival.adultCount }} Adults, {{ arrival.childCount }} Children
            </p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Balance</small>
            <p class="tx-medium mg-b-0">₹{{ arrival.totalAmount }}</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase"
              >Arrival Time</small
            >
            <p class="tx-medium mg-b-0">Approx 3 PM</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Booked</small>
            <p class="tx-medium mg-b-0">{{dateConvert(arrival.bookedDate)}}</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10">
            <small class="tx-12 tx-success mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> {{ arrival.paymentType }}
            </small>
          </div>
          <div class="mg-t-0">
            <!-- <small class="tx-12 tx-info mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> Group Booking
            </small> -->
          </div>
          <div class="mg-t-25">
            <button class="btn btn-sm pd-x-15 btn-primary btn-uppercase mg-l-5" :id="index" @click="(event) => acceptBookingRequest(event)">
              Check In
            </button>
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
  name: "ArrivingToday",
  data() {
    return {
      arrivingTodayRequests: [],
      roomStatus: [],
      selectedRoomTypeDetails: []
    };
  },
  methods: {
    acceptBookingRequest(e) {
      // console.log(e.target.id);
      let bookingIndex = e.target.id;
      // console.log("request selected for assigning room")
      store.commit("setSelectedBooking", this.arrivingTodayRequests[bookingIndex]);
      store.commit("setRoomSelectionModalStatus", true);
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
  created() {
    // console.log("arrival requests fetching");
    let uid = firebase.auth().currentUser.uid;
    // console.log("uid", uid);

    firebase
      .firestore()
      .collection("Booking")
      .where("hotelId", "==", uid)
      .where("status", "==", "pending")
      // .where("checkinDate", "==", new Date())
      .onSnapshot(snapshot => {
        // console.log("todays arrival requests: ", snapshot);
        this.arrivingTodayRequests = [];
        snapshot.forEach(item => {
          // // console.log(item);
          let arDate = new Date(item.data().checkinDate.seconds * 1000);
          let arDt = new Date(
            arDate.getFullYear(),
            arDate.getMonth(),
            arDate.getDate()
          );
          // console.log(arDt)
          let tdy = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          );
          // console.log(tdy.getTime(), arDt.getTime());

          if (arDt.getTime() == tdy.getTime()) {
            this.arrivingTodayRequests.push({ ...item.data(), id: item.id });
          }
        });
      });
  }
};
</script>
