<template>
  <transition v-if="showModal" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  <i data-feather="credit-card" class="tx-primary tx-12"></i> New Discount
                </h5>
                <button @click="hideModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form action>
                  <div class="form-group mg-b-10">
                    <label for>Code</label>
                    <input id type="text" class="inputTime form-control" placeholder="10OFF" />
                  </div>
                  <div class="form-group mg-b-10">
                    <label for>Discount Type</label>
                    <select name id class="form-control">
                      <option value="Percentage" selected>Percentage</option>
                      <option value="Flat Rate">Flat Rate</option>
                    </select>
                  </div>
                  <div class="form-group mg-b-10">
                    <label for>Amount</label>
                    <input id type="text" class="inputTime form-control" placeholder="10" />
                  </div>
                  <div class="form-group mg-b-10">
                    <label for>Limit</label>
                    <input id type="text" class="inputTime form-control" placeholder="Optional" />
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Cancel</button>
                <button type="button" class="btn btn-primary">Add Disount</button>
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
  name: "NewDiscount",
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
      // console.log(
      //   "amaenity component: ",
      //   this.$store.state.showNewDiscountModal
      // );
      return this.$store.state.showNewDiscountModal;
    }
  },
  methods: {
    hideModal() {
      store.commit("setNewDiscountModalStatus", false);
    },
    addNewAmenity() {
      // console.log("adding new amenity");
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