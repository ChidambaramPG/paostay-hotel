<template>
  <div class="col-lg-9 mg-t-5">
    <div class="card mg-b-10">
      <div class="table-responsive pd-25">
        <table class="table table-dashboard mg-b-0">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Limit</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>10OFF</td>
              <td>Percentage</td>
              <td>10</td>
              <td>5</td>
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
// import GallerySection from "../accomodation/GallerySection.vue";

export default {
  name: "DiscountCode",
  data() {
    return {};
  },
  created() {},
  methods: {
    showModal() {
      this.$store.commit("setNewDiscountCodeModalStatus", true);
    }
  },
  computed: {
    // accomodatonSection: () => this.$store.state.accomodatonSection
  },
  components: {
    //   GallerySection
  }
};
</script>