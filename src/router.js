import firebase from "firebase";
import Vue from "vue";
import Router from "vue-router";

import Signup from "./views/Signup.vue";
import Signin from "./views/Signin.vue";
import Dashboard from "./views/Dashboard.vue";
import RegisterForm from "./views/RegistrationForm.vue";
import Accomodation from "./views/Accomodation.vue";
import Bookings from "./views/Bookings.vue";
import Diary from "./views/Diary.vue";
import Payments from './views/Payments.vue';
import Invoice from './views/Invoice.vue';

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "signup",
      component: Signup
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: RegisterForm,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/accomodation",
      name: "accomodaton",
      component: Accomodation,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/bookings",
      name: "bookings",
      component: Bookings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/diary",
      name: "diary",
      component: Diary,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/payments",
      name: "payments",
      component: Payments,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/invoice",
      name: "invoice",
      component: Invoice,
      meta: {
        requiresAuth: true
      }
    },
  ]
});

router.beforeEach(async (to, from, next) => {
  const currentUser = await firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const authCheck = await firebase.firestore().collection("HotelOwners").get().then( res => res.empty ? false: true)
  
  // console.log("<----------- BEFORE EACH ----------->");
  // console.log("current user: ", currentUser);
  // console.log("requires auth : ", requiresAuth);
  // console.log("auth check",authCheck)

  if (requiresAuth && !currentUser) next("signin");
  else if (!requiresAuth && currentUser ) next("dashboard");
  else next();

});

export default router;
