<template>
  <div class="py-10 flex flex-col items-center gap-8 w-full">
    <div class="flex w-full gap-8">
      <!-- Left: Product Image and Specs -->
      <div class="flex flex-col w-2/3 gap-4">
        <div class="rounded-sm">
          <ProductImage />
        </div>
      </div>
      <!-- Right: Vendor and Store Info -->
      <div class="flex flex-col w-1/3 gap-4">
        <div class="rounded-sm p-0 mb-0">
          <!-- Removed p-6 and mb-2 for consistency, see notes -->
          <VendorInfo />
        </div>
        <div class="p-0">
          <StoreSidebar />
        </div>
      </div>
    </div>
    
    <!-- Recommended/More Products Section -->
    <div class="w-full mt-8">
      <ProductList />
    </div>
  </div>
</template>

<script setup>
import ProductList from "./ProductList.vue";
import ProductImage from "./ProductImage.vue";
import VendorInfo from "./VendorInfoCard.vue";
import StoreSidebar from "./MoreFromStore.vue";
import ProductSpecs from "./ProductSpecs.vue";
import ProductNetwork from "./ProductNetwork.vue";
import ProductAccessary from "./ProductAccessary.vue";
// import ProductDetails from "./ProductDetails.vue";
</script>