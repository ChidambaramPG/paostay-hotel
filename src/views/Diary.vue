<template>
  <div>
    <NavigationMenu />
    <div class="content content-fixed min-vh-100">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div
          class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30"
        >
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-style1 mg-b-10">
                <li class="breadcrumb-item">
                  <a href="#">Hotel Diary</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Arrival
                </li>
              </ol>
            </nav>
            <div class="d-flex">
              <div class="mg-r-20">
                <button class="btn btn-xs pd-x-15 btn-primary btn-uppercase">
                  Today
                </button>
              </div>
              <div class="mg-r-20">
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-xs pd-x-15 btn-white btn-uppercase"
                  >
                    <i class="fa fa-arrow-left"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-xs pd-x-15 btn-white btn-uppercase"
                  >
                    <i class="fa fa-arrow-right"></i>
                  </button>
                </div>
              </div>
              <div class="mg-r-20 mg-t-2">
                <h4 class="mg-b-0 tx-spacing--1">
                  {{ "Tuesday, 12 May 2019" }}
                </h4>
              </div>
              <div id="datepicker1" class="mg-r-20">
                <a href="#">
                  <i data-feather="calendar"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-xs">
          <div class="col-lg-12 col-xl-12 mg-t-10">
            <div class="titles">
              <ul class="steps steps-tab">
                <li class="step-item">
                  <a
                    href=""
                    class="step-link"
                    @click.prevent="() => changeDiaySection('arrival')"
                  >
                    <span class="step-icon">
                      <i
                        class="fas fa-handshake selected-section"
                        v-if="dSection == 'arrival'"
                      ></i>
                      <i class="fas fa-handshake" v-else></i>
                    </span>
                    <span class="step-title">
                      Arrival
                      <span class="mg-l-10 tx-rubik"></span>
                    </span>
                  </a>
                </li>
                <li class="step-item">
                  <a
                    href=""
                    class="step-link"
                    @click.prevent="() => changeDiaySection('departure')"
                  >
                    <span class="step-icon">
                      <i
                        class="fas fa-car selected-section"
                        v-if="dSection == 'departure'"
                      ></i>
                      <i class="fas fa-car" v-else></i>
                    </span>
                    <span class="step-title">
                      Departure
                      <span class="mg-l-10 tx-rubik"></span>
                    </span>
                  </a>
                </li>
                <li class="step-item">
                  <a
                    href=""
                    class="step-link"
                    @click.prevent="() => changeDiaySection('stayover')"
                  >
                    <span class="step-icon">
                      <i
                        class=" fas fa-briefcase selected-section"
                        v-if="dSection == 'stayover'"
                      ></i>
                      <i class=" fas fa-briefcase" v-else></i>
                    </span>
                    <span class="step-title">
                      Stay Over
                      <span class="mg-l-10 tx-rubik"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <Arrival v-if="dSection == 'arrival'" />
            <Departure v-if="dSection == 'departure'" />
            <Stayover v-if="dSection == 'stayover'" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import store from "../store.js";
import NavigationMenu from "../components/NavigationMenu.vue";
import Arrival from "../components/diary/Arrival.vue";
import Departure from "../components/diary/Departure.vue";
import Stayover from "../components/diary/Stayover.vue";

export default {
  name: "Diary",
  components: {
    NavigationMenu,
    Arrival,
    Departure,
    Stayover
  },
  created() {
    // firebase.firestore().collection.
  },
  computed: {
    dSection: function() {
      return store.state.diarySection;
    }
  },
  methods: {
    changeDiaySection(sec) {
      // console.log("section: ",sec)
      store.commit("setDiarySection", sec);
    }
  }
};
</script>
<style scoped>
.selected-section {
  color: #0168fa;
}
</style>
