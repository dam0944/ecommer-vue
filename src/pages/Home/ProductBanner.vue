<template>
  <div class="flex flex-row gap-4 mt-4 mb-4">
    <div class="flex-1">
      <div class="overflow-hidden w-full h-[180px] flex items-center justify-center">
        <img
          src="https://web.nika2u.com/storage/app/public/banner/2025-03-19-67da705a9cac4.webp"
          alt="iPhone Banner 1"
          class="w-full h-full object-cover block"
        />
      </div>
    </div>
    <div class="flex-1">
      <div class="overflow-hidden w-full h-[180px] flex items-center justify-center">
        <img
          src="https://web.nika2u.com/storage/app/public/banner/2024-10-14-670cf2c977651.webp"
          alt="iPhone Banner 2"
          class="w-full h-full object-cover block"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductBanner",
};
</script>

<style scoped>
@media (max-width: 900px) {
  .flex.flex-row {
    flex-direction: column !important;
    gap: 1rem !important;
  }
  .banner-img-container {
    height: 140px;
  }
}
</style>