<template>
  <div class="titles">
    <ul class="steps steps-tab">

      <li v-if="gallerySection=='photos'" class="step-item active">
        <a href="#" class="step-link" @click.prevent="()=>setGallerySection('photos')">
          <span class="step-icon">
            <i data-feather="camera"></i>
          </span>
          <span class="step-title">
            Photos
            <span class="mg-l-10 tx-rubik">5</span>
          </span>
        </a>
      </li>
      <li v-else class="step-item" >
        <a href="#" class="step-link" @click.prevent="()=>setGallerySection('photos')">
          <span class="step-icon">
            <i data-feather="camera"></i>
          </span>
          <span class="step-title">
            Photos
            <span class="mg-l-10 tx-rubik">5</span>
          </span>
        </a>
      </li>

      <li class="step-item active" v-if="gallerySection=='rooms'">
        <a href="#" class="step-link" @click.prevent="()=>setGallerySection('rooms')">
          <span class="step-icon">
            <i data-feather="image"></i>
          </span>
          <span class="step-title">
            Rooms & Suite
            <span class="mg-l-10 tx-rubik">5</span>
          </span>
        </a>
      </li>
      <li class="step-item" v-else >
        <a href="#" class="step-link" @click.prevent="()=>setGallerySection('rooms')">
          <span class="step-icon">
            <i data-feather="image"></i>
          </span>
          <span class="step-title">
            Rooms & Suite
            <span class="mg-l-10 tx-rubik">5</span>
          </span>
        </a>
      </li>

      <li class="step-item active" v-if="gallerySection=='videos'">
        <a href="#" class="step-link" @click.prevent="()=>setGallerySection('videos')">
          <span class="step-icon">
            <i data-feather="youtube"></i>
          </span>
          <span class="step-title">
            Videos
            <span class="mg-l-10 tx-rubik">15</span>
          </span>
        </a>
      </li>
      <li class="step-item" v-else >
        <a href="#" class="step-link" @click.prevent="()=>setGallerySection('videos')">
          <span class="step-icon">
            <i data-feather="youtube"></i>
          </span>
          <span class="step-title">
            Videos
            <span class="mg-l-10 tx-rubik">15</span>
          </span>
        </a>
      </li>

    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../../store.js";

export default {
  name: "GallerySection",
  data() {
    return {};
  },
  methods: {
    setGallerySection(sec) {
      store.commit("setGallerySection", sec);
    }
  },
  computed: {
    gallerySection: () => store.state.gallerySection
  },
};
</script>