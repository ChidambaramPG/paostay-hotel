<template>
  
    <div id="recent-booking" class="off-canvas off-canvas-overlay off-canvas-right wd-300">
      <a href="#" class="close">
        <i data-feather="x"></i>
      </a>
      <div class="pd-25">
        <h4>Booking Details</h4>
        <ul class="list-group list-group-flush mg-b-0 tx-13">
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Booking ID</span>
            <span class="tx-rubik">#978</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Hotel Name</span>
            <span class="tx-rubik">Hotel Hill View</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">User Name</span>
            <span class="tx-rubik">Bruce Wayne</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Room Type</span>
            <span class="tx-rubik">Double Room</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Occupancy</span>
            <span class="tx-rubik">2 Adults,1 Children</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Nights</span>
            <span class="tx-rubik">3</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Price</span>
            <span class="tx-rubik">₹1200</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Payment Type</span>
            <span class="tx-rubik">Online Payment</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Booking Type</span>
            <span class="tx-rubik">Bed & Breakfast</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Arrival</span>
            <span class="tx-rubik">12 May 2019</span>
          </li>
          <li class="list-group-item pd-x-0 d-flex justify-content-between">
            <span class="tx-medium">Departure</span>
            <span class="tx-rubik">12 May 2019</span>
          </li>
        </ul>
      </div>
    </div>
  
</template>

<script>

import store from "../../store.js";

export default {
    
  name: "BookingDetails",
  data() {
    return {};
  },
 
  
};
</script>

<style>
    
</style>