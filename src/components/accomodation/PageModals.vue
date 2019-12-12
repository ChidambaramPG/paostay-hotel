<template>
  <div>
      <NewRoom v-if="accomodatonSection=='rooms'"/>
      <NewAmenity v-if="accomodatonSection=='amenities'" />
      <NewCheckin v-if="accomodatonSection=='checkin'"/>    
      <NewDiscount v-if="accomodatonSection=='discount'"/>
      <NewRule v-if="accomodatonSection=='rules'"/>
      
  </div>
  
</template>

<script>
import firebase from "firebase";
import store from "../../store.js";
import NewRoom from "../modals/NewRoom.vue";
import NewAmenity from "../modals/NewAmenity.vue";
import NewCheckin from "../modals/NewCheckin.vue";
import NewDiscount from '../modals/NewDiscount.vue';
import NewRule from '../modals/NewRule.vue';

export default {
  name: "PageModals",
  data() {
    return {};
  },
  // methods: {
  //   showModal(){
  //     store.commit("setNewRoomsModalStatus",true);
  //   }
  // },
  computed: {
    accomodatonSection: () => store.state.accomodatonSection
  },
  components:{
      NewAmenity,
      NewRoom,
      NewCheckin,
      NewDiscount,
      NewRule
  }
};
</script>