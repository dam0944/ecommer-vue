<template>
  <div class="bg-white py-16">
  <div class="container mx-auto px-4">
    <div class="mt-4 skeleton h-4 w-16"></div>
    <div class="flex items-center justify-center relative">
      <div class="flex space-x-8 overflow-x-hidden">
        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
            <div class="skeleton w-24 h-24 rounded-full"></div>
          </div>
          <div class="mt-4 skeleton h-4 w-16"></div>
        </div>

        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
            <div class="skeleton w-24 h-24 rounded-full"></div>
          </div>
          <div class="mt-4 skeleton h-4 w-16"></div>
        </div>

        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
            <div class="skeleton w-24 h-24 rounded-full"></div>
          </div>
          <div class="mt-4 skeleton h-4 w-16"></div>
        </div>

        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
            <div class="skeleton w-24 h-24 rounded-full"></div>
          </div>
          <div class="mt-4 skeleton h-4 w-16"></div>
        </div>

        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
            <div class="skeleton w-24 h-24 rounded-full"></div>
          </div>
          <div class="mt-4 skeleton h-4 w-16"></div>
        </div>

        <div class="flex-shrink-0 flex flex-col items-center">
          <div class="w-32 h-32 rounded-full border border-gray-100 flex items-center justify-center">
            <div class="skeleton w-24 h-24 rounded-full"></div>
          </div>
          <div class="mt-4 skeleton h-4 w-16"></div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>
