<template>
  <div class="max-w-7xl mx-auto p-4 lg:p-8">
    <div class="flex flex-col lg:flex-row gap-8">
      <!-- Left Side - Product Images -->
      <div class="flex-1 lg:max-w-lg">
        <!-- Main Product Image -->
        <div class="relative mb-4">
          <div class="skeleton w-full h-80 lg:h-96 rounded-lg"></div>
          <!-- Warranty Badge -->
          <div class="absolute bottom-4 left-4">
            <div class="skeleton h-6 w-24 rounded-full"></div>
          </div>
        </div>
        
        <!-- Thumbnail Images -->
        <div class="flex gap-2">
          <div v-for="n in 4" :key="n" class="skeleton w-16 h-16 rounded-lg"></div>
        </div>
      </div>

      <!-- Right Side - Product Details -->
      <div class="flex-1 space-y-6">
        <!-- Share Button -->
        <div class="flex justify-end">
          <div class="skeleton w-8 h-8 rounded-full"></div>
        </div>

        <!-- Product Title -->
        <div class="space-y-2">
          <div class="skeleton h-6 w-full"></div>
          <div class="skeleton h-6 w-4/5"></div>
          <div class="skeleton h-6 w-3/4"></div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-4">
          <div class="flex gap-1">
            <div v-for="n in 5" :key="n" class="skeleton w-4 h-4 rounded-sm"></div>
          </div>
          <div class="skeleton h-4 w-20"></div>
          <div class="skeleton h-4 w-16"></div>
          <div class="skeleton h-4 w-20"></div>
        </div>

        <!-- Price -->
        <div class="skeleton h-8 w-32"></div>

        <!-- Color Options -->
        <div class="space-y-3">
          <div class="skeleton h-4 w-12"></div>
          <div class="flex gap-2">
            <div v-for="n in 4" :key="n" class="skeleton w-8 h-8 rounded-full"></div>
          </div>
        </div>

        <!-- Storage Options -->
        <div class="space-y-3">
          <div class="skeleton h-4 w-16"></div>
          <div class="flex flex-wrap gap-2">
            <div class="skeleton h-8 w-12 rounded-btn"></div>
            <div class="skeleton h-8 w-20 rounded-btn"></div>
            <div class="skeleton h-8 w-16 rounded-btn"></div>
            <div class="skeleton h-8 w-20 rounded-btn"></div>
          </div>
        </div>

        <!-- RAM Options -->
        <div class="space-y-3">
          <div class="skeleton h-4 w-8"></div>
          <div class="flex gap-2">
            <div class="skeleton h-8 w-12 rounded-btn"></div>
            <div class="skeleton h-8 w-12 rounded-btn"></div>
            <div class="skeleton h-8 w-12 rounded-btn"></div>
          </div>
        </div>

        <!-- Quantity -->
        <div class="space-y-3">
          <div class="skeleton h-4 w-16"></div>
          <div class="flex items-center gap-2">
            <div class="skeleton w-8 h-8 rounded-btn"></div>
            <div class="skeleton w-12 h-8 rounded-btn"></div>
            <div class="skeleton w-8 h-8 rounded-btn"></div>
          </div>
        </div>

        <!-- Total Price -->
        <div class="space-y-2">
          <div class="skeleton h-5 w-32"></div>
          <div class="skeleton h-4 w-20"></div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3">
          <div class="skeleton h-12 w-24 rounded-btn"></div>
          <div class="skeleton h-12 w-28 rounded-btn"></div>
        </div>
      </div>
    </div>

    <!-- Bottom Section - Tabs and Specifications -->
    <div class="mt-12 space-y-6">
      <!-- Tabs -->
      <div class="flex gap-6 border-b border-base-300">
        <div class="skeleton h-6 w-20 mb-4"></div>
        <div class="skeleton h-6 w-16 mb-4"></div>
      </div>

      <!-- Specifications List -->
      <div class="space-y-4">
        <div v-for="n in 10" :key="n" class="flex items-start gap-4">
          <div class="skeleton h-4 w-20 flex-shrink-0"></div>
          <div class="skeleton h-4 w-full max-w-md"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive data needed for skeleton
</script>