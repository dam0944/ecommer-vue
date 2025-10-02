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
    </div>
  </section>
  <!-- FACTS SECTION -->
   <div class="flex flex-col md:flex-row items-center justify-center font-poppins">
    <!-- Image -->
    <img
      class="max-w-2xl w-full"
      src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/features/card-image-1.png"
      alt=""
    />

    <!-- Features List -->
    <div class="space-y-6 px-4 md:px-0">
      <!-- Feature 1 -->
      <div class="flex items-center justify-center rounded-xl py-4 pr-4 gap-6 max-w-md bg-violet-100 border border-violet-200">
        <div class="p-6 aspect-square">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 18.667V24.5m4.668-8.167V24.5m4.664-12.833V24.5m2.333-21L15.578 13.587a.584.584 0 0 1-.826 0l-3.84-3.84a.583.583 0 0 0-.825 0L2.332 17.5M4.668 21v3.5m4.664-8.167V24.5"
              stroke="#7F22FE"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-base font-semibold text-slate-700">Real-Time Analytics</h3>
          <p class="text-sm text-slate-600">
            Get instant insights into your finances with live dashboards.
          </p>
        </div>
      </div>

      <!-- Feature 2 -->
      <div class="flex items-center justify-center rounded-xl py-4 pr-4 gap-6 max-w-md">
        <div class="p-6 aspect-square">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 11.667A2.333 2.333 0 0 0 11.667 14c0 1.19-.117 2.929-.304 4.667m4.972-3.36c0 2.776 0 7.443-1.167 10.36m5.004-1.144c.14-.7.502-2.683.583-3.523M2.332 14a11.667 11.667 0 0 1 21-7m-21 11.667h.01m23.092 0c.233-2.333.152-6.246 0-7"
              stroke="#00A63E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M5.832 22.75C6.415 21 6.999 17.5 6.999 14a7 7 0 0 1 .396-2.333m2.695 13.999c.245-.77.525-1.54.665-2.333m-.255-15.4A7 7 0 0 1 21 14v2.333"
              stroke="#00A63E"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-base font-semibold text-slate-700">Bank-Grade Security</h3>
          <p class="text-sm text-slate-600">
            End-to-end encryption, 2FA, compliance with GDPR standards.
          </p>
        </div>
      </div>

      <!-- Feature 3 -->
      <div class="flex items-center justify-center rounded-xl py-4 pr-4 gap-6 max-w-md">
        <div class="p-6 aspect-square">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M4.668 25.666h16.333a2.333 2.333 0 0 0 2.334-2.333V8.166L17.5 2.333H7a2.333 2.333 0 0 0-2.333 2.333v4.667"
              stroke="#F54900"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M16.332 2.333V7a2.334 2.334 0 0 0 2.333 2.333h4.667m-21 8.167h11.667M10.5 21l3.5-3.5-3.5-3.5"
              stroke="#F54900"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="space-y-2">
          <h3 class="text-base font-semibold text-slate-700">Customizable Reports</h3>
          <p class="text-sm text-slate-600">
            Export professional, audit-ready financial reports for tax or internal review.
          </p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
// No logic
</script>
