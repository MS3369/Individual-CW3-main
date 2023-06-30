<template>
    <div
        class="container"
        style="margin-top: 50px"
      >
        <main>
          <div class="row g-5">
            <div class="col-md-5 col-lg-4 order-md-last">
              <form class="d-flex" style="margin-right: 15px">
                <a
                  class=""
                  type="submit"
                >
                  <i class="bi-cart-fill me-1"></i>
                  Cart
                  <span class="badge bg-dark text-white ms-1 rounded-pill">{{
                    cartCount
                  }}</span>
                </a>
              </form>
              <ul class="list-group mb-3">
                <li
                  class="list-group-item d-flex justify-content-between lh-sm"
                  v-for="product in cart" :key="product.id"
                >
                  <div>
                    <h6 class="my-0">{{product.subject}}</h6>
                    <small class="text-muted"
                      >Quantity: {{product.space}}</small
                    >
                  </div>
                  <span class="text-muted">{{product.price}}</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                  <span>Total (AED)</span>
                  <strong>{{cartTotal}}</strong>
                </li>
              </ul>
            </div>

            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Billing address</h4>
              <form class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="firstName" class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="order.name"
                      placeholder="Name on ID"
                      required
                    />
                  </div>

                  <div class="col-12">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="order.email"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <input
                      type="text"
                      class="form-control"
                      id="address"
                      placeholder="Apt 8602, Marina Heights Tower"
                      v-model="order.address"
                      required
                    />
                  </div>

                  <div class="col-md-7">
                    <label for="state" class="form-label">State</label>
                    <select
                      v-model="order.state"
                      class="form-select"
                      id="state"
                      required
                    >
                      <option value="" disabled selected>Choose...</option>
                      <option
                        v-for="(state,key) in states" :key="key"
                        v-bind:value="state"
                      >
                        {{key}}
                      </option>
                    </select>
                  </div>

                  <div class="col-md-5">
                    <label for="zip" class="form-label">Zip</label>
                    <input

                      type="text"
                      class="form-control"
                      v-model.number="order.zip"
                      id="zip"
                      placeholder="00000"
                      required
                    />
                  </div>
                </div>

                <!-- <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="same-address"
                  />
                  <label class="form-check-label" for="same-address"
                    >Send as Gift</label
                  >
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="home"
                    value="Home"
                    v-model="order.method"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Home
                  </label>
                </div>

                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="business"
                    value="Business"
                    v-model="order.method"
                  />
                  <label class="form-check-label" for="flexRadioDefault1">
                    Business
                  </label>
                </div> -->

                <hr class="my-4" />

                <button
                  class="w-100 btn btn-primary btn-lg"
                  type="submit"
                  v-on:click="onSubmitCheckout"
                  style="margin-bottom: 25px"
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
  </template>

  <script>
  export default {
    name: "checkOut",
    data() {
      return {
        states: {
        AUH: "Abu Dhabi",
        AJM: "Ajman",
        DXB: "Dubai",
        FUJ: "Fujairah",
        RAK: "Ras Al Khaimah",
        SHJ: "Sharjah",
        UMM: "Umm Al Quwain",
      },
      cart: [], // Assuming you have a cart array with items
      order: {
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        state: "",
        method: "Home",
        gift: false,
      },
      };
    },
    computed: {
      cartTotal() {
  return this.cart.reduce(
    (total, product) => total + product.price * product.space,
    0
  );
},
cartCount() {
  let count = 0;
  this.cart.forEach((item) => {
    count += item.space;
  });
  return count;
},
  },
  methods: {
    navigateTo(page) {
      this.page = page;
    }
  }};
  </script>

  <style>
  /* Add custom styles here */
  </style>
