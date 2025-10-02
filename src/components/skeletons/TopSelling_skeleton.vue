<template>
  <div class="flex flex-col lg:flex-row gap-6 p-6 bg-base-100 text-base-content">
    <!-- Deal of the Day -->
    <div class="w-full lg:w-1/3 space-y-4">
      <div class="skeleton h-6 w-32 mx-auto"></div>
      <div class="skeleton w-full h-64 rounded-xl"></div>
      <div class="text-center space-y-2">
        <div class="skeleton h-5 w-40 mx-auto"></div>
        <div class="skeleton h-6 w-28 mx-auto"></div>
      </div>
      <div class="skeleton h-10 w-32 mx-auto rounded-full"></div>
    </div>

    <!-- Latest Products -->
    <div class="w-full lg:w-2/3">
      <div class="flex justify-between items-center mb-4">
        <div class="skeleton h-6 w-40"></div>
        <div class="skeleton h-5 w-16"></div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div v-for="n in 8" :key="n" class="p-4 border border-gray-100 rounded-xl bg-base-200">
          <div class="skeleton h-32 w-full mb-4 rounded"></div>
          <div class="space-y-2">
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-5 w-16"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic needed for skeleton
</script>

<style scoped>
/* optional custom styles if needed */
</style>
