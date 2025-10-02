<template>
  <div class="bg-base-100 rounded-sm card p-6 mt-2">
    <div role="tablist" class="tabs tabs-boxed mb-4">
      <button
        role="tab"
        class="tab btn "
        :class="activeTab === 'overview' && 'tab-active'"
        @click="activeTab = 'overview'"
      >
        Overview
      </button>
      <button
        role="tab"
        class="tab btn-active "
        :class="activeTab === 'reviews' && 'tab-active'"
        @click="activeTab = 'reviews'"
      >
        Reviews
      </button>
    </div>

    <div v-if="activeTab === 'overview'" class="text-base-content text-base space-y-1">
      <div>27 Inch Flat / 16:9 Aspect Ratio / 4K UHD 3,840 x 2,160 / IPS-Panel / 3D Glasses-Free</div>
      <div>1ms Response Time / HDR10+ Gaming / 165Hz Refresh Rate / AMD FreeSync Premium / G-Sync</div>
      <div>Flicker Free / sRGB 99% / Auto Source Switch / Eye Saver Mode / Dual Speaker / Edge Lighting RGB</div>
      <div>AI 3D Video / HDMI x 2 / USB A x 2 / Display Port x 1 / USB-B x 1</div>
    </div>
    <div v-else class="text-base-content/60 italic text-center">
      No reviews yet.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const activeTab = ref<'overview' | 'reviews'>('overview')
</script>