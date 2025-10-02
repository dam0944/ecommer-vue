<template>
  <div class="bg-[#f7f9fb] min-h-screen py-4">
    <div class="container mx-auto">
      <h4 class="font-bold text-xl mb-3">Shopping Cart</h4>
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Cart Items -->
        <div class="w-full lg:w-2/3">
          <div class="bg-white rounded-2xl border shadow-sm p-4">
            <!-- Store Row -->
            <div class="flex items-center mb-3 flex-wrap">
              <input type="checkbox" class="accent-blue-600 mr-2" />
              <i class="bi bi-shop mr-2 text-blue-600"></i>
              <a href="#" class="font-semibold text-blue-600 hover:underline">Sh Computer</a>
            </div>
            <!-- Product List -->
            <div v-for="(item, index) in 2" :key="index" class="bg-white p-4 mb-3 border rounded-2xl">
              <div class="flex flex-col md:flex-row md:items-center md:gap-4">
                <div class="flex-shrink-0 flex items-center justify-center mb-2 md:mb-0 w-24">
                  <img
                    :src="index === 0 ? 'https://tse3.mm.bing.net/th/id/OIP.wHI91aLlJ30hoichG5P-9QHaF7?pid=Api&P=0&h=220' : 'https://tse3.mm.bing.net/th/id/OIP.MoJbrnYIP8PH9I-AaSbBYwHaFS?pid=Api&P=0&h=220'"
                    alt="Product Image"
                    class="rounded border object-cover w-20 h-20 mx-auto"
                  />
                </div>
                <div class="flex-1">
                  <div class="font-semibold text-sm">Asus VivoBook S16 Copilot+ PC S3607QA</div>
                  <div class="text-gray-500 text-xs">Variant: Gray-1TB-16GB</div>
                  <div class="text-xs mt-1">
                    Color: <span class="font-semibold">Gray</span> |
                    Storage: <span class="font-semibold">1TB</span> |
                    RAM: <span class="font-semibold">16GB</span>
                  </div>
                </div>
                <!-- Desktop View -->
                <div class="hidden md:flex md:flex-row md:items-center md:justify-between md:w-1/2 gap-4">
                  <div class="text-right">
                    <div class="font-bold">$899.00</div>
                    <div class="text-gray-400 text-xs">(Tax: $0.00)</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="number" class="w-16 h-10 text-center border rounded-lg" min="1" :value="1" disabled />
                    <button class="text-red-500 hover:text-red-700" @click="removeItem()">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="font-bold">$899.00</div>
                </div>
                <!-- Mobile View -->
                <div class="md:hidden mt-2 w-full">
                  <div class="flex justify-between">
                    <div>
                      <span class="font-bold">$899.00</span> <small class="text-gray-400">(Tax: $0.00)</small>
                    </div>
                    <button class="text-red-500 hover:text-red-700" @click="removeItem()">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="flex items-center mt-2 gap-2">
                    <input type="number" class="w-12 h-9 text-center border rounded-lg" min="1" :value="1" disabled />
                    <div class="font-bold ml-auto">Total: $899.00</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Order Note -->
            <div class="mt-4">
              <div class="font-semibold mb-2">Order Note (Optional)</div>
              <textarea class="w-full border rounded-lg p-2 min-h-[80px]" rows="3" placeholder="Type your note here..."></textarea>
            </div>
          </div>
        </div>
        <!-- Cart Summary -->
        <div class="w-full lg:w-1/3">
          <div class="bg-white rounded-2xl border shadow-sm p-6">
            <div class="mb-2 flex justify-between">
              <span>Sub total</span>
              <span class="font-bold">$0.00</span>
            </div>
            <div class="mb-2 flex justify-between">
              <span>Tax</span>
              <span class="font-bold">$0.00</span>
            </div>
            <div class="mb-2 flex justify-between">
              <span>Shipping</span>
              <span class="font-bold">$0.00</span>
            </div>
            <div class="mb-2 flex justify-between">
              <span>Discount</span>
              <span class="font-bold text-blue-600">- $0.00</span>
            </div>
            <div class="flex my-3">
              <span class="inline-flex items-center px-3 bg-white border border-r-0 border-gray-200 rounded-l-lg"><i class="bi bi-ticket-perforated"></i></span>
              <input type="text" class="flex-1 border border-gray-200 rounded-none rounded-r-lg px-3" placeholder="Coupon code" />
              <button class="ml-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4" type="button">APPLY</button>
            </div>
            <div class="flex justify-between border-t pt-3 font-bold">
              <span>Total</span>
              <span>$0.00</span>
            </div>
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg w-full mt-4 py-3 transition">Proceed to Checkout</button>
            <div class="text-center mt-3">
              <a href="#" class="text-blue-600 font-semibold hover:underline flex items-center justify-center gap-1">
                <i class="bi bi-arrow-left"></i> Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
function removeItem() {
  alert('Remove item action (implement logic as needed)')
}
</script>