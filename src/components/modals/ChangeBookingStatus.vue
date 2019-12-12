<template>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                        <i data-feather="radio" class="tx-primary tx-12"></i> Change Status
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="form-group mg-b-10">
                            <label for="">Reservation Status</label>
                            <select class="form-control" id="bookingStatus" v-model="bookingStatus">
                              <option value="canceled">Cancel Reservaton</option>
                              <option value="checkedout">Checkout</option>
                              <option value="stayedover">Stay Over</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Cancel</button>
                    <button type="button" class="btn btn-primary" @click="changeBookingStatus">Change Status</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import firebase from "firebase";
import store from "../../store.js";

export default {
  name: "ChangeBookingStatus",
  data(){
      return {
          roomName:"",
          roomType:"",
          totalRooms:0,
          price:0,
          bookingStatus:""
      }
  },
  components: {
    // BModal
  },
  computed: {
    showModal() {
      console.log("showChangeBookingStatusModal component: ", this.$store.state.showChangeBookingStatusModal);
      return this.$store.state.showChangeBookingStatusModal;
    }
  },
  methods:{
      hideModal(){
          store.commit("setChangeBookingStatusModalStatus",false);
      },
      changeBookingStatus(){
        let selectedBookingId = store.state.selectedBooking.id;
        firebase.firestore().collection("Booking").doc(selectedBookingId).update({
          status:this.bookingStatus
        });
        store.commit("setChangeBookingStatusModalStatus",false);
        console.log(this.bookingStatus)
        // this.$router.go()
      }
  }

};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  /* padding: 20px 30px; */
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>