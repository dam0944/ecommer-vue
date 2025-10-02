<template>
  <div class="bg-base-200 min-h-screen py-6">
    <div class="container mx-auto px-4">
      <h4 class="font-bold text-2xl mb-6 text-base-content">🛒 Shopping Cart</h4>
      
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Cart Items -->
        <div class="w-full lg:w-2/3">
          <div class="card bg-base-100 shadow-xl border rounded-box p-5">
            <!-- Store Header -->
            <div class="flex items-center mb-4 flex-wrap">
              <input type="checkbox" class="checkbox checkbox-primary mr-2" />
              <i class="bi bi-shop mr-2 text-primary"></i>
              <a href="#" class="font-semibold text-primary hover:underline">
                Sh Computer
              </a>
            </div>

            <!-- Product List -->
            <div
              v-for="(item, index) in 2"
              :key="index"
              class="card bordered mb-4 shadow-sm transition"
            >
              <div class="flex flex-col md:flex-row md:items-center md:gap-4 p-4">
                <!-- Product Image -->
                <div class="flex-shrink-0 flex items-center justify-center mb-3 md:mb-0 w-24">
                  <img
                    :src="index === 0
                      ? 'https://tse3.mm.bing.net/th/id/OIP.wHI91aLlJ30hoichG5P-9QHaF7?pid=Api&P=0&h=220'
                      : 'https://tse3.mm.bing.net/th/id/OIP.MoJbrnYIP8PH9I-AaSbBYwHaFS?pid=Api&P=0&h=220'"
                    alt="Product Image"
                    class="rounded-lg border object-cover w-20 h-20 mx-auto"
                  />
                </div>

                <!-- Product Info -->
                <div class="flex-1">
                  <div class="font-semibold text-sm text-base-content">
                    Asus VivoBook S16 Copilot+ PC S3607QA
                  </div>
                  <div class="text-base-content/60 text-xs">Variant: Gray-1TB-16GB</div>
                  <div class="text-xs mt-1 text-base-content/70">
                    Color: <span class="font-semibold">Gray</span> |
                    Storage: <span class="font-semibold">1TB</span> |
                    RAM: <span class="font-semibold">16GB</span>
                  </div>
                </div>

                <!-- Desktop View -->
                <div class="hidden md:flex md:flex-row md:items-center md:justify-between md:w-1/2 gap-6">
                  <div class="text-right">
                    <div class="font-bold text-base-content">$899.00</div>
                    <div class="text-base-content/50 text-xs">(Tax: $0.00)</div>
                  </div>
                  <div class="flex items-center gap-2">
                    <input
                      type="number"
                      class="input input-bordered w-16 h-10 text-center"
                      min="1"
                      :value="1"
                      disabled
                    />
                    <button
                      class="btn btn-ghost btn-sm text-error"
                      @click="removeItem()"
                      aria-label="Remove item"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="font-bold text-base-content">$899.00</div>
                </div>

                <!-- Mobile View -->
                <div class="md:hidden mt-3 w-full">
                  <div class="flex justify-between">
                    <div>
                      <span class="font-bold text-base-content">$899.00</span>
                      <small class="text-base-content/50">(Tax: $0.00)</small>
                    </div>
                    <button
                      class="btn btn-ghost btn-sm text-error"
                      @click="removeItem()"
                      aria-label="Remove item"
                    >
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                  <div class="flex items-center mt-2 gap-2">
                    <input
                      type="number"
                      class="input input-bordered w-14 h-9 text-center"
                      min="1"
                      :value="1"
                      disabled
                    />
                    <div class="font-bold ml-auto text-base-content">Total: $899.00</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Note -->
            <div class="mt-5">
              <label class="font-semibold mb-2 text-base-content block">Order Note (Optional)</label>
              <textarea
                class="textarea textarea-bordered w-full min-h-[80px] text-sm"
                rows="3"
                placeholder="Type your note here..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="w-full lg:w-1/3">
          <div class="card bg-base-100 shadow-xl border rounded-box p-6">
            <div class="space-y-2 text-base-content">
              <div class="flex justify-between">
                <span>Sub total</span><span class="font-bold">$0.00</span>
              </div>
              <div class="flex justify-between">
                <span>Tax</span><span class="font-bold">$0.00</span>
              </div>
              <div class="flex justify-between">
                <span>Shipping</span><span class="font-bold">$0.00</span>
              </div>
              <div class="flex justify-between">
                <span>Discount</span><span class="font-bold text-primary">- $0.00</span>
              </div>
            </div>

            <!-- Coupon -->
            <div class="flex my-4">
              <span class="inline-flex items-center px-3 bg-base-200 border border-r-0 border-base-300 rounded-l-box">
                <i class="bi bi-ticket-perforated"></i>
              </span>
              <input
                type="text"
                class="input input-bordered flex-1 rounded-none rounded-r-box px-3"
                placeholder="Coupon code"
              />
              <button
                class="btn btn-primary ml-2"
                type="button"
              >
                APPLY
              </button>
            </div>

            <!-- Total -->
            <div class="flex justify-between border-t pt-3 font-bold text-base-content">
              <span>Total</span><span>$0.00</span>
            </div>

            <button
              class="btn btn-primary w-full mt-5"
            >
              Proceed to Checkout
            </button>

            <div class="text-center mt-4">
              <a
                href="#"
                class="link link-primary font-medium flex items-center justify-center gap-1"
              > 
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
  alert("Remove item action (implement logic as needed)");
}
</script>