<template>
  <header class="navbar navbar-header navbar-header-fixed">
    <a href id="mainMenuOpen" class="burger-menu">
      <i data-feather="menu"></i>
    </a>
    <div class="navbar-brand">
      <a href="index.html" class="df-logo">
        <img src="../assets/img/logo-h.png" alt width="80" />
      </a>
    </div>
    <NavbarMenu/>
    <div class="navbar-right">
      <NotificationDropdown/>
      <ProfileDropdown/>
    </div>
  </header>
</template>

<script>
import firebase from "firebase";
import ProfileDropdown from "./header/ProfileDropdown.vue";
import NavbarMenu from "./header/NavbarMenu.vue";
import NotificationDropdown from "./header/NotificationDropdown.vue";

export default {
  name: "NavigationMenu",
  components:{
    ProfileDropdown,
    NavbarMenu,
    NotificationDropdown
  }
};

</script>