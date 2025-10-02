<template>
  <section
    aria-label="Ecommerce hero"
    class="relative flex flex-col items-center bg-[radial-gradient(1200px_600px_at_50%_-50%,#f3e8ff_0%,transparent_70%)] bg-cover pb-8 sm:pb-12 lg:pb-16 text-sm font-poppins text-gray-800"
  >
     <!-- Brand motif  -->
    <div class="pt-6 sm:pt-8">
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridPatternBg.svg"
        alt="Brand pattern"
        class="mx-auto h-auto w-28 sm:w-32 md:w-36"
      />
    </div>

     <!-- Announcement badge (current info: sale countdown)  -->
    <div
      class="mt-4 sm:mt-5 mx-4 inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-fuchsia-200 bg-white/70 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-fuchsia-700 shadow-sm backdrop-blur"
      role="status"
      aria-live="polite"
    >
      <span class="inline-block">✨</span>
      <span class="whitespace-nowrap">Summer Sale</span>
      <span class="hidden xs:inline">·</span>
      <span class="hidden xs:inline">up to 50% off</span>
      <span class="text-fuchsia-500 hidden sm:inline">•</span>
      <span v-if="saleEndsText" class="hidden sm:inline">{{ saleEndsText }}</span>
      <span v-else class="hidden sm:inline">Ends soon</span>
    </div>

     <!-- Community  -->
    <div class="mt-3 sm:mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4">
      <div class="flex items-center">
        <img
          class="size-6 sm:size-7 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=80&h=80&auto=format&fit=crop"
          alt="Shopper profile 1"
        />
        <img
          class="size-6 sm:size-7 -translate-x-1.5 sm:-translate-x-2 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&h=80&auto=format&fit=crop"
          alt="Shopper profile 2"
        />
        <img
          class="size-6 sm:size-7 -translate-x-3 sm:-translate-x-4 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=80&h=80&auto=format&fit=crop"
          alt="Shopper profile 3"
        />
      </div>
      <div class="flex items-center rounded-full border border-indigo-100 bg-white/70 px-2.5 sm:px-3 py-1.5 text-xs backdrop-blur">
        <p class="-translate-x-1 whitespace-nowrap text-xs">
          Trusted by {{ shoppersFormatted }}+ shoppers
        </p>
      </div>
    </div>

     <!-- Headline  -->
    <h1
      class="mx-auto mt-4 sm:mt-6 max-w-3xl bg-gradient-to-r from-black to-[#748298] bg-clip-text text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-transparent px-4"
    >
      Shop smarter. Style better.
    </h1>

     <!-- Subheadline  -->
    <p class="mx-auto mt-2 sm:mt-3 max-w-xl px-4 sm:px-6 text-center text-sm sm:text-base text-slate-600">
      Discover {{ productsFormatted }} products with fast delivery, easy 30‑day returns, and secure checkout.
      <span class="hidden sm:inline">Today's top deals are selling fast — don't miss out.</span>
    </p>

     <!-- CTAs  -->
    <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 px-4">
      <!-- Updated primary button to use Daisy UI btn-primary with better styling -->
      <a
        href="#sale"
        class="btn btn-primary btn-lg w-full sm:w-auto gap-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        aria-label="Shop the sale"
      >
        Shop the sale
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M4.166 10h11.667m0 0L9.999 4.167M15.833 10l-5.834 5.834"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
      <!-- Updated secondary button to use Daisy UI btn-outline with better styling -->
      <a
        href="#categories"
        class="btn btn-outline btn-lg w-full sm:w-auto rounded-full hover:btn-primary transition-all duration-300"
      >
        Explore categories
      </a>
    </div>

     <!-- Trust badges  -->
    <div
      class="mx-auto mt-4 sm:mt-6 grid w-full max-w-3xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 px-4"
      aria-label="Key shopping benefits"
    >
      <div class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-2.5 sm:px-3 py-2 backdrop-blur text-xs sm:text-sm">
        <span aria-hidden="true">🚚</span>
        <span class="whitespace-nowrap">Free shipping over {{ currency(shippingThreshold) }}</span>
      </div>
      <div class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-2.5 sm:px-3 py-2 backdrop-blur text-xs sm:text-sm">
        <span aria-hidden="true">🔐</span>
        <span>Secure checkout</span>
      </div>
      <div class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-2.5 sm:px-3 py-2 backdrop-blur text-xs sm:text-sm">
        <span aria-hidden="true">↩️</span>
        <span>30‑day returns</span>
      </div>
      <div class="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-2.5 sm:px-3 py-2 backdrop-blur text-xs sm:text-sm">
        <span aria-hidden="true">⏱️</span>
        <span>{{ deliveryEstimate }}</span>
      </div>
    </div>

     <!-- Quick stats (current info highlights)  -->
    <div class="mx-auto mt-4 sm:mt-6 grid w-full max-w-4xl grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-4 text-center">
      <div class="rounded-xl border border-slate-200 bg-white/70 p-3 sm:p-4 backdrop-blur">
        <p class="text-xl sm:text-2xl font-bold text-slate-900">{{ productsFormatted }}</p>
        <p class="text-xs text-slate-600">Products in stock</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white/70 p-3 sm:p-4 backdrop-blur">
        <p class="text-xl sm:text-2xl font-bold text-slate-900">{{ reviewsFormatted }}+</p>
        <p class="text-xs text-slate-600">5‑star reviews</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white/70 p-3 sm:p-4 backdrop-blur">
        <p class="text-xl sm:text-2xl font-bold text-slate-900">2‑4 days</p>
        <p class="text-xs text-slate-600">Avg delivery time</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue"

/**
 * “Current” ecommerce info you can wire to your backend later.
 * Replace these constants with live values from your API.
 */
const shippingThreshold = 50
const totalProducts = 3200
const totalFiveStarReviews = 95000
const shoppers = 1000000
const deliveryEstimate = "Fast delivery"

/**
 * Sale countdown: ends at local month end, 23:59:59
 */
const saleEndsText = computed(() => {
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
  const ms = end.getTime() - now.getTime()
  if (ms <= 0) return ""
  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return `${days} day${days === 1 ? "" : "s"} left`
  if (hours > 0) return `Ends in ${hours}h`
  return "Ends today"
})

/**
 * Helpers for formatting
 */
const currency = (n: number, locale = navigator.language || "en-US") =>
  new Intl.NumberFormat(locale, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

const number = (n: number, locale = navigator.language || "en-US") =>
  new Intl.NumberFormat(locale).format(n)

const productsFormatted = computed(() => number(totalProducts))
const reviewsFormatted = computed(() => number(totalFiveStarReviews))
const shoppersFormatted = computed(() => number(shoppers))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

.font-poppins {
  font-family: 'Poppins', ui-sans-serif, system-ui, -apple-system, Segoe UI,
    Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
    transform: none;
  }
}
</style>
