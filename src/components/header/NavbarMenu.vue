<template>
  <div id="navbarMenu" class="navbar-menu-wrapper">
      <div class="navbar-menu-header">
        <router-link to="/" class="df-logo">
          Pao
          <span>Stay</span>
        </router-link>
        <router-link id="mainMenuClose" to="/">
          <i data-feather="x"></i>
        </router-link>
      </div>
      <ul class="nav navbar-menu">
        <li class="nav-item">
          <router-link to="dashboard" class="nav-link">
            <i data-feather="box"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="diary" class="nav-link">
            <i data-feather="box"></i> diary
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="bookings" class="nav-link">
            <i data-feather="box"></i> bookings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="accomodation" class="nav-link">
            <i data-feather="box"></i> accomodation
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="payments" class="nav-link">
            <i data-feather="box"></i> payments
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="reviews" class="nav-link">
            <i data-feather="box"></i> reviews
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="my-staff" class="nav-link">
            <i data-feather="box"></i> my staff
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="reports" class="nav-link">
            <i data-feather="box"></i> reports
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>


export default {
  name: "NavbarMenu",
  
};

</script>