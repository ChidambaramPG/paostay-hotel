
<template>
  <div class="col-lg-3 mg-t-5">
    <div class="card mg-b-10 pd-25">
      <ul class="steps steps-vertical">
        <li class="step-item active">
          <a href="accomodation.html" class="step-link">
            <span class="step-icon">
              <i data-feather="layers"></i>
            </span>
            <span class="step-title" @click.prevent="()=>setAccomodationSection('rooms')">Rooms</span>
          </a>
        </li>
        <li class="step-item">
          <a href="#" class="step-link">
            <span class="step-icon">
              <i data-feather="radio"></i>
            </span>
            <span class="step-title" @click.prevent="()=>setAccomodationSection('amenities')">Amenities</span>
          </a>
        </li>
        <li class="step-item">
          <a href="#" class="step-link">
            <span class="step-icon">
              <i data-feather="clock"></i>
            </span>
            <span class="step-title" @click.prevent="()=>setAccomodationSection('checkin')">Check-in Time</span>
          </a>
        </li>
        <li class="step-item">
          <a href="galleries.html" class="step-link">
            <span class="step-icon">
              <i data-feather="image"></i>
            </span>
            <span class="step-title" @click.prevent="()=>setAccomodationSection('gallery')">Galleries</span>
          </a>
        </li>
        <li class="step-item">
          <a href="discount-code.html" class="step-link">
            <span class="step-icon">
              <i data-feather="credit-card"></i>
            </span>
            <span class="step-title" @click.prevent="()=>setAccomodationSection('discount')">Discount Code</span>
          </a>
        </li>
        <li class="step-item">
          <a href="hotel-rules.html" class="step-link">
            <span class="step-icon">
              <i data-feather="alert-triangle"></i>
            </span>
            <span class="step-title" @click.prevent="()=>setAccomodationSection('rules')">Hotel Rules</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>


export default {
  name: "Sidebar",
  methods: {
    setAccomodationSection(accSec){

      this.$store.commit("setAccomodationSection",accSec)

    }
  },
};


</script>