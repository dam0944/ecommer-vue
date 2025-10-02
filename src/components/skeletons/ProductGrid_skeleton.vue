<template>
  <div class="min-h-screen bg-base-200 p-4">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar Filter Skeleton -->
        <div class="w-full lg:w-80 bg-base-100 rounded-lg p-6 h-fit">
          <div class="flex items-center justify-between mb-6">
            <div class="skeleton h-6 w-16"></div>
            <div class="skeleton h-4 w-12"></div>
          </div>

          <!-- Filter Dropdown Skeleton -->
          <div class="mb-6">
            <div class="skeleton h-12 w-full rounded-lg"></div>
          </div>

          <!-- Price Range Skeleton -->
          <div class="mb-6">
            <div class="skeleton h-5 w-12 mb-3"></div>
            <div class="flex items-center gap-2">
              <div class="skeleton h-12 flex-1 rounded-lg"></div>
              <div class="skeleton h-4 w-6"></div>
              <div class="skeleton h-12 flex-1 rounded-lg"></div>
              <div class="skeleton h-12 w-12 rounded-lg"></div>
            </div>
          </div>

          <!-- Categories Skeleton -->
          <div>
            <div class="skeleton h-5 w-20 mb-3"></div>
            <div class="skeleton h-12 w-full rounded-lg mb-3"></div>
            
            <div class="border border-base-300 rounded-lg p-2">
              <div class="space-y-2">
                <div class="skeleton h-8 w-full rounded"></div>
                <div class="skeleton h-8 w-3/4 rounded"></div>
                <div class="skeleton h-8 w-5/6 rounded"></div>
                <div class="skeleton h-8 w-2/3 rounded"></div>
                <div class="skeleton h-8 w-4/5 rounded"></div>
                <div class="skeleton h-8 w-3/5 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Skeleton -->
        <div class="flex-1">
          <!-- Header Skeleton -->
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <div class="skeleton h-8 w-80 mb-2"></div>
              <div class="skeleton h-4 w-24"></div>
            </div>
            
            <div class="flex items-center gap-2">
              <div class="skeleton h-4 w-12"></div>
              <div class="skeleton h-10 w-32 rounded-lg"></div>
            </div>
          </div>

          <!-- Products Grid Skeleton -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div 
              v-for="n in 8" 
              :key="n"
              class="card bg-base-100 shadow-sm"
            >
              <figure class="px-4 pt-4">
                <div class="skeleton w-full h-48 rounded-lg"></div>
              </figure>
              <div class="card-body px-4 pb-4 pt-3">
                <div class="skeleton h-5 w-full mb-2"></div>
                <div class="skeleton h-6 w-20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// No reactive data needed for skeleton
</script>
