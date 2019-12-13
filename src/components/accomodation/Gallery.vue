<template>
  <div class="col-lg-9 mg-t-5">
    <GallerySection/>
    <div class="card mg-b-10">
      <div class="gallery pd-25">
        <div class="gallery-item" v-for="(image,index) in images" :key="index">
          <a class="popup-link" :href="image.data">
            <img :src="image.data" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <!-- <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div>
        <div class="gallery-item">
          <a class="popup-link" href="@/assets/img/1.png">
            <img src="@/assets/img/1.png" alt />
          </a>
          <a href="#" class="delete tx-pink" data-toggle="modal" data-target="#delete">
            <i data-feather="trash-2"></i>
          </a>
        </div> -->
      </div>
      <div class="card-footer bd-t-0"></div>

    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import GallerySection from "../accomodation/GallerySection.vue";


export default {

  name: "Gallery",
  data() {
    return {
      images:[]
    };
  },
  created() {

    // firebase.firestore()
    // // .collection("RoomImages")
    // .doc("RoomImages/"+firebase.auth().currentUser.uid)
    // .onSnapshot( snapshot => {

    //   // console.log(snapshot)
    //   // snapshot.forEach( img => {
    //   //   // console.log(img)
    //   // })
    // })
    firebase.firestore()
    .collection("RoomImages")
    .where("hotelId","==",firebase.auth().currentUser.uid)
    .get()
    .then( snapshot => {
      this.images = []
      // // console.log(snapshot)
      snapshot.forEach( img => {
        // console.log(img.data())
        let dt = img.data();
        this.images.push(dt)
      })
    })

  },
  methods: {
    showModal() {
      this.$store.commit("setNewRoomsModalStatus", true);
    }
  },
  computed: {
    accomodatonSection: () => this.$store.state.accomodatonSection
  },
  components: {
      GallerySection,
      
  }
};
</script>