<template>
  <div class="col-lg-9 mg-t-5">
    <div class="card mg-b-10">
      <div class="table-responsive pd-25">
        <table class="table table-dashboard mg-b-0">
          <thead>
            <tr>
              <th>Rule</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Welcome Guests Of All Nationalities</td>
              <td>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1" checked />
                  <label class="custom-control-label" for="customSwitch1">Active</label>
                </div>
              </td>
              <td>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#new-item"
                  class="tx-rubik tx-medium tx-uppercase"
                >Edit</a>
              </td>
            </tr>
            <tr>
              <td>Check In After 12:00 PM</td>
              <td>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1" checked />
                  <label class="custom-control-label" for="customSwitch1">Active</label>
                </div>
              </td>
              <td>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#new-item"
                  class="tx-rubik tx-medium tx-uppercase"
                >Edit</a>
              </td>
            </tr>
            <tr>
              <td>Check Out Before 11:00 AM</td>
              <td>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1" checked />
                  <label class="custom-control-label" for="customSwitch1">Active</label>
                </div>
              </td>
              <td>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#new-item"
                  class="tx-rubik tx-medium tx-uppercase"
                >Edit</a>
              </td>
            </tr>
            <tr>
              <td>Wifi- Network Is Off By 12:00 PM</td>
              <td>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch1" checked />
                  <label class="custom-control-label" for="customSwitch1">Active</label>
                </div>
              </td>
              <td>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#new-item"
                  class="tx-rubik tx-medium tx-uppercase"
                >Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  name: "HotelRules",
  data() {
    return {};
  },
  created() {},
  methods: {
    showModal() {
      this.$store.commit("setNewRoomsModalStatus", true);
    }
  },
  computed: {
    accomodatonSection: () => this.$store.state.accomodatonSection
  },
  components: {}
};
</script>