<template>
  <div class="flex max-w-[1350px] mx-auto lg:flex-row gap-5 py-20 px-4" v-if="show">
    <!-- Left Sidebar Skeleton -->
    <div class="flex flex-col h-96 w-full lg:w-[35%] xl:w-[30%] gap-5">
      <div 
        v-for="n in 6" 
        :key="n"
        class="skeleton h-16 w-full rounded-lg"
        :style="{ animationDelay: `${n * 0.1}s` }"
      ></div>
    </div>
    
    <!-- Main Content Skeleton -->
    <div class="w-full h-96">
      <div class="skeleton h-full w-full rounded-lg"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(true)

// Optional: Auto-hide skeleton after some time for demo purposes
onMounted(() => {
  // Uncomment to auto-hide after 3 seconds
  // setTimeout(() => {
  //   show.value = false
  // }, 3000)
})
</script>