<template>
  <div>
    <NavigationMenu />
    <div class="content content-fixed">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div
          class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30"
        >
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb breadcrumb-style1 mg-b-10">
                <li class="breadcrumb-item"><a href="#">Payment History</a></li>
                <li class="breadcrumb-item active" aria-current="page">
                  This Week Transactions
                </li>
              </ol>
            </nav>
            <h4 class="mg-b-0 tx-spacing--1">Recent Transactions</h4>
          </div>
          <div class="d-none d-md-block">
            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase mg-l-5">
              <i data-feather="upload" class="wd-10 mg-r-5"></i> Export
            </button>
            <button class="btn btn-sm pd-x-15 btn-primary btn-uppercase">
              This Week
            </button>
            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase mg-l-5">
              This Month
            </button>
            <button class="btn btn-sm pd-x-15 btn-white btn-uppercase mg-l-5">
              All Time
            </button>
          </div>
        </div>
        <payments-header/>
        <payment-list/>
      </div>
    </div>
  </div>
</template>

<script>
import PaymentsHeader from '../components/payments/PaymentsHeader.vue';
import PaymentList from '../components/payments/PaymentList.vue';
import NavigationMenu from '../components/NavigationMenu.vue';
export default {
  name: "Payments",
  components:{
      PaymentsHeader,
      PaymentList,
      NavigationMenu
  }
};
</script>

<style></style>
