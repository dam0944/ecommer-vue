<template>
  <div class="min-h-screen bg-base-100 p-8 flex flex-col lg:flex-row gap-10">
    <!-- Cart Items Section -->
    <div class="flex-1 border border-base-200 hover:border-primary/20 group p-8">
      <!-- Back Button -->
      <button class="btn btn-ghost btn-circle mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <!-- Title -->
      <h2 class="font-light text-3xl mb-8 tracking-wide">YOUR CART</h2>
      <!-- Cart Items -->
      <div class="space-y-6 mb-10 " >
        <div class="flex items-center bg-base-100 border-b pb-6 border border-base-200 hover:border-primary/20 group p-5">
          <button class="btn btn-ghost btn-circle mr-4 text-gray-400 hover:text-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6582/6582822_sd.jpg;maxHeight=1920;maxWidth=900?format=webp"
               alt="CBD Bath Bomb"
               class="w-16 h-16 rounded-lg object-cover mr-6" />

          <div class="flex items-center gap-2 mx-8">
              <button class="btn btn-outline btn-sm rounded-full font-bold min-h-0 h-9 w-9 text-lg transition hover:bg-base-200">-</button>
                <span class="font-bold text-base">1</span>
              <button class="btn btn-outline btn-sm rounded-full font-bold min-h-0 h-9 w-9 text-lg transition hover:bg-base-200">+</button>
          </div>
          <div class="font-bold text-lg w-28 text-right">$50.00</div>
        </div>
        <div class="flex items-center bg-base-100 border-b pb-6">
          <button class="btn btn-ghost btn-circle mr-4 text-gray-400 hover:text-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=80&q=80"
               alt="CBD Powder"
               class="w-16 h-16 rounded-lg object-cover mr-6" />
          <div class="flex items-center gap-2 mx-8">
            <button class="btn btn-outline btn-sm rounded-full font-bold min-h-0 h-9 w-9 text-lg transition hover:bg-base-200">-</button>
              <span class="font-bold text-base">1</span>
            <button class="btn btn-outline btn-sm rounded-full font-bold min-h-0 h-9 w-9 text-lg transition hover:bg-base-200">+</button>

          </div>
          <div class="font-bold text-lg w-28 text-right">$50.00</div>
        </div>
      </div>
      <!-- Coupon Section -->
      <div class="flex flex-col md:flex-row items-center gap-2 mt-8">
        <label class="text-gray-500 mb-2 md:mb-0">Have a coupon? Enter your code.</label>
        <input type="text" placeholder="Coupon code"
               class="input input-bordered w-40 max-w-xs mr-2" />
        <button class="btn border border-gray-300 bg-base-100 text-black font-bold">APPLY</button>
      </div>
      <div class="flex items-center gap-2 mt-4 mb-12">
        <input type="checkbox" class="checkbox checkbox-sm" />
        <span class="text-xs text-gray-500">UPDATE CART</span>
      </div>
    </div>
    <!-- Cart Totals Section -->
    <div class="w-full max-w-md mx-auto lg:mx-0 border-l px-8 border border-base-200 hover:border-primary/20 group">
      <h3 class="font-light text-2xl mb-8 tracking-wide">CART TOTALS</h3>
      <div class="space-y-2 mb-6">
        <div class="flex justify-between text-gray-500">
          <span>Shipping (3–5 Business Days)</span>
          <span class="font-bold text-black">Free</span>
        </div>
        <div class="flex justify-between text-gray-500">
          <span>TAX (estimated for the United States (US))</span>
          <span class="font-bold text-black">$0</span>
        </div>
        <div class="flex justify-between text-gray-500">
          <span>Subtotal</span>
          <span class="font-bold text-black">$100.00</span>
        </div>
        <div class="border-t"></div>
        <div class="flex justify-between items-center mt-3 text-black">
          <span class="font-bold text-lg">Total</span>
          <span class="font-bold text-lg">$100.00</span>
        </div>
      </div>
      <router-link to="/checkout" class="w-full">
        <button class="btn w-full bg-black text-white font-bold rounded-none h-12 text-lg mb-6">PROCEED TO CHECKOUT</button>
      </router-link>
      <div class="text-center">
        <a href="#" class="text-black hover:underline flex items-center justify-center gap-2 font-light text-base">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          CONTINUE SHOPPING
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Add cart logic and interactivity as needed!
</script>