import Vue from "vue";
import Vuex from "vuex";

import firebase from "firebase";
import router from "./router";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    regFormFields: [],
    regFormPage: 1,
    amenities: [],
    accomodatonSection:"rooms",
    showNewRoomsModal:false,
    roomTypes:[],
    showNewAmenityModal:false,
    showNewCheckinModal:false,
    gallerySection:"photos",
    showNewDiscountModal:false,
    showNewRuleModal:false,
    showRoomSelectionModal:false,
    selectedBooking:[],
    selectedRoomAvailablty:[],
    selectedMonth:(new Date).getMonth(),
    selectedYear:(new Date).getFullYear(),
    computedRoomsMetrix:[],
    showChangeBookingStatusModal:false,
    statusChangehangeBookingId:0,
    showBookingStatCanvas:false,
    diarySection:"arrival",
    allBookings:[]
  },
  mutations: {
    SET_REG_FORM_STEP: (state, payload) => {
      // console.log(payload)
      state.regFormPage = payload;
    },
    INCR_REG_FORM_STEP: state => {
      // console.log("INCR_REG_FORM_STEP");
      state.regFormPage++;
    },
    DECR_REG_FORM_STEP: state => {
      // console.log("DECR_REG_FORM_STEP");
      state.regFormPage--;
    },
    PUSH_REG_FORM_FIELDS: (state, payload) => {
      // console.log(payload);
      state.regFormFields = { ...state.regFormFields , ...payload };
    },

// ---------------------------- Modals ----------------------------
    setNewRoomsModalStatus: (state, payload) => {
      // console.log(payload);
      state.showNewRoomsModal = payload;
    },
    setNewAmenityModalStatus:(state, payload) => {
      // console.log(payload);
      state.showNewAmenityModal = payload;
    },
    setNewCheckinModalStatus:(state, payload) => {
      // console.log(payload);
      state.showNewCheckinModal = payload;
    },
    setNewRuleModalStatus:(state, payload) => {
      // console.log(payload);
      state.showNewRuleModal = payload;
    },
    setRoomSelectionModalStatus:(state, payload) => {
      // console.log(payload);
      state.showRoomSelectionModal = payload;
    },
    setChangeBookingStatusModalStatus: (state,payload) => {
      state.showChangeBookingStatusModal = payload;
    },
// ---------------------------- Offcanvas ----------------------------

    setBookingStatCanvasStatus: (state,payload) => {
      state.showBookingStatCanvas = payload;
    },

// ---------------------------- Accomodation ----------------------------
    setSelectedRoomAvailablty:(state, payload) => {
      // console.log(payload);
      state.selectedRoomAvailablty = payload;
    },

    setSelectedMonth:(state, payload) => {
      // console.log("selected month: ",payload);
      state.selectedMonth = payload;
    },
    setSelectedYear:(state, payload) => {
      // console.log(payload);
      state.selectedYear = payload;
    },
    setComputedRoomsMetrix:(state,payload) => {
      // console.log("computed array: ",payload)
      state.computedRoomsMetrix = payload;
    },
    setStatusChangehangeBookingId:(state,payload) => {
      state.statusChangehangeBookingId = payload;
    },
    setRoomTypes: (state,payload) => {
      // console.log("setting new rooms")
      // console.log(payload)
      // console.log("----------")
      state.roomTypes = payload;
    },
// ---------------------------- Diary ----------------------------

    setDiarySection: (state,payload) => {
      state.diarySection = payload
    },

// ---------------------------- Pages ----------------------------
    
    setAccomodationSection: (state,payload) => {
      state.accomodatonSection = payload;
    },
    setGallerySection: (state,payload) => {
      state.gallerySection = payload;
    },
    setNewDiscountModalStatus: (state,payload) => {
      state.showNewDiscountModal = payload;
    },
    setAmenities: (state,payload) => {
      // console.log(payload)
      state.amenities = payload;
    },
    setSelectedBooking: (state,payload) =>{
      // console.log("setting booking", payload)
      state.selectedBooking = payload;
    },



    GET_ALL_AMENITIES: state => {
      let db = firebase.firestore();
      let btRef = db.collection("Amenities");
      btRef
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // console.log(doc.id, " => ", doc.data());
            state.amenities.push(doc);
          });
        })
        .catch(function(error) {
          // console.log("Error getting document:", error);
        });
    },
    SET_HOTEL_DETAILS: (state) => {
      // console.log("SET_HOTEL_DETAILS");

      let db = firebase.firestore();
      let btRef = db.collection("Hotels");
      let userId = null;
      let data = {...state.regFormFields,status:'pending',roles:'hotel-owner'}
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          userId = user.uid;
          btRef
            .doc(userId)
            .set(data)
            .then(function() {
              // console.log("success");
              router.replace('dashboard');
            })
            .catch(function(error) {
              console.error("Error writing document: ", error);
            });
        } else {
          // console.log("not logged in");
        }
      });

    },

    setBookings: (state,payload) => {
      state.allBookings = payload;
    }
  },
  actions: {
    SET_HOTEL_DETAILS: (context) => {
      context.commit('SET_HOTEL_DETAILS')
    },
    GET_ROOM_TYPES: async ({commit}) => {

    },
    getAllBookings: ({state,commit}) => {
      firebase.firestore().collection("Booking").where('hotelId','==',firebase.auth().currentUser.uid).get()
      .then( resp => {
        let bkngs = [];
        
        resp.forEach( item => {
          console.log(item.data())
          bkngs.push({...item.data(),bid:item.id})
        })
        commit('setBookings',bkngs);

      })
    }
  },

});
