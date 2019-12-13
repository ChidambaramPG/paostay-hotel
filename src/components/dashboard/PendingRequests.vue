<template>
  <div class="card mg-b-10 mg-t-30">
    <div class="card-header d-flex align-items-start justify-content-between">
      <h6 class="lh-5 mg-b-0">
        Pending Requests
        <span class="badge badge-pill badge-primary">1</span>
      </h6>
    </div>
    <ul class="list-group list-group-flush tx-13">
      <li
        class="list-group-item d-flex pd-sm-x-20"
        v-for="(request,index) in pendingRequests"
        :key="index"
      >
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <h5 class="tx-normal tx-rubik tx-spacing--1 mg-b-5">{{request.username}}</h5>
            <span>
              <a
                href="#recent-booking"
                class="tx-underline off-canvas-menu tx-12 tx-color-03 mg-b-0 tx-rubik"
              >Booking #{{request.id}}</a>
            </span>
          </div>
          <div class="mg-t-30">
            <span>Double Room</span>
            <small class="tx-12 tx-success mg-b-0 tx-medium tx-uppercase">
              <i class="icon ion-md-checkmark"></i> Paid Online
            </small>
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
              <i class="icon ion-md-moon tx-warning"></i>
              {{Math.ceil(calculateDateDiffeence(request.checkinDate,request.checkoutDate))}}
            </p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Occupancy</small>
            <p
              class="tx-medium mg-b-0"
            >{{request.adultCount}} Adults, {{request.childCount}} Children</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Balance</small>
            <p class="tx-medium mg-b-0">₹{{request.totalAmount}}</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10 mg-b-20">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Arrival Time</small>
            <p class="tx-medium mg-b-0">Approx 3 PM</p>
          </div>
          <div class="mg-t-10">
            <small class="tx-12 tx-color-03 mg-b-0 tx-uppercase">Booked</small>
            <p class="tx-medium mg-b-0">{{dateConvert(request.bookedDate)}}</p>
          </div>
        </div>
        <div class="pd-sm-l-10 flex-fill">
          <div class="mg-t-10">
            <button
              class="btn btn-sm pd-x-15 btn-success btn-uppercase mg-l-5"
              data-toggle="modal"
              data-target="#request"
              :id="index"
              @click="(event) => acceptBookingRequest(event)"
            >
              <i data-feather="check-circle"></i> Confirm
            </button>
          </div>
          <div class="mg-t-25">
            <button class="btn btn-sm pd-x-15 btn-danger btn-uppercase mg-l-5">
              <i data-feather="x-circle"></i> Reject
            </button>
          </div>
        </div>
      </li>
    </ul>
    <div class="card-footer bd-t-0"></div>
    <SelectRooms/>
  </div>
</template>

<script>
// import NavigationMenu from '../components/NavigationMenu.vue';
import firebase from "firebase";
import store from "../../store.js"
import SelectRooms from "../modals/SelectRooms.vue"

export default {
  name: "PendingRequests",
  data() {
    return {
      pendingRequests: [],
      roomStatus: [],
      selectedRoomTypeDetails:[]
    };
  },
  created() {
    // console.log("requests fetching");
    let uid = firebase.auth().currentUser.uid;
    // console.log("uid", uid);

    firebase
      .firestore()
      .collection("Booking")
      .where("hotelId", "==", uid)
      .where("status","==","pending")
      .onSnapshot(snapshot => {
        // console.log("pending requests: ",snapshot);
        this.pendingRequests = [];
        snapshot.forEach(item => {
          // // console.log(item);
          this.pendingRequests.push({ ...item.data(), id: item.id });
        });
      });

  },
  methods: {
    calculateDateDiffeence(d1, d2) {
      let date1 = new Date(d1.seconds * 1000);
      let date2 = new Date(d2.seconds * 1000);
      // console.log(d1);
      let timeDiff = date2.getTime() - date1.getTime();
      let DaysDiff = timeDiff / (1000 * 3600 * 24);

      return DaysDiff;
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

    acceptBookingRequest(e){
      // console.log(e.target.id);
      let bookingIndex = e.target.id;
      // console.log("request selected for assigning room")
      store.commit("setSelectedBooking",this.pendingRequests[bookingIndex]);
      store.commit("setRoomSelectionModalStatus",true);
    }
  },
  components: {
    SelectRooms
  }
};
</script>