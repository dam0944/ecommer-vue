<template>
  <div class="bg-[#fafdff] rounded-2xl mb-8 pb-6 pt-3 px-1 w-full max-w-full">
    <div class="flex justify-between items-center mb-2 px-2">
      <h4 class="font-bold mb-0 text-lg md:text-xl">Top Sellers</h4>
      <a href="#" class="text-primary font-semibold underline view-all-link hover:text-blue-600 transition-colors">View All &gt;</a>
    </div>
    <div class="relative">
      <!-- Prev Button -->
      <button
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow w-11 h-11 flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition"
        @click="prevSlide"
        aria-label="Previous"
      >
        <svg class="w-7 h-7 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <!-- Carousel -->
      <div class="overflow-hidden">
        <div
          class="flex transition-transform duration-500 ease-[cubic-bezier(.36,.44,.28,1.05)]"
          :style="{ transform: `translateX(-${current * cardWidth}px)` }"
          ref="carouselTrack"
        >
          <div
            v-for="(seller, i) in sellers"
            :key="i"
            class="bg-white mx-2 rounded-xl border border-slate-100 shadow min-h-[220px] transition hover:shadow-xl hover:border-blue-500 overflow-hidden relative flex-shrink-0"
            :class="cardWidthClass"
            style="max-width: 300px; min-width: 300px"
          >
            <img :src="seller.banner" class="w-full object-cover h-[100px] rounded-t-xl seller-banner" />
            <div class="p-2">
              <div class="flex items-center mb-2">
                <img :src="seller.logo" class="rounded-full border-2 border-white shadow seller-logo" style="width:50px;height:50px;object-fit:cover;" />
                <div class="ml-2">
                  <strong class="seller-name block text-base font-bold text-slate-800">{{ seller.name }}</strong>
                  <div class="text-xs flex items-center gap-1 seller-rating">
                    <span class="text-primary font-semibold">{{ seller.rating }}</span>
                    <svg class="text-yellow-500 w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.75L6.16 21.23c-.62.36-1.37-.19-1.18-.89l1.56-6.21L2.13 9.87c-.51-.5-.23-1.37.48-1.46l6.29-.54 2.44-6.02c.26-.63 1.18-.63 1.44 0l2.44 6.02 6.29.54c.71.06.99.96.48 1.46l-4.41 4.26 1.56 6.21c.19.7-.56 1.25-1.18.89L12 17.75z"/></svg>
                    <span class="text-slate-400">Rating</span>
                  </div>
                </div>
              </div>
              <div class="flex justify-between mt-2 px-1 text-xs seller-stats">
                <div class="text-center">
                  <span class="text-primary font-bold block">{{ seller.reviews }}</span>
                  <span class="text-slate-400">Reviews</span>
                </div>
                <div class="text-center">
                  <span class="text-primary font-bold block">{{ seller.products }}</span>
                  <span class="text-slate-400">Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Next Button -->
      <button
        class="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow w-11 h-11 flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition"
        @click="nextSlide"
        aria-label="Next"
      >
        <svg class="w-7 h-7 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

const sellers = [
  {
    name: "Nika Electronics",
    banner: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80",
    logo: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: "4.9",
    reviews: 1080,
    products: 527,
  },
  {
    name: "Nika Phone Shop 310",
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    logo: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: "4.7",
    reviews: 800,
    products: 68,
  },
  {
    name: "Nika Computer",
    banner: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    logo: "https://randomuser.me/api/portraits/men/65.jpg",
    rating: "4.8",
    reviews: 950,
    products: 231,
  },
  {
    name: "Nika Accessories",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    logo: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: "5.0",
    reviews: 1200,
    products: 911,
  },
  {
    name: "Nika Market",
    banner: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    logo: "https://randomuser.me/api/portraits/men/23.jpg",
    rating: "4.5",
    reviews: 530,
    products: 311,
  },
  {
    name: "Nika Gadget",
    banner: "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=600&q=80",
    logo: "https://randomuser.me/api/portraits/men/76.jpg",
    rating: "4.6",
    reviews: 800,
    products: 677,
  },
];

const current = ref(0);
const cardsShown = ref(4);
const cardWidth = ref(304);
let autoSwapInterval = null;

const cardWidthClass = computed(() => {
  if (window.innerWidth <= 700) return "w-[92vw] min-w-[92vw] max-w-[92vw] mx-[1vw]";
  if (window.innerWidth <= 1000) return "w-[240px] min-w-[240px] max-w-[240px]";
  return "w-[300px] min-w-[300px] max-w-[300px]";
});

function updateCardsShown() {
  const width = window.innerWidth;
  if (width > 1200) {
    cardsShown.value = 4;
    cardWidth.value = 304;
  } else if (width > 900) {
    cardsShown.value = 3;
    cardWidth.value = 304;
  } else if (width > 600) {
    cardsShown.value = 2;
    cardWidth.value = 304;
  } else {
    cardsShown.value = 1;
    cardWidth.value = 304;
  }
  if (current.value > sellers.length - cardsShown.value) {
    current.value = Math.max(0, sellers.length - cardsShown.value);
  }
}

function nextSlide() {
  if (current.value < sellers.length - cardsShown.value) {
    current.value++;
  } else {
    current.value = 0;
  }
}
function prevSlide() {
  if (current.value > 0) {
    current.value--;
  } else {
    current.value = sellers.length - cardsShown.value;
  }
}

onMounted(() => {
  updateCardsShown();
  window.addEventListener("resize", updateCardsShown);
  autoSwapInterval = setInterval(() => {
    nextSlide();
  }, 3300);
});
onBeforeUnmount(() => {
  clearInterval(autoSwapInterval);
  window.removeEventListener("resize", updateCardsShown);
});
</script>