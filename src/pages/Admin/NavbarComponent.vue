<template>
  <header class="shadow-sm bg-gradient-to-r from-[#28a745] to-[#218838] text-white font-khmer min-h-[64px] transition-colors duration-300">
    <div class="container mx-auto flex items-center justify-between px-3 py-2 sm:px-6">
      <div class="flex items-center">
        <span class="text-sm">{{ currentTime }}</span>
      </div>

      <div class="flex items-center gap-2">
        <button class="btn btn-sm bg-base-2 q00 text-[#218838] border-none font-medium transition-colors duration-200 normal-case">
          <i class="bi bi-tablet mr-1"></i>
          <span class="hidden md:inline">លក់ (POS)</span>
        </button>

        <button class="btn btn-sm bg-base-100 text-[#218838] border-none rounded-sm font-medium shadow-md transition-colors duration-200">
          <i class="bi bi-journal mr-1"></i>
          <span class="hidden md:inline">សៀវភៅថវិកា</span>
        </button>

        <button class="btn btn-sm bg-white text-[#218838] border-none rounded-lg font-medium shadow-md transition-colors duration-200 hover:bg-[#218838] hover:text-white normal-case">
          <i class="bi bi-file-earmark-text mr-1"></i>
          <span class="hidden md:inline">វិក្កយបត្រ</span>
        </button>

        <div class="indicator">
          <span class="indicator-item badge badge-error text-[0.7rem] px-[0.5em] py-[0.3em]">1</span>
          <button class="btn btn-sm bg-white text-[#218838] border-none rounded-lg font-medium shadow-md transition-colors duration-200 hover:bg-[#218838] hover:text-white">
            <i class="bi bi-bell"></i>
          </button>
        </div>

        <button class="btn btn-sm bg-white text-[#218838] border-none rounded-lg font-medium shadow-md transition-colors duration-200 hover:bg-[#218838] hover:text-white">
          <i class="bi bi-heart"></i>
        </button>

        <button class="btn btn-sm bg-white text-[#218838] border-none rounded-lg font-medium shadow-md transition-colors duration-200 hover:bg-[#218838] hover:text-white">
          <i class="bi bi-gear"></i>
        </button>

        <button class="btn btn-ghost p-0">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="w-9 h-9 object-cover rounded-full border-2 border-white shadow-sm transition-all duration-200 hover:border-[#218838] hover:shadow-md md:w-10 md:h-10">
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentTime = ref('')

function updateTime() {
  const now = new Date()
  currentTime.value = now.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

onMounted(() => {
  updateTime()
  setInterval(updateTime, 1000)
})

</script>