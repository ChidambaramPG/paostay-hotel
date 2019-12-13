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
                  <a href="#">Hotel Dashboard</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
              </ol>
            </nav>
            <h4 class="mg-b-0 tx-spacing--1">Yesterday, Today And The Next Four Weeks</h4>
          </div>
          <div class="d-none d-md-block">
            <button
              class="btn btn-sm pd-x-15 btn-primary btn-uppercase"
              data-toggle="modal"
              data-target="#reservation"
            >
              <i data-feather="plus-circle"></i> Create a new reservation
            </button>
          </div>
        </div>
        <div class="row row-xs">
          <div class="col-lg-12 col-xl-12 mg-t-10">
            <div class="d-none d-md-block">
              <button class="btn btn-xs pd-x-15 btn-light btn-uppercase">
                <i class="fa fa-arrow-left"></i>
              </button>
              <button 
                class="btn btn-xs pd-x-15 btn-white btn-uppercase mg-l-5" 
                v-for="(month,index) in months" 
                :id="index"
                @click="setSelectedMonth"
                :key="index"
              >
              {{month}}
              </button>
              
              <button class="btn btn-xs pd-x-15 btn-light btn-uppercase">
                <i class="fa fa-arrow-right"></i>
              </button>
            </div>

            <RoomAvalability/>

            <PendingRequests/>

            <ArrivingToday />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationMenu from '../components/NavigationMenu.vue';
import PendingRequests from "../components/dashboard/PendingRequests.vue";
import RoomAvalability from "../components/dashboard/RoomAvalability.vue";
import ArrivingToday from "../components/dashboard/ArrivingToday.vue";

import firebase from "firebase";
import store from "../store.js"

export default {
  name: "dashboard",
  data() {
    return {
      selectedMonth:"",
      selectedYear:"",
      months:["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
    };
  },
  created(){
      this.selectedMonth = store.state.selectedMonth;
      this.selectedYear = store.state.selectedYear;
  },
  methods: {
    setSelectedMonth: (e) => {
      // console.log(e.target.id)
      store.commit("setSelectedMonth",parseInt(e.target.id))
    }
  },
  components:{
    NavigationMenu,
    PendingRequests,
    RoomAvalability,
    ArrivingToday
  },
  computed:{
    selectedMonthComputed:function(){
      return store.state.selectedMonth; 
    }
  }
};


</script>