<template>
  <div>
    <NavigationMenu />

    <div class="content content-fixed">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <SubHeaders/>
        <div class="row row-xs">
          <sidebar/>
          <Rooms v-if="accomodatonSection=='rooms'"/>
          <Amenities v-if="accomodatonSection=='amenities'"/>
          <Checkin v-if="accomodatonSection=='checkin'"/>
          <Gallery v-if="accomodatonSection=='gallery'"/>
          <DiscountCode v-if="accomodatonSection=='discount'"/>
          <HotelRules v-if="accomodatonSection=='rules'"/>

        </div>
      </div>
    </div>
    <PageModals/>
    
  </div>
</template>

<script>
import NavigationMenu from "../components/NavigationMenu.vue";
import NewRoom from "../components/modals/NewRoom.vue";
import firebase from "firebase";
import Sidebar from "../components/accomodation/Sidebar.vue";
import Rooms from "../components/accomodation/Rooms.vue";
import Amenities from "../components/accomodation/Amenities.vue";
import SubHeaders from "../components/accomodation/SubHeaders.vue";
import store from "../store.js";
import PageModals from "../components/accomodation/PageModals.vue";
import Checkin from "../components/accomodation/Checkin.vue";
import Gallery from "../components/accomodation/Gallery.vue";
import DiscountCode from "../components/accomodation/DiscountCode.vue";
import HotelRules from "../components/accomodation/HotelRules.vue";

export default {
  name: "Accomodation",
  data() {
    return {

    };
  },
  created() {},
  methods: {
    showModal(){
      store.commit("setNewRoomsModalStatus",true);
    }
  },
  computed: {
    accomodatonSection: () => store.state.accomodatonSection
  },
  components: {
    NavigationMenu,
    NewRoom,
    Sidebar,
    Rooms,
    Amenities,
    SubHeaders,
    PageModals,
    Checkin,
    Gallery,
    DiscountCode,
    HotelRules
  }
};
</script>