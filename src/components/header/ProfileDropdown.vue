<template>
  <div class="dropdown dropdown-profile">
    <a
      style="background-color:transparent"
      class="dropdown-link dropdown-toggle"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      id="user-profile-dropdown"
    >
      <div class="avatar avatar-sm">
        <img
          src="https://via.placeholder.com/500"
          class="rounded-circle"
          alt=""
        />
      </div>
    </a>
    <div
      class="dropdown-menu dropdown-menu-right tx-13"
      aria-labelledby="dropdownMenuLink"
    >
      <div class="avatar avatar-lg mg-b-15">
        <img
          src="https://via.placeholder.com/500"
          class="rounded-circle"
          alt=""
        />
      </div>
      <h6 class="tx-semibold mg-b-5">{{username}}</h6>
      <p class="mg-b-25 tx-12 tx-color-03">{{status}}</p>
      <router-link to="account" class="dropdown-item"
        ><i data-feather="edit-3"></i> Edit Profile</router-link
      >
      <div class="dropdown-divider"></div>
      <router-link to="help-center" class="dropdown-item"
        ><i data-feather="help-circle"></i> Help Center</router-link
      >
      <router-link to="staff" class="dropdown-item"
        ><i data-feather="users"></i> Staff</router-link
      >
      <router-link to="account" class="dropdown-item"
        ><i data-feather="settings"></i>Account Settings</router-link
      >
      <a @click.prevent="logout" class="dropdown-item"
        ><i data-feather="log-out"></i>Sign Out</a
      >
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "ProfileDopdown",
  data() {
    return {
      userDetails: [],
      username:'',
      hotel:'',
      email:'',
      status:''
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/");
        });
    }
  },
  created() {
    let user = firebase.auth().currentUser;
    let uid = user.uid;

    firebase.firestore().collection("HotelOwners").doc(uid).get().then( resp => {
        console.log(resp.data())
        this.username = resp.data().name;
        this.hotel = resp.data().hotel;
        this.email = resp.data().email;
        this.status = resp.data().status;
    })
  }
};
</script>
