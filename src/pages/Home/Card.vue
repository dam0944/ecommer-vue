<template>
  <div class="bg-[#f7f9fb] min-h-screen py-4">
    <div class="max-w-[1500px] mx-auto">
      <h4 class="font-bold mb-3 text-lg md:text-2xl">Shopping cart</h4>
      <div class="flex flex-col lg:flex-row gap-4">
        <!-- Cart Table -->
        <div class="lg:w-2/3 w-full">
          <div class="bg-white rounded-xl border shadow-sm p-0">
            <div class="border-b px-6 py-3 font-semibold text-gray-500 bg-[#f6f8fa] rounded-t-xl text-base">
              <div class="grid grid-cols-12 gap-2">
                <div class="col-span-6">Product</div>
                <div class="col-span-2 text-right">Unit Price</div>
                <div class="col-span-2 text-center">Qty</div>
                <div class="col-span-2 text-right">Total</div>
              </div>
            </div>
            <div class="px-6 py-3">
              <!-- Store Row -->
              <div class="flex items-center mb-2">
                <input type="checkbox" class="w-4 h-4 mr-2 accent-primary" />
                <i class="bi bi-shop mr-2 text-primary"></i>
                <a href="#" class="font-semibold text-primary hover:underline">Sh Computer</a>
              </div>
              <hr class="my-2"/>
              <!-- Product Row -->
              <div class="grid grid-cols-12 items-center gap-2 mb-2">
                <div class="col-span-1 flex justify-center">
                  <input type="checkbox" class="w-4 h-4 accent-primary" />
                </div>
                <div class="col-span-2 flex justify-center">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.wHI91aLlJ30hoichG5P-9QHaF7?pid=Api&P=0&h=220"
                    alt="Asus VivoBook S16"
                    class="rounded border object-cover"
                    style="width: 70px; height: 70px;"
                  />
                </div>
                <div class="col-span-5">
                  <div class="font-semibold text-sm truncate">
                    Asus VivoBook S16 Copilot+ PC S3607QA (Snapdragon® X X1 26 100 Processor /...
                  </div>
                  <div class="text-gray-400 text-xs">Variant: Gray-1TB-16GB</div>
                  <div class="text-xs mt-1">
                    Color: <span class="font-semibold">Gray</span>
                    &nbsp; Storage: <span class="font-semibold">1TB</span>
                    &nbsp; RAM: <span class="font-semibold">16GB</span>
                  </div>
                </div>
                <div class="col-span-2 text-right">
                  <span class="font-bold">$899.00</span>
                  <br />
                  <span class="text-gray-400 text-xs">(Tax: $0.00)</span>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button type="button" class="text-danger" @click="removeItem()">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                <div class="col-span-1 flex items-center justify-center">
                  <input
                    type="number"
                    class="border rounded text-center w-12 h-9 text-base"
                    min="1"
                    :value="1"
                    disabled
                  />
                  <button class="ml-2 text-primary" disabled>
                    <i class="bi bi-plus-circle text-lg"></i>
                  </button>
                </div>
                <div class="col-span-2 text-right font-bold">
                  $899.00
                </div>
              </div>
              <div class="grid grid-cols-12 items-center gap-2 mb-2">
                <div class="col-span-1 flex justify-center">
                  <input type="checkbox" class="w-4 h-4 accent-primary" />
                </div>
                <div class="col-span-2 flex justify-center">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.MoJbrnYIP8PH9I-AaSbBYwHaFS?pid=Api&P=0&h=220"
                    alt="Asus VivoBook S16"
                    class="rounded border object-cover"
                    style="width: 70px; height: 70px;"
                  />
                </div>
                <div class="col-span-5">
                  <div class="font-semibold text-sm truncate">
                    Asus VivoBook S16 Copilot+ PC S3607QA (Snapdragon® X X1 26 100 Processor /...
                  </div>
                  <div class="text-gray-400 text-xs">Variant: Gray-1TB-16GB</div>
                  <div class="text-xs mt-1">
                    Color: <span class="font-semibold">Gray</span>
                    &nbsp; Storage: <span class="font-semibold">1TB</span>
                    &nbsp; RAM: <span class="font-semibold">16GB</span>
                  </div>
                </div>
                <div class="col-span-2 text-right">
                  <span class="font-bold">$899.00</span>
                  <br />
                  <span class="text-gray-400 text-xs">(Tax: $0.00)</span>
                </div>
                <div class="col-span-1 flex justify-center items-center">
                  <button type="button" class="text-danger" @click="removeItem()">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
                <div class="col-span-1 flex items-center justify-center">
                  <input
                    type="number"
                    class="border rounded text-center w-12 h-9 text-base"
                    min="1"
                    :value="1"
                    disabled
                  />
                  <button class="ml-2 text-primary" disabled>
                    <i class="bi bi-plus-circle text-lg"></i>
                  </button>
                </div>
                <div class="col-span-2 text-right font-bold">
                  $899.00
                </div>
              </div>
            </div>
          </div>
          <!-- Order Note -->
          <div class="mt-4">
            <div class="font-semibold mb-2">Order Note (Optional)</div>
            <textarea
              class="border rounded w-full resize-y p-2"
              rows="3"
              placeholder="Type your note here..."
            ></textarea>
          </div>
        </div>
        <!-- Cart Summary -->
        <div class="lg:w-1/3 w-full">
          <div class="bg-white rounded-xl border shadow-sm p-6 min-w-[320px] max-w-[400px] mx-auto">
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
              <span>Discount on product</span>
              <span class="font-bold text-primary">- $0.00</span>
            </div>
            <div class="flex my-3 border rounded overflow-hidden">
              <span class="flex items-center justify-center px-3 bg-white text-lg"><i class="bi bi-ticket-perforated"></i></span>
              <input type="text" class="flex-1 px-2 py-2 outline-none" placeholder="Coupon code" />
              <button class="bg-primary text-white px-4 py-2 font-semibold hover:bg-blue-700 transition" type="button">APPLY</button>
            </div>
            <div class="flex justify-between border-t pt-3 font-bold">
              <span>Total</span>
              <span>$0.00</span>
            </div>
            <a href="/order">
              <button class="bg-primary text-white w-full mt-4 font-semibold rounded py-3 text-lg transition hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </a>
            <div class="text-center mt-3">
              <a href="#" class="text-primary font-semibold hover:underline">
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

// This is a static clone for UI, dynamic logic can be added as needed.
function removeItem() {
  alert('Remove item action (implement logic as needed)')
}
</script>