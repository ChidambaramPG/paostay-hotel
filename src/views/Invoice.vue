<template>
  <section>
    <div class="content content-fixed bd-b">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div class="d-sm-flex align-items-center justify-content-between">
          <div>
            <h4 class="mg-b-5">Invoice #</h4>
            <p class="mg-b-0 tx-color-03">April 21, 2019</p>
          </div>
          <div class="mg-t-20 mg-sm-t-0">
            <button class="btn btn-white">
              <i data-feather="printer" class="mg-r-5"></i> Print
            </button>
            <button class="btn btn-white mg-l-5">
              <i data-feather="mail" class="mg-r-5"></i> Email
            </button>
          </div>
        </div>
      </div>
      <!-- container -->
    </div>

    <div class="content">
      <div class="container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div class="row">
          <div class="col-md-12">
            <div class="card pd-40">
              <div class="row">
                <div class="col-sm-6">
                  <label
                    class="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03"
                    >Billed From</label
                  >
                  <h6 class="tx-15 mg-b-10">Villesman Solutions</h6>
                  <p class="mg-b-0">
                    Abdul Azeez Haji Building, Kaithakkad.P.O <br />
                    Kasargod, Kerala, 671313
                  </p>
                  <p class="mg-b-0">Tel No: 324 445-4544</p>
                  <p class="mg-b-0">Email: info@paostay.com</p>
                </div>
                <!-- col -->
                <div class="col-sm-6 tx-right d-none d-md-block">
                  <label
                    class="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03"
                    >Invoice Number</label
                  >
                  <h1 class="tx-normal tx-color-04 mg-b-10 tx-spacing--2">
                    #PS032AZ00022
                  </h1>
                </div>
                <!-- col -->
                <div class="col-sm-6 col-lg-8 mg-t-40 mg-sm-t-0 mg-md-t-40">
                  <label
                    class="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03"
                    >Billed To</label
                  >
                  <h6 class="tx-15 mg-b-10">Bruce Wayne</h6>
                  <p class="mg-b-0">
                    4033 Patterson Road, Staten Island, NY 10301
                  </p>
                  <p class="mg-b-0">Tel No: 324 445-4544</p>
                  <p class="mg-b-0">Email: bruce@gmail.com</p>
                </div>
                <!-- col -->
                <div class="col-sm-6 col-lg-4 mg-t-40">
                  <label
                    class="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03"
                    >Invoice Information</label
                  >
                  <ul class="list-unstyled lh-7">
                    <li class="d-flex justify-content-between">
                      <span>Invoice Number</span>
                      <span>PS032AZ00022</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      <span>Booking ID</span>
                      <span>32334300</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      <span>Issue Date</span>
                      <span>January 20, 2019</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="table-responsive mg-t-40">
                <table class="table table-invoice bd-b">
                  <thead>
                    <tr>
                      <th class="wd-20p">Hotel</th>
                      <th class="wd-40p d-none d-sm-table-cell">Details</th>
                      <th class="tx-center">Nights</th>
                      <th class="tx-right">Occupancy</th>
                      <th class="tx-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="tx-nowrap">Hotel Hill View</td>
                      <td class="d-none d-sm-table-cell tx-color-03">
                        Booked Deluxe Suite from 12 May 2019 to 16 May 2019
                      </td>
                      <td class="tx-center">4</td>
                      <td class="tx-right">2 Adults,1 Children</td>
                      <td class="tx-right">₹3000.00</td>
                    </tr>
                    <tr>
                      <td class="tx-nowrap">Hotel Hill View</td>
                      <td class="d-none d-sm-table-cell tx-color-03">
                        Booked Double Room from 12 May 2019 to 16 May 2019
                      </td>
                      <td class="tx-center">4</td>
                      <td class="tx-right">2 Adults,1 Children</td>
                      <td class="tx-right">₹3000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="row justify-content-between">
                <div
                  class="col-sm-6 col-lg-6 order-2 order-sm-0 mg-t-40 mg-sm-t-0"
                >
                  <label
                    class="tx-sans tx-uppercase tx-10 tx-medium tx-spacing-1 tx-color-03"
                    >Notes</label
                  >
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
                <div class="col-sm-6 col-lg-4 order-1 order-sm-0">
                  <ul class="list-unstyled lh-7 pd-r-10">
                    <li class="d-flex justify-content-between">
                      <span>Sub-Total</span>
                      <span>₹5,750.00</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      <span>Tax (5%)</span>
                      <span>₹287.50</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      <span>Discount</span>
                      <span>-₹50.00</span>
                    </li>
                    <li class="d-flex justify-content-between">
                      <strong>Total</strong>
                      <strong>₹5,987.50</strong>
                    </li>
                  </ul>
                  <button class="btn btn-block btn-primary">
                    <i data-feather="printer" class="mg-r-5"></i> Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from '../store.js';
export default {
    name:'Invoice',
    computed:{
        getInvoiceItem(){
            return store.state.invoiceItem;
        }
    }
};
</script>

<style></style>
