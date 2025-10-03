<template>
  <div>
    <!-- HERO SECTION -->
    <div class="relative min-h-[350px] mt-15">
    <img
      src="https://www.benoitproperties.com/wp-content/uploads/2023/06/cambodia-economy.png"
      class="w-full h-[350px] object-cover brightness-75 contrast-[1.03]"
      alt="About Us Hero"
    />
    <div class="absolute inset-0 bg-[#122549]/60"></div>
    <div class="absolute top-1/2 left-0 w-full transform -translate-y-1/2 text-center z-10 px-4">
      <h6 class="uppercase text-white/50 font-semibold tracking-[3px] mb-2">Company Profile</h6>
      <h1 class="text-4xl md:text-6xl font-bold text-white drop-shadow-md">ABOUT US</h1>
      <nav class="mt-2 flex justify-center text-sm breadcrumbs text-white/70">
        <ul>
          <li><a>Home</a></li>
          <li><a>Company</a></li>
          <li class="text-white">About Us</li>
        </ul>
      </nav>
    </div>
    <!-- Current Logo -->
    <div class="absolute top-10 left-1/2 -translate-x-1/2 z-20">
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/gridPatternBg.svg"
        alt="Current Logo"
        class="w-36 h-auto mx-auto drop-shadow"
      />
    </div>
  </div>

  <!-- ABOUT CONTENT SECTION -->
  <section class="py-10 bg-base-100">
    <div class="container mx-auto grid lg:grid-cols-2 gap-8">
      <!-- Images Grid -->
      <div class="grid w-full grid-cols-2 gap-3">
        <div class="col-span-2">
          <div class="rounded-xl overflow-hidden bg-base-200 p-2 shadow">
            <img
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80"
              class="rounded-lg transition"
              alt="Office Meeting"
            />
          </div>
        </div>
        <div>
          <div class="rounded-sm overflow-hidden bg-base-200 p-2">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80"
              class="rounded-sm transition"
              alt="Teamwork"
            />
          </div>
        </div>
        <div>
          <div class="rounded-sm overflow-hidden bg-base-200 p-2">
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
              class="rounded-sm transition"
              alt="Collaboration"
            />
          </div>
        </div>
      </div>

      <!-- Text Content -->
      <div class="card w-full bg-base-100 border border-base-300 pt-6 md:p-8 rounded-sm">
        <h2 class="text-3xl font-bold text-primary mb-4">Let tomorrow begin today.</h2>
        <p class="text-base-content/80 text-lg mb-4">
          We specialize in high-end computer and IT solutions as well as smart and versatile computer accessories...
        </p>
        <div class="mb-4">
          <h4 class="font-semibold text-primary">Our Mission</h4>
          <p class="text-base-content/80">Empower customers with the right technology and honest pricing.</p>
        </div>
        <div class="mb-4">
          <h4 class="font-semibold text-primary">Our Vision</h4>
          <p class="text-base-content/80">To be the region’s most trusted computer & accessories brand.</p>
        </div>
        <div>
          <h4 class="font-semibold text-primary">Our Strategy</h4>
          <p class="text-base-content/80">Provide curated selection, excellent support, and the latest tech.</p>
        </div>
      </div>
      <div>
          <h2>Customers</h2>
          <!-- Show skeleton when loading -->
          <div v-if="loading" class="mt-4">
            <Product_skeleton />
          </div>
          <ul>
            <li v-for="c in customers" :key="c.id">
              {{ c.name }} - {{ c.email }}   
            </li>
          </ul>
        </div>
    </div>
  </section>
  </div>
</template>

<script setup>
import Product_skeleton from "@/components/skeletons/Product_skeleton.vue";
import {request} from "../../../util/request"
import {ref,onMounted} from "vue"
const customers = ref([]);
const loading=ref(false);
onMounted(async () => {
  try {
    loading.value = true;
    customers.value = await request("Customers", "get");
  } catch (err) {
    console.error("Failed to fetch customers", err);
  }finally {
    loading.value = false;
  }
});
// No logic
</script>
