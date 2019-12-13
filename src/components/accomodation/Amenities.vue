<template>
  <div class="col-lg-9 mg-t-5">
    <div class="card mg-b-10">
      <div class="row row-xs pd-25">
        <div class="col-md-4">
          <!-- {{allHotelAmenities}} -->
          <div class="custom-control custom-switch mg-b-15" v-for="(amenity,index) in allHotelAmenities" :key="index">
            <input v-if="amenity.status" type="checkbox" class="custom-control-input" :id="index" checked />
            <input v-else type="checkbox" class="custom-control-input" :id="index" />
            <label class="custom-control-label" :for="index">{{index}}</label>
          </div>
          
        </div>
        <!-- <div class="col-md-4">
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch6" checked />
            <label class="custom-control-label" for="customSwitch6">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch7" checked />
            <label class="custom-control-label" for="customSwitch7">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch8" checked />
            <label class="custom-control-label" for="customSwitch8">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch9" checked />
            <label class="custom-control-label" for="customSwitch9">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch10" checked />
            <label class="custom-control-label" for="customSwitch10">Swimming Pool</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch11" checked />
            <label class="custom-control-label" for="customSwitch11">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch12" checked />
            <label class="custom-control-label" for="customSwitch12">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch13" checked />
            <label class="custom-control-label" for="customSwitch13">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch14" checked />
            <label class="custom-control-label" for="customSwitch14">Swimming Pool</label>
          </div>
          <div class="custom-control custom-switch mg-b-15">
            <input type="checkbox" class="custom-control-input" id="customSwitch15" checked />
            <label class="custom-control-label" for="customSwitch15">Swimming Pool</label>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../../store.js"

export default {
  name: "Amenities",
  data() {
    return {
      amenities: {}
    };
  },
  mounted() {
    let btRef = firebase.firestore().collection("Hotels");
    let user = firebase.auth().currentUser;

    btRef.doc(user.uid).onSnapshot((snapshot) => {
      let ament = snapshot.data()["amenities"];
      // console.log(ament)
      store.commit("setAmenities",ament);
    });
  },
  methods: {
    showModal() {
      store.commit("setNewRoomsModalStatus", true);
    },
    
  },
  computed:{
    allHotelAmenities: () => store.state.amenities
  }
};
</script>