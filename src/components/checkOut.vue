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
                
              </ul>
            </div>

            <div class="col-md-7 col-lg-8">
              <h4 class="mb-3">Billing information</h4>
              <form class="needs-validation" novalidate>
                <div class="row g-3">
                  <div class="col-12">
                    <label for="firstName" class="form-label">Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      v-model="user.name"
                      placeholder="Please enter your Name"
                      required
                    />
                  </div>

                  <div class="col-12">
                    <label for="email" class="form-label">Email</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="user.email"
                      placeholder="you@example.com"
                    />
                  </div>

                  
                </div>

                
                <hr class="my-4" />

                <button  class="w-100 btn btn-primary btn-lg" value="Checkout" @click="submitCheckout"  style="margin-bottom: 25px">
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
    },
    submitCheckout() {
      // Update the space property of lessons in the cart
      this.cart.forEach((item) => {
        const lessonIndex = this.lessons.findIndex(
          (lesson) => lesson.id === item.id
        );
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].space += 1;
        }
      });

      // Create the order object with updated space property
      const order = {
        checkoutName: this.user.name,
        checkoutemail: this.user.email,
        cartProduct: this.cart,
      };

      // Send the order to the server
      fetch("http://localhost:3000/collection/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        cache: "no-store",
        body : JSON.stringify(order),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Order submitted:", data);
          alert(data.message);
          // Handle the response data here (e.g., show a success message)
        })
        .catch((error) => {
          console.log("Error submitting order:", error);
          // Handle the error here (e.g., show an error message)
        });

      // Reset the cart
      this.cart = [];
      // Reset the user details
      this.user = {
        name: "",
        email: "",
        //method: "Home",
        
      };
      
    },
    
            cart: [], // Assuming you have a cart array with items
      user: {
        name: "",
        email: "",
        //method: "Home",
        
      },







   }
            
};
  </script>

  <style>

  </style>
