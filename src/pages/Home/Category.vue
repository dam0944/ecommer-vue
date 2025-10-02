<template>
  <section class="categories-section">
    <div class="container py-2 ">
      <h2 class="mb-2 fw-bold">Shop by Category</h2>
      <div
        ref="slider"
        class="slider-track d-flex overflow-auto no-scrollbar"
      >
        <div
          v-for="cat in categories"
          :key="cat.name"
          class="category-card-wrapper flex-shrink-0 p-2"
        >
          <button
            class="category-card w-100 h-100 d-flex flex-column align-items-center justify-content-center p-4 shadow-sm"
          >
            <i :class="cat.icon" class="mb-2 category-icon"></i>
            <span class="fw-semibold fs-5">{{ cat.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from "vue"; 

export default defineComponent({
  name: "CategoriesSection",
  setup() {
    const categories = [
      { name: "Smartphones", icon: "bi-phone" },
      { name: "Computers", icon: "bi-laptop" },
      { name: "Accessories", icon: "bi-headphones" },
      { name: "Home Appliances", icon: "bi-house" },
      { name: "Cameras", icon: "bi-camera" },
      { name: "Wearables", icon: "bi-watch" },
      { name: "Gaming", icon: "bi-controller" },
      { name: "Office", icon: "bi-printer" },
      { name: "Audio", icon: "bi-speaker" },
      { name: "TVs", icon: "bi-tv" },
    ];

    const slider = ref<HTMLElement | null>(null);
    let intervalId: number;

    onMounted(() => {
      intervalId = window.setInterval(() => {
        if (slider.value) {
          slider.value.scrollBy({
            left: 200, // scroll by 200px
            behavior: "smooth",
          });

          // reset scroll if at end
          if (
            slider.value.scrollLeft + slider.value.clientWidth >=
            slider.value.scrollWidth - 5
          ) {
            slider.value.scrollTo({ left: 0, behavior: "smooth" });
          }
        }
      }, 2500); // every 2.5 seconds
    });

    onBeforeUnmount(() => {
      clearInterval(intervalId);
    });

    return {
      categories,
      slider,
    };
  },
});
</script>

<style scoped>
.categories-section {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
}
.category-card-wrapper {
  width: 200px;
}
.slider-track {
  scroll-behavior: smooth;
  transition: scroll-left 0.3s ease-in-out;
}
.category-card {
  background: #f8f9fa;
  border-radius: 18px;
  border: none;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  min-height: 140px;
  font-size: 1.15rem;
}
.category-card:hover,
.category-card:focus {
  background: #ffe0b2;
  box-shadow: 0 4px 24px #ffa72633;
  transform: translateY(-2px) scale(1.04);
}
.category-icon {
  font-size: 2.2rem;
  color: #ffa726;
}

/* Optional: hide scrollbar for better UX */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
