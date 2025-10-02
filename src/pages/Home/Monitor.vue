<template>
  <div class="bg-base-100 rounded-sm mb-8 px-4 py-6 max-w-full">
    <div class="relative">
      <!-- Navigation Buttons -->
      <button
        @click="slideLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-primary text-white shadow-lg transition hover:scale-110 disabled:opacity-50"
        :disabled="isAnimating"
        aria-label="Previous"
        type="button"
      >
        <i class="bi bi-arrow-left text-2xl"></i>
      </button>
      <button
        @click="slideRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-primary text-white shadow-lg transition hover:scale-110 disabled:opacity-50"
        :disabled="isAnimating"
        aria-label="Next"
        type="button"
      >
        <i class="bi bi-arrow-right text-2xl"></i>
      </button>

      <!-- Header and View All -->
      <div class="flex justify-between items-center pb-2">
        <h2 class="font-bold text-base-content mb-3 text-2xl">Monitor</h2>
        <span>
          <router-link
            to="/product-grid"
            class="link link-primary font-semibold flex items-center space-x-2"
          >
            <span>View All</span>
            <i class="bi bi-arrow-right"></i>
          </router-link>
        </span>
      </div>

      <!-- Product Slider -->
      <div
        ref="sliderRef"
        class="flex overflow-x-hidden pb-4 cursor-grab select-none"
        @scroll="handleScroll"
        @mouseenter="pauseAutoScroll"
        @mouseleave="resumeAutoScroll"
      >
        <div
          class="flex gap-3 px-2"
          ref="trackRef"
          :style="{
            transform: `translateX(${translateX}px)`,
            transition: isAnimating
              ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              : 'none',
          }"
        >
          <router-link
            v-for="(product, index) in allProducts"
            :key="`${product.id}-${Math.floor(index / products.length)}`"
            to="/details"
            class="flex-shrink-0 bg-base-100 rounded-lg  transition-all duration-300 group w-[208px] max-w-[208px] min-w-[208px] border border-base-300"
            @mouseenter="hover = index"
            @mouseleave="hover = null"
          >
            <div class="relative overflow-hidden rounded-t-lg">
              <img
                :src="product.image"
                class="w-full object-cover h-[200px] transition-transform duration-300"
                :style="{ transform: hover === index ? 'scale(1.07)' : 'scale(1)' }"
                alt="Product Image"
              />
              <div
                class="absolute top-0 left-0 w-full h-full bg-base-content"
                :style="{
                  opacity: hover === index ? '0.07' : '0',
                  transition: 'opacity 0.3s ease',
                }"
              ></div>
            </div>
            <div class="flex flex-col px-4 py-3 no-underline h-[170px]">
              <h5 class="font-semibold mb-2 text-base text-base-content">{{ product.name }}</h5>
              <!-- Description removed -->
              <div class="flex justify-between items-center mt-auto">
                <span class="font-bold text-primary text-lg">${{ product.price.toFixed(2) }}</span>
                <button
                  class="btn btn-primary btn-circle btn-sm flex items-center justify-center shadow transition hover:scale-110"
                  style="z-index: 10"
                  @click.stop.prevent="addToCart(product.id)"
                  aria-label="Add to Cart"
                  type="button"
                >
                  <i class="bi bi-plus-circle-dotted"></i>
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const products: Product[] = [
  {
    id: 1,
    name: 'Asus ProArt PA32UCDM 32″ QD‑OLED',
    description: 'Professional-grade 4K QD‑OLED, 144 Hz, Thunderbolt 4, perfect for creatives',
    price: 1899.00,
    image: 'https://tse1.mm.bing.net/th/id/OIP.e6nCU_mMyRqiG2jQSO2_UQHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 2,
    name: 'Samsung Smart Monitor M9 32″ QD‑OLED',
    description: 'All‑in‑one 4K smart monitor with Tizen, HDR10+, 165 Hz & built‑in apps',
    price: 1599.00,
    image: 'https://tse2.mm.bing.net/th/id/OIP.rqu53LCFmceG14xopycCcQHaEK?pid=Api&P=0&h=220',
  },
  {
    id: 3,
    name: 'Dell Pro 32 Plus QD‑OLED (S3225QC)',
    description: '4K OLED, 120 Hz, HDR, integrated spatial audio — pro visual quality',
    price: 849.99,
    image: 'https://tse3.mm.bing.net/th/id/OIP.IevBd0H39qkvcLzrWbHH3QAAAA?pid=Api&P=0&h=220',
  },
  {
    id: 4,
    name: 'Lenovo Legion Pro 34WD‑10 Ultra‑Wide OLED',
    description: '34″ QHD ultrawide, 240 Hz, ultra‑fast 0.03 ms, curved for immersive gaming',
    price: 1099.99,
    image: 'https://tse4.mm.bing.net/th/id/OIP.iP-8KKZ_-_3BXG8Jne0e5QAAAA?pid=Api&P=0&h=220',
  },
  {
    id: 5,
    name: 'Dell S3222DGM 32″ QHD VA 165 Hz',
    description: 'Best-value curved QHD gaming monitor — 165 Hz, FreeSync/G‑Sync compatible',
    price: 299.99,
    image: 'https://tse2.mm.bing.net/th/id/OIP.j-dDcUXukyl03lN9nudVuQHaHa?pid=Api&P=0&h=220',
  },
];

