<template>
  <div class="col-lg-9 mg-t-5">
    <div class="card mg-b-10">
      <div class="table-responsive pd-25">
        <table class="table table-dashboard mg-b-0">
          <thead>
            <tr>
              <th>Earliest In</th>
              <th>Latest In</th>
              <th>Check out</th>
              <th>Rooms</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>03:00 PM</td>
              <td>07:00 PM</td>
              <td>11:00 AM</td>
              <td>All Rooms</td>
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
                  data-target="#new-room"
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
  name: "Checkin",
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