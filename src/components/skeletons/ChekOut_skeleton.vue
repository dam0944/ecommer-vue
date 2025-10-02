<template>
  <div class="bg-base-100 p-6 sm:p-8 md:p-10 lg:p-12 animate-pulse">
    <!-- Title Skeleton -->
    <div class="skeleton h-8 w-48 mb-8"></div>

    <div class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- First Name Skeleton -->
        <div>
          <div class="skeleton h-4 w-24 mb-2"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>
        <!-- Last Name Skeleton -->
        <div>
          <div class="skeleton h-4 w-24 mb-2"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>
      </div>

      <!-- Company Name Skeleton -->
      <div>
        <div class="skeleton h-4 w-36 mb-2"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>

      <!-- Country / Region Skeleton -->
      <div>
        <div class="skeleton h-4 w-32 mb-2"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>

      <!-- Street Address Skeleton -->
      <div>
        <div class="skeleton h-4 w-32 mb-2"></div>
        <div class="skeleton h-12 w-full mb-2"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Town / City Skeleton -->
        <div>
          <div class="skeleton h-4 w-28 mb-2"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>
        <!-- State / County Skeleton -->
        <div>
          <div class="skeleton h-4 w-28 mb-2"></div>
          <div class="skeleton h-12 w-full"></div>
        </div>
      </div>

      <!-- Postcode / ZIP Skeleton -->
      <div>
        <div class="skeleton h-4 w-28 mb-2"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>

      <!-- Phone Skeleton -->
      <div>
        <div class="skeleton h-4 w-20 mb-2"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>

      <!-- Email Address Skeleton -->
      <div>
        <div class="skeleton h-4 w-28 mb-2"></div>
        <div class="skeleton h-12 w-full"></div>
      </div>

      <!-- Checkbox Skeleton -->
      <div class="flex items-center gap-2">
        <div class="skeleton h-6 w-6 rounded-sm"></div>
        <div class="skeleton h-4 w-36"></div>
      </div>

      <!-- Order Notes Skeleton -->
      <div>
        <div class="skeleton h-4 w-32 mb-2"></div>
        <div class="skeleton h-32 w-full"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No script logic needed for a skeleton component
</script>

<style scoped>
/* No additional custom styles needed beyond Tailwind and DaisyUI */
</style>