const allProducts = computed(() => {
  const copies = 3
  const result = []
  for (let i = 0; i < copies; i++) {
    result.push(...products)
  }
  return result
})

const sliderRef = ref<HTMLDivElement | null>(null)
const trackRef = ref<HTMLDivElement | null>(null)
const hover = ref<number | null>(null)
const translateX = ref(0)
const isAnimating = ref(false)
const currentSlide = ref(0)
const cardWidth = ref(208)
const autoScrollInterval = ref<number | null>(null)
const isPaused = ref(false)

const addToCart = (productId: number) => {
  const notification = document.createElement('div')
  notification.textContent = `Product ${productId} added to cart!`
  notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded shadow-lg z-[9999] transition-transform'
  notification.style.transform = 'translateX(100%)'
  notification.style.transition = 'transform 0.3s ease'
  document.body.appendChild(notification)
  setTimeout(() => {
    notification.style.transform = 'translateX(0)'
  }, 100)
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)'
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 2000)
}

const slideLeft = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  currentSlide.value = (currentSlide.value - 1 + products.length) % products.length
  translateX.value += cardWidth.value
  await nextTick()
  setTimeout(() => {
    if (translateX.value > 0) {
      translateX.value = -(cardWidth.value * products.length)
    }
    isAnimating.value = false
  }, 500)
}

const slideRight = async () => {
  if (isAnimating.value) return
  isAnimating.value = true
  currentSlide.value = (currentSlide.value + 1) % products.length
  translateX.value -= cardWidth.value
  await nextTick()
  setTimeout(() => {
    if (translateX.value <= -(cardWidth.value * products.length * 2)) {
      translateX.value = -(cardWidth.value * products.length)
    }
    isAnimating.value = false
  }, 500)
}

const handleScroll = () => {}
const startAutoScroll = () => {
  if (autoScrollInterval.value) return
  autoScrollInterval.value = setInterval(() => {
    if (!isPaused.value && !isAnimating.value) {
      slideRight()
    }
  }, 3000)
}
const stopAutoScroll = () => {
  if (autoScrollInterval.value) {
    clearInterval(autoScrollInterval.value)
    autoScrollInterval.value = null
  }
}
const pauseAutoScroll = () => {
  isPaused.value = true
}
const resumeAutoScroll = () => {
  isPaused.value = false
}

onMounted(() => {
  translateX.value = -(cardWidth.value * products.length)
  startAutoScroll()

  const slider = sliderRef.value
  if (!slider) return

  let isDown = false
  let startX = 0
  let startTranslateX = 0

  const handleMouseDown = (e: MouseEvent) => {
    if (isAnimating.value) return
    isDown = true
    slider.style.cursor = 'grabbing'
    startX = e.pageX
    startTranslateX = translateX.value
    pauseAutoScroll()
  }

  const handleMouseLeave = () => {
    isDown = false
    slider.style.cursor = 'grab'
    resumeAutoScroll()
  }

  const handleMouseUp = () => {
    isDown = false
    slider.style.cursor = 'grab'
    resumeAutoScroll()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDown || isAnimating.value) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX) * 1.5
    translateX.value = startTranslateX + walk
  }

  slider.addEventListener('mousedown', handleMouseDown)
  slider.addEventListener('mouseleave', handleMouseLeave)
  slider.addEventListener('mouseup', handleMouseUp)
  slider.addEventListener('mousemove', handleMouseMove)

  onUnmounted(() => {
    slider.removeEventListener('mousedown', handleMouseDown)
    slider.removeEventListener('mouseleave', handleMouseLeave)
    slider.removeEventListener('mouseup', handleMouseUp)
    slider.removeEventListener('mousemove', handleMouseMove)
    stopAutoScroll()
  })
})
</script>