<template>
  <div class="min-h-screen w-full overflow-x-hidden">
    <!-- Main Content Container -->
    <div>
      <!-- Hero Slider Section -->
      <section class="w-full mb-0">
        <Hero_Section />
        <!-- <Hero_sectionSkeleton /> -->
      </section>

      <!-- Shop Categories Section -->
      <section class="w-full pt-10">
        <div class="w-full max-w-[1350px] mx-auto box-border">
          <!-- <Shop /> -->
        </div>
      </section>

      <!-- Brand Products Section -->
      <section class="w-full">
        <div class="w-full max-w-[1350px] mx-auto box-border">
          <Branding />
          <!-- <Branding_skeleton/> -->
          <!-- <ProductGrid_skeleton/> -->
          <!-- <ProductDetail_skeleton/> -->
          <!-- <ProductSidebar_skeleton/> -->
          <!-- <CheckOut_skeleton  /> -->
        </div>
      </section>

      <!-- Latest Products Section -->
      <section class="w-full py-10">
        <div class="w-full max-w-[1350px] mx-auto box-border">
          <LastProduct />
          <!-- <TopSelling_skeleton/> -->
          <TopSelling />
          <!-- <Top_selling/> -->
        </div>
      </section>
      <ProductSeller />
      <!-- <Product_skeleton/> -->
      <AccessarySell />
      <Phone />
      <Monitor />
      <Network />
      <Service />
      <NewLetterSection/>
      <!-- <Service/> -->
    </div>
    
    <!-- Back to Top Button -->
    <button 
      v-show="showBackToTop"
      @click="scrollToTop"
      class="btn btn-primary rounded-full fixed bottom-8 right-8 w-[50px] h-[50px] flex items-center justify-center shadow-lg z-[1000] transition-all duration-300 hover:translate-y-[-6px] hover:shadow-xl"
      aria-label="Back to top"
    >
      <i class="bi bi-arrow-up text-lg text-white"></i>
    </button>
  </div>
</template>

<script setup >
import { ref, onMounted, onUnmounted } from 'vue'
import Branding from './Branding.vue'
import LastProduct from './LastProduct.vue'
import ProductSeller from './ProductSeller.vue'
// import Shop from './Shop.vue'
import Hero_Section from './Hero_Section.vue'
import AccessarySell from './AccessarySell.vue'
// import Service from './Service.vue'
import TopSelling from './TopSelling.vue'
import Monitor from './Monitor.vue'
import Network from './Network.vue'
import Phone from './Phone.vue'
import CheckOut_skeleton from '../../components/skeletons/ChekOut_skeleton.vue'
import Hero_sectionSkeleton from '../../components/skeletons/Hero_sectionSkeleton.vue'
import Branding_skeleton from '../../components/skeletons/Branding_skeleton.vue'
import TopSelling_skeleton from '../../components/skeletons/TopSelling_skeleton.vue'
import Top_selling from '../../components/skeletons/Top_selling.vue'
import Product_skeleton from '../../components/skeletons/Product_skeleton.vue'
import ProductGrid_skeleton from '../../components/skeletons/ProductGrid_skeleton.vue'
import ProductDetail_skeleton from '../../components/skeletons/ProductDetail_skeleton.vue'
import ProductSidebar_skeleton from '../../components/skeletons/ProductSidebar_skeleton.vue'
import Service from './Service.vue'
import NewLetterSection from './NewLetterSection.vue'
// import Service from './Service.vue'

const showBackToTop = ref(false)
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>