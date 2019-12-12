<template>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  <i data-feather="clock" class="tx-primary tx-12"></i> New Time
                </h5>
                <button type="button" @click="hideModal" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form action>
                  <div class="form-group mg-b-10">
                    <label for>Earliest In</label>
                    <input
                      id
                      type="text"
                      class="inputTime form-control mg-t-10"
                      placeholder="hh:mm"
                    />
                  </div>
                  <div class="form-group mg-b-10">
                    <label for>Latest In</label>
                    <input
                      id
                      type="text"
                      class="inputTime form-control mg-t-10"
                      placeholder="hh:mm"
                    />
                  </div>
                  <div class="form-group mg-b-10">
                    <label for>Checkout</label>
                    <input
                      id
                      type="text"
                      class="inputTime form-control mg-t-10"
                      placeholder="hh:mm"
                    />
                  </div>
                  <div class="form-group mg-b-10">
                    <label for>Room Type</label>
                    <select name id class="form-control rooms" multiple="multiple">
                      <option value="All Rooms" selected>All Rooms</option>
                      <option value="Single Room">Single Room</option>
                      <option value="Double Room">Double Room</option>
                      <option value="Suite">Suite</option>
                      <option value="Duplex">Duplex</option>
                    </select>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Cancel</button>
                <button type="button" class="btn btn-primary">Add Timing</button>
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

// import {b-modal} from "bootstrap-vue";
// import { BModal } from "bootstrap-vue";

export default {
  name: "NewCheckin",
  data() {
    return {
      roomName: "",
      roomType: "",
      totalRooms: 0,
      price: 0
    };
  },
  components: {
    // BModal
  },
  computed: {
    showModal() {
      console.log(
        "amaenity component: ",
        this.$store.state.showNewCheckinModal
      );
      return this.$store.state.showNewCheckinModal;
    }
  },
  methods: {
    hideModal() {
      store.commit("setNewCheckinModalStatus", false);
    },
    addNewAmenity() {
      console.log("adding new amenity");
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