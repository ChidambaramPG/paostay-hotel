<template>
  <div class="row row-xs">
    <div class="col-lg-12 col-xl-12 mg-t-10">
      <div class="card mg-b-10">
        <div class="table-responsive pd-25">
          <table class="table table-dashboard mg-b-0" id="booking-history">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Type</th>
                <th>User Name</th>
                <th>Transaction</th>
                <th>Invoice</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(booking,index) in getBookings" :key="index">
                <td>{{dateConvert(booking.bookedDate)}}</td>
                <th>3:30pm</th>
                <td class="tx-success">{{booking.paymentType}}</td>
                <td>{{booking.username}}</td>

                <td v-if="booking.paymentType == 'online'">
                  Payment Recieved
                  <!-- <a href="#recent-booking" class="off-canvas-menu">#10322</a> -->
                </td>

                <td v-else-if="booking.status == 'checkin'">
                  Payment Recieved
                  <!-- <a href="#recent-booking" class="off-canvas-menu">#10322</a> -->
                </td>
                <td v-else-if="booking.status == 'accepted'">
                  Payment Yet To Recieve
                  <!-- <a href="#recent-booking" class="off-canvas-menu">#10322</a> -->
                </td>
                <td v-else>
                  Payment Yet To Recieve
                  <!-- <a href="#recent-booking" class="off-canvas-menu">#10322</a> -->
                </td>
                <td>
                  <a href="invoice.html" target="_blank">
                    <i class="fas fa-file-invoice-dollar"></i>
                  </a>
                </td>
                <td class="tx-teal">₹{{booking.totalAmount}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store.js';
export default {
  name: "PaymentList",
  data(){
      return{
          bookingList:[],
          bookingFetched:false
      }
  },
  computed: {
      getBookings(){
          return store.state.allBookings
      }
  },
  created(){
      if(this.getBookings.length<1 && this.bookingFetched == false){
          store.dispatch('getAllBookings')
      }
      
  },
  methods: {
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
};
</script>

<style></style>
