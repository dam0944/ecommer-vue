<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-base-100 text-base-content">
    <!-- Panel -->
    <div v-for="panel in ['Best Sellings', 'Top Rated']" :key="panel" class="border border-gray-100 rounded-xl p-4 space-y-4">
      <!-- Header -->
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <div class="skeleton h-6 w-6 rounded-full"></div>
          <div class="skeleton h-5 w-32"></div>
        </div>
        <div class="skeleton h-4 w-14"></div>
      </div>

      <!-- Products -->
      <div class="grid grid-cols-2 gap-3">
        <div v-for="n in 6" :key="n" class="flex items-center gap-3 bg-base-200 rounded-lg p-2">
          <div class="skeleton h-12 w-12 rounded"></div>
          <div class="flex-1 space-y-1">
            <div class="skeleton h-3 w-24"></div>
            <div class="skeleton h-3 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No logic needed for static skeleton
</script>

<style scoped>
/* optional custom styles */
</style>
