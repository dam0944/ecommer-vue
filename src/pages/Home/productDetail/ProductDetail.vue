<template>
  <div class="min-h-screen py-10 flex flex-col items-center gap-8 w-full">
    <div class="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
      
      <!-- Left: Product Image and Specs -->
      <div class="flex flex-col w-full lg:w-2/3 gap-4">
        <div class="bg-white rounded-xl shadow-sm">
          <ProductImage />
        </div>
      </div>

      <!-- Right: Vendor and Store Info -->
      <div class="flex flex-col w-full lg:w-1/3 gap-4">
        <div class="bg-white rounded-xl shadow-sm p-6 mb-2">
          <VendorInfor />
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6">
          <StoreSidebar />
        </div>
      </div>
    </div>

    <!-- Recommended/More Products Section -->
    <div class="w-full max-w-7xl mt-8">
      <ProductList />
    </div>
  </div>
</template>


<script setup>
import ProductImage from '../product-detail/ProductImage.vue';
import ProductList from '../product-detail/ProductList.vue';
import StoreSidebar from '../product-detail/StoreSidebar.vue';
import VendorInfor from '../product-detail/VendorInfor.vue';
</script> 