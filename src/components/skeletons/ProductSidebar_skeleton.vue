<template>
  <div class="bg-base-100 rounded-lg shadow-sm p-6 max-w-sm mx-auto">
    <h2 class="text-xl font-bold text-base-content mb-6">
      <span class="skeleton h-6 w-16 rounded"></span> <span class="skeleton h-6 w-32 rounded"></span>
    </h2>

    <div class="space-y-4">
      <div 
        v-for="n in 5" 
        :key="n"
        class="flex items-center gap-4 p-3 rounded-lg"
      >
        <div class="skeleton h-8 w-20 rounded-full -ml-3"></div>
        
        <div class="skeleton w-16 h-16 flex-shrink-0 rounded-md"></div>

        <div class="flex-1 space-y-2">
          <div class="skeleton h-4 w-full rounded"></div>
          <div class="flex items-baseline gap-2">
            <div class="skeleton h-3 w-16 rounded"></div>
            <div class="skeleton h-5 w-20 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive data needed for skeleton
</script>