<template>
  <div class="bg-base-100 rounded-sm mb-8 px-4 py-6 max-w-full">
    <div class="relative">
      <!-- Navigation Buttons -->
      <button
        @click="slideLeft"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition hover:scale-110 hover:bg-primary/90 disabled:opacity-50"
        :disabled="isAnimating"
        aria-label="Previous"
      >
        <i class="bi bi-arrow-left text-2xl"></i>
      </button>
      <button
        @click="slideRight"
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition hover:scale-110 hover:bg-primary/90 disabled:opacity-50"
        :disabled="isAnimating"
        aria-label="Next"
      >
        <i class="bi bi-arrow-right text-2xl"></i>
      </button>

      <!-- Header and View All -->
      <div class="flex justify-between items-center pb-2">
        <h2 class="font-bold text-gray-900 mb-3 text-2xl">Phone</h2>
        <span>
          <router-link
            to="/product-grid"
            class="text-primary font-semibold flex items-center space-x-2 hover:underline"
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
            class="flex-shrink-0 bg-base-100 rounded-lg transition-all duration-300 group w-[208px] max-w-[208px] min-w-[208px] border border-base-300"
            @mouseenter="hover = index"
            @mouseleave="hover = null"
          >
            <div
              class="relative overflow-hidden rounded-t-lg"
            >
              <img
                :src="product.image"
                class="w-full object-cover h-[200px] transition-transform duration-300"
                :style="{ transform: hover === index ? 'scale(1.1)' : 'scale(1)' }"
                alt="Product Image"
              />
              <div
                class="absolute top-0 left-0 w-full h-full bg-gray-900"
                :style="{
                  opacity: hover === index ? '0.1' : '0',
                  transition: 'opacity 0.3s ease',
                }"
              ></div>
            </div>
            <div class="flex flex-col px-4 py-3 no-underline h-[170px]">
              <h5 class="font-semibold mb-2 text-base text-gray-900">{{ product.name }}</h5>
              <p class="text-gray-500 text-xs flex-grow mb-3">{{ product.description }}</p>
              <div class="flex justify-between items-center mt-auto">
                <span class="font-bold text-primary text-lg">${{ product.price.toFixed(2) }}</span>
                <button
                  class="bg-primary text-white flex items-center justify-center rounded-full w-8 h-8 shadow add-to-cart-btn transition hover:scale-110"
                  style="z-index: 10"
                  @click.stop.prevent="addToCart(product.id)"
                  aria-label="Add to Cart"
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
    name: 'iPhone 16 Pro Max',
    description: '6.9″ Super Retina XDR display, A19 Pro chip, Tetraprism 10x zoom camera',
    price: 1599.00,
    image: 'https://tse1.mm.bing.net/th/id/OIP.Ml7icm42gWS7HMHP8ML35AHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 2,
    name: 'Samsung Galaxy S25 Ultra',
    description: '6.8″ Dynamic AMOLED, Snapdragon 8 Gen 4, 200MP quad camera',
    price: 1499.99,
    image: 'https://tse4.mm.bing.net/th/id/OIP.JfUoIE3FchzFvkmdamN_uQHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 3,
    name: 'Google Pixel 9 Pro',
    description: '6.7″ OLED display, Google Tensor G4 chip, best-in-class AI photography',
    price: 1299.00,
    image: 'https://tse1.mm.bing.net/th/id/OIP.oh7LMwLEh7z1R79KjjHxQgAAAA?pid=Api&P=0&h=220',
  },
  {
    id: 4,
    name: 'OnePlus 13 Pro',
    description: '6.8″ AMOLED, Snapdragon 8 Gen 4, Hasselblad quad camera system',
    price: 1099.00,
    image: 'https://tse4.mm.bing.net/th/id/OIP.0gP-2uWyrn1_nciuLPeAZwAAAA?pid=Api&P=0&h=220',
  },
  {
    id: 5,
    name: 'Xiaomi 15 Ultra',
    description: '6.73″ AMOLED, Leica cameras, Snapdragon 8 Gen 4, 120W fast charge',
    price: 999.00,
    image: 'https://tse3.mm.bing.net/th/id/OIP.FvwnK6E8v_A_bXh5n9EHRwHaHa?pid=Api&P=0&h=220',
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