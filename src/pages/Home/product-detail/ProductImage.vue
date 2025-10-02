<template>
  <div>
    <div class="container mx-auto py-6">
      <!-- Card -->
      <div class="card max-w-4xl mx-auto bg-base-100 flex-col md:flex-row md:flex gap-8 p-4 md:p-6">
        <!-- Image section -->
        <div class="flex flex-col items-center w-full md:w-2/5">
          <div class="relative mb-4 w-full flex justify-center">
            <img
              :src="selectedImage"
              class="rounded-xl border border-gray-100 max-w-[340px] min-w-[240px] aspect-square object-cover"
              alt="Product main"
            />
            <button class="btn btn-sm btn-circle absolute top-2 right-2">
              <i class="bi bi-share"></i>
            </button>
          </div>
          <div class="flex gap-2 mt-2">
            <img
              v-for="(img, idx) in images"
              :key="idx"
              :src="img"
              :class="['rounded-lg border-2 bg-white object-cover cursor-pointer transition', selectedImage === img ? 'border-primary shadow' : 'border-base-200']"
              class="w-14 h-14"
              @click="selectedImage = img"
              alt="Product thumb"
            />
          </div>
        </div>
        <!-- Details section -->
        <div class="flex-1 w-full md:w-3/5">
          <h3 class="font-semibold text-xl md:text-2xl mb-2 text-base-content">{{ productTitle }}</h3>
          <div class="mb-2 text-xs text-base-content/60 flex flex-wrap gap-x-4 gap-y-1 items-center">
            <span class="flex items-center gap-1 text-warning text-lg">
              <span v-for="n in 5" :key="n">&#9733;</span>
            </span>
            <span class="ml-2 text-base-content/40">(0)</span>
            <span>0 Reviews</span>
            <span>0 Orders</span>
            <span>0 Wish Listed</span>
          </div>
          <div class="text-2xl font-bold mb-4 text-primary">${{ price.toLocaleString(undefined, {minimumFractionDigits:2}) }}</div>

          <!-- Color selection -->
          <div class="flex items-center gap-2 mb-3">
            <span class="font-medium text-base-content/80">Color :</span>
            <button
              v-for="(color, idx) in colors"
              :key="color"
              :style="{background:color, border: selectedColor === color ? '2px solid var(--fallback-p, #2563eb)' : '1px solid #ccc', width:'28px',height:'28px',borderRadius:'50%'}"
              class="relative flex items-center justify-center outline-none focus:ring-2 focus:ring-primary"
              @click="selectedColor = color"
              :aria-label="'Color ' + color"
            >
              <span v-if="selectedColor === color" class="absolute inset-0 flex items-center justify-center text-primary text-lg"><i class="bi bi-check2"></i></span>
            </button>
          </div>
          <!-- Storage / RAM -->
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span class="font-medium text-base-content/80">Storage :</span>
            <button
              v-for="s in storages"
              :key="s"
              class="btn btn-xs"
              :class="selectedStorage === s ? 'btn-primary text-base-100' : 'btn-outline btn-info'"
              @click="selectedStorage = s"
            >{{ s }}</button>
            <span class="font-medium text-base-content/80 ml-3">RAM :</span>
            <button
              v-for="ram in rams"
              :key="ram"
              class="btn btn-xs"
              :class="selectedRam === ram ? 'btn-primary text-base-100' : 'btn-outline btn-info'"
              @click="selectedRam = ram"
            >{{ ram }}</button>
          </div>
          <!-- Quantity -->
          <div class="flex items-center gap-2 mb-3">
            <span class="font-medium text-base-content/80">Quantity :</span>
            <div class="flex items-center btn rounded-full w-28 h-9 overflow-hidden">
              <button @click="decrement" class="btn btn-circle rounded-full btn-ghost h-full px-3 text-xl" type="button" aria-label="Decrease quantity">-</button>
              <input type="text" class="w-10 text-center border-0 outline-none font-bold" :value="qty" readonly>
              <button @click="increment" class="btn btn-xs btn-ghost rounded-full h-full px-3 text-xl" type="button" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <!-- Total Price -->
          <div class="mb-4 text-lg">
            Total Price :
            <span class="text-primary font-semibold">${{ (qty * price).toLocaleString(undefined, {minimumFractionDigits:2}) }}</span>
            <span class="text-base-content/40 text-xs ml-2">(Tax : incl.)</span>
          </div>
          <!-- Buttons -->
          <div class="flex w-[400px] flex-wrap items-center gap-2 mb-2 absolute">
            <!-- <router-link to="/checkout" class="btn">Buy now</router-link> --> 
            <!-- <button class="btn btn-primary">Add to cart</button> -->
            <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div>
              <label className="drawer-button btn btn-primary">Add to Card</label>
            </div>
          </div>
          </div>
        </div>
      </div>
      <!-- Overview / Reviews Tabs -->
      <div class="card bg-base-100 rounded-sm p-4 mt-6 max-w-4xl mx-auto">
        <div role="tablist" class="tabs gap-2 tabs-boxed mb-3">
          <button
            role="tab"
            class=" btn rounded-full tab"
            :class="tab==='overview' && 'tab-active'"
            @click="tab='overview'">
            Overview
          </button>
          <button
            role="tab"
            class=" btn rounded-full tab"
            :class="tab==='reviews' && 'tab-active'"
            @click="tab='reviews'">
            Reviews
          </button>
        </div>
        <div v-if="tab==='overview'" class="py-2">
          <ul class="list-disc list-inside space-y-1 text-base-content">
            <li><strong>CPU</strong> : Intel® Core™ Ultra 9 Processor 275HX</li>
            <li><strong>RAM</strong> : 16GB DDR5 (Upgradeable)</li>
            <li><strong>Storage</strong> : 1TB NVMe PCIe SSD</li>
            <li><strong>Display</strong> : 18.0-inch QHD+ 240Hz (2560 × 1600) ROG Nebula Display</li>
            <li><strong>Graphic</strong> : NVIDIA® RTX™ 5070 8GB</li>
            <li><strong>OS</strong> : Windows 11 Home License</li>
            <li><strong>Keyboard</strong> : Backlit Chiclet Keyboard Per-Key RGB</li>
            <li><strong>Battery</strong> : 90WHrs, 4S1P, 4-cell Li-ion</li>
            <li><strong>Weight</strong> : 3.20 kg | <strong>Color</strong> : Green</li>
          </ul>
        </div>
        <div v-else class="text-center text-base-content/40 py-8 flex flex-col items-center">
          <i class="bi bi-star text-4xl mb-2"></i>
          <div>No Review Given Yet!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const images = [
  "https://web.nika2u.com/storage/app/public/product/2025-06-14-684d1a027c054.webp",
  "https://web.nika2u.com/storage/app/public/product/3260-05MD5H33.png",
  "https://web.nika2u.com/storage/app/public/product/3260-05MD5H33.png",
  "https://web.nika2u.com/storage/app/public/product/3260-05MD5H33.png",
]

const selectedImage = ref(images[0])
const productTitle = "ASUS ROG Strix G18 G815LP Green (Intel® Core™ Ultra 9 Processor 275HX / 16GB / SSD 1TB PCIE / RTX5070 8GB / 18.0 Inch 2.5K QHD+ 2560 × 1600 IPS 240Hz)"
const price = 1999

const colors = ['#1b1b1b', '#595959', '#b3b3b3', '#3fbf3f']
const selectedColor = ref(colors[3])

const storages = ['1TB', '1TB + 512GB', '1TB + 1TB', '1TB + 2TB']
const selectedStorage = ref(storages[0])

const rams = ['16GB', '32GB', '64GB']
const selectedRam = ref(rams[0])

const qty = ref(1)
function increment() { qty.value++ }
function decrement() { if (qty.value > 1) qty.value-- }

const tab = ref('overview')
</script>