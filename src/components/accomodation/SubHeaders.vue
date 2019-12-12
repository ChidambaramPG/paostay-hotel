<template>
  <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
    <div v-if="accomodatonSection=='rooms'">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Hotel Accomodation</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Rooms</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">Available Rooms</h4>
    </div>
    <div class="d-none d-md-block" v-if="accomodatonSection=='rooms'">
      <button class="btn btn-sm pd-x-15 btn-primary btn-uppercase" @click="showModal">
        <i data-feather="plus-circle"></i> Add New Room
      </button>
    </div>
    <div v-if="accomodatonSection=='amenities'">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Booking Accomodation</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Amenities</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">Available Amenities</h4>
    </div>
    <div class="d-none d-md-block" v-if="accomodatonSection=='amenities'">
      <button
        class="btn btn-sm pd-x-15 btn-primary btn-uppercase"
        data-toggle="modal"
        data-target="#new-amenity"
        @click="showAmenityModal"
      >
        <i data-feather="plus-circle"></i> Add Amenity
      </button>
    </div>
    <div v-if="accomodatonSection=='checkin'">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Booking Accomodation</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Check-in Time</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">Available Times</h4>
    </div>
    <div class="d-none d-md-block" v-if="accomodatonSection=='checkin'">
      <button
        @click="showCheckinModal"
        class="btn btn-sm pd-x-15 btn-primary btn-uppercase"
        data-toggle="modal"
        data-target="#new-item"
      >
        <i data-feather="plus-circle"></i> Add New Timing
      </button>
    </div>
    <div v-if="accomodatonSection=='gallery'">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Hotel Accomodation</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Galleries</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">Photos</h4>
    </div>
    <div class="d-none d-md-block" v-if="accomodatonSection=='gallery'">
      <div class="fileUpload btn btn-sm pd-x-15 btn-primary btn-uppercase">
        <span>
          <i data-feather="plus-circle"></i> Add New
        </span>
        <input type="file" class="upload" />
      </div>
    </div>
    <div v-if="accomodatonSection=='discount'">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Booking Accomodation</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Discount Code</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">Available Discounts</h4>
    </div>
    <div class="d-none d-md-block" v-if="accomodatonSection=='discount'">
      <button
        class="btn btn-sm pd-x-15 btn-primary btn-uppercase"
        data-toggle="modal"
        data-target="#new-item"
        @click="showNewDiscountModal"
      >
        <i data-feather="plus-circle"></i> Add New Discount
      </button>
    </div>
    <div v-if="accomodatonSection=='rules'">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb breadcrumb-style1 mg-b-10">
          <li class="breadcrumb-item">
            <a href="#">Booking Accomodation</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Hotel Rules</li>
        </ol>
      </nav>
      <h4 class="mg-b-0 tx-spacing--1">Available Rules</h4>
    </div>
    <div class="d-none d-md-block" v-if="accomodatonSection=='rules'">
      <button
        class="btn btn-sm pd-x-15 btn-primary btn-uppercase"
        data-toggle="modal"
        data-target="#new-item"
        @click="showNewRuleModal"
      >
        <i data-feather="plus-circle"></i> Add New Rule
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../../store.js";

export default {
  name: "SubHeaders",
  data() {
    return {};
  },
  methods: {
    showModal() {
      store.commit("setNewRoomsModalStatus", true);
    },
    showAmenityModal() {
      store.commit("setNewAmenityModalStatus", true);
    },
    showCheckinModal() {
      store.commit("setNewCheckinModalStatus", true);
    },
    showNewDiscountModal() {
      store.commit("setNewDiscountModalStatus", true);
    },
    showNewRuleModal() {
      store.commit("setNewRuleModalStatus", true);
    }
  },
  computed: {
    accomodatonSection: () => store.state.accomodatonSection
  }
};
</script>