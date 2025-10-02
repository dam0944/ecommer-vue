<template>
  <div class="py-5">
    <div class="container mx-auto px-4">
      <!-- Header Section -->
      <div class="flex justify-between items-center mb-4">
        <div>
          <h3 class="mb-1 text-2xl font-semibold">Our Brands</h3>
        </div>
      </div>

      <!-- Brand Carousel (Custom, not Bootstrap) -->
      <div class="relative">
        <!-- Slides -->
        <div class="overflow-hidden">
          <div
            v-for="(chunk, idx) in brandChunks"
            :key="idx"
            v-show="currentSlide === idx"
            class="transition duration-500"
          >
            <div class="flex flex-wrap justify-center">
              <div
                v-for="brand in chunk"
                :key="brand.name"
                class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 flex justify-center mb-4"
              >
                <div class="flex flex-col items-center w-full">
                  <div
                    class="bg-base-100 rounded-full flex items-center justify-center mb-2 brand-logo-circle transition border border-base-300"
                  >
                    <img
                      :src="brand.logo"
                      :alt="brand.name"
                      class="max-h-[52px] max-w-[52px] object-contain"
                    />
                  </div>
                  <div class="font-semibold text-xs uppercase text-gray-500 text-center">{{ brand.name }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Controls -->
        <button
          @click="prevSlide"
          class="absolute btn top-1/2 -left-3 -translate-y-1/2 bg-base-200 border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center focus:outline-none"
        >
          <span class="sr-only">Previous</span>
          <svg class="w-7 h-7 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          @click="nextSlide"
          class="absolute btn top-1/2 -right-3 -translate-y-1/2 bg-base-200 border border-base-300 rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-100 focus:outline-none"
        >
          <span class="sr-only">Next</span>
          <svg class="w-9 h-9 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <!-- Carousel indicators -->
        <div class="flex justify-center mt-3 gap-2">
          <button
            v-for="(_, i) in brandChunks"
            :key="i"
            @click="goToSlide(i)"
            :class="[
              'w-2.5 h-2.5 rounded-full',
              i === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
            ]"
            :aria-current="i === currentSlide ? 'true' : undefined"
            :aria-label="'Slide ' + (i + 1)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const brands = [
  { name: 'HONOR', logo: 'https://www.logo.wine/a/logo/Honor_(brand)/Honor_(brand)-Logo.wine.svg' },
  { name: 'Acer', logo: 'https://images.seeklogo.com/logo-png/28/2/acer-logo-png_seeklogo-289205.png' },
  { name: 'RAZER', logo: 'https://www.svgrepo.com/show/303598/razer-logo.svg' },
  { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'MSI', logo: 'https://cdn.worldvectorlogo.com/logos/msi-gaming.svg' },
  { name: 'DELL', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Dell_Logo.svg/2048px-Dell_Logo.svg.png' },
  { name: 'ASUS', logo: 'https://www.svgrepo.com/show/303479/asus-rog-1-logo.svg' },
  { name: 'Vivo', logo: 'https://www.svgrepo.com/show/303448/vivo-1-logo.svg' },
  { name: 'Realme', logo: 'https://vectorseek.com/wp-content/uploads/2021/01/Realme-Logo-Vector.png' },
  { name: 'Xiaomi', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Xiaomi_logo.svg/2560px-Xiaomi_logo.svg.png' },
  { name: 'HUAWEI', logo: 'https://images.seeklogo.com/logo-png/37/1/huawei-logo-png_seeklogo-370557.png' },
  { name: 'OPPO', logo: 'https://www.logo.wine/a/logo/Oppo/Oppo-Logo.wine.svg' }
]

// Show 6 brands per slide (for larger screens); you can adjust this as needed
const brandsPerSlide = 6
const brandChunks = computed(() => {
  const chunks = []
  for (let i = 0; i < brands.length; i += brandsPerSlide) {
    chunks.push(brands.slice(i, i + brandsPerSlide))
  }
  return chunks
})

const currentSlide = ref(0)

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + brandChunks.value.length) % brandChunks.value.length
}
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % brandChunks.value.length
}
function goToSlide(i) {
  currentSlide.value = i
}

// Optional: Auto-slide logic (like Bootstrap's data-bs-interval)
let intervalId = null
onMounted(() => {
  intervalId = setInterval(() => {
    nextSlide()
  }, 3000)
})
onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.brand-logo-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  transition: box-shadow 0.15s, transform 0.15s;
}
@media (max-width: 640px) {
  .brand-logo-circle {
    width: 82px;
    height: 82px;
  }
}
</style>