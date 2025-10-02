<template>
  <div class="drawer lg:drawer-open">
    <!-- Added drawer structure for better mobile navigation -->
    <input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
    
    <div class="drawer-content flex flex-col min-h-screen">
      <!-- Simplified responsive padding using Tailwind classes -->
      <div class="w-full sticky top-0 z-50 bg-base-100 shadow-sm">
        <Navbar />
      </div>
      
      <main class="flex-1 bg-base-100" role="main">
        <!-- Enhanced container with better responsive breakpoints -->
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 max-w-7xl">
          <div class="py-4 sm:py-6 lg:py-8">
            <router-view />
          </div>
        </div>
      </main>
      
      <!-- Added proper footer positioning -->
      <footer class="mt-auto">
        <Footer />
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import Footer from '../components/Footer.vue'
import Navbar from '../hooks/Navbar.vue'

const screenWidth = ref(0)

const breakpoints = computed(() => ({
  isMobile: screenWidth.value < 640,
  isTablet: screenWidth.value >= 640 && screenWidth.value < 1024,
  isDesktop: screenWidth.value >= 1024 && screenWidth.value < 1280,
  isLarge: screenWidth.value >= 1280
}))

let timeoutId = null
function updateScreenSize() {
  screenWidth.value = window.innerWidth
}

function onResize() {
  clearTimeout(timeoutId)
  timeoutId = setTimeout(updateScreenSize, 100)
}

onMounted(() => {
  updateScreenSize()
  window.addEventListener('resize', onResize, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  clearTimeout(timeoutId)
})

defineExpose({
  breakpoints
})
</script>

<style scoped>
/* Added smooth transitions for layout changes */
.drawer-content {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced container responsiveness */
.container {
  transition: padding 0.3s ease-in-out;
}

/* Improved mobile navigation */
@media (max-width: 1023px) {
  .drawer-toggle:checked ~ .drawer-content {
    transform: translateX(0);
  }
}
</style>
