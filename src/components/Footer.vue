<template>
  <footer class="bg-primary text-base-200 py-10">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Logo and App Download Section -->
        <div>
          <div class="mb-4">
            <img :src="logo" alt="Logo" class="max-h-10 mb-3" />
          </div>
          <h5 class="mb-3 font-semibold text-lg">DOWNLOAD OUR APP</h5>
          <div class="flex gap-2">
            <a href="#" class="inline-block">
              <img src="https://web.nika2u.com/public/assets/front-end/png/apple_app.png" alt="Download on App Store" class="max-h-10 rounded" />
            </a>
            <a href="#" class="inline-block">
              <img src="https://web.nika2u.com/public/assets/front-end/png/google_app.png" alt="Get it on Google Play" class="max-h-10 rounded" />
            </a>
          </div>
        </div>

        <!-- Special Section -->
        <div>
          <h5 class="mb-3 font-semibold text-lg">SPECIAL</h5>
          <ul>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Featured Products</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Latest Products</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Best Selling Products</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Top Rated Products</a></li>
          </ul>
        </div>

        <!-- Account & Shipping Info Section -->
        <div>
          <h5 class="mb-3 font-semibold text-lg">ACCOUNT & SHIPPING INFO</h5>
          <ul>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Profile Info</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Wish List</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Track Order</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Refund Policy</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Return Policy</a></li>
            <li class="mb-2"><a href="#" class="link link-hover text-white hover:text-info transition">Cancellation Policy</a></li>
          </ul>
        </div>

        <!-- Newsletter Section -->
        <div>
          <h5 class="mb-3 font-semibold text-lg">NEWSLETTER</h5>
          <p class="mb-3 text-sm text-white/80">Subscribe to our newsletter to get the latest updates.</p>
          <!-- DaisyUI form -->
          <form class="mb-4 flex flex-col sm:flex-row gap-2" action="#" method="post" autocomplete="off">
            <input 
              type="email" 
              class="input input-bordered w-full sm:max-w-xs text-base-content flex-1"
              placeholder="Your Email Address"
              required
            >
            <button class="btn btn-primary" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Contact Information Section -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mt-10 pt-8 border-t border-white/20 text-sm">
        <div class="md:col-span-1">
          <h6 class="mb-2 font-semibold">Start A Conversation</h6>
        </div>
        <div class="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div class="flex items-center gap-2">
            <i class="bi bi-telephone"></i>
            <a href="tel:+85517935151" class="link link-hover hover:text-info transition">+85517935151</a>
          </div>
          <div class="flex items-center gap-2">
            <i class="bi bi-envelope"></i>
            <a href="mailto:info@nika2u.com" class="link link-hover hover:text-info transition">info@nika2u.com</a>
          </div>
          <div class="flex items-center gap-2">
            <i class="bi bi-headset"></i>
            <a href="#" class="link link-hover hover:text-info transition">Support ticket</a>
          </div>
          <div>
            <h6 class="mb-1 font-semibold">Address</h6>
            <small>Street 310, #450 BKK3, BKK Phnom Penh</small>
          </div>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 pt-6 border-t border-white/20 items-center text-sm">
        <div>
          <p class="mb-0">Nika © 2025</p>
        </div>
        <div class="flex flex-col md:flex-row items-center md:justify-end gap-3">
          <!-- Social Media Icons -->
          <div class="flex gap-2">
            <a href="#" class="btn btn-sm btn-circle btn-ghost hover:text-info transition" aria-label="Instagram">
              <i class="bi bi-instagram text-lg"></i>
            </a>
            <a href="#" class="btn btn-sm btn-circle btn-ghost hover:text-info transition" aria-label="Facebook">
              <i class="bi bi-facebook text-lg"></i>
            </a>
            <a href="#" class="btn btn-sm btn-circle btn-ghost hover:text-info transition" aria-label="Telegram">
              <i class="bi bi-telegram text-lg"></i>
            </a>
            <a href="#" class="btn btn-sm btn-circle btn-ghost hover:text-info transition" aria-label="YouTube">
              <i class="bi bi-youtube text-lg"></i>
            </a>
          </div>
          <!-- Legal Links -->
          <div class="flex gap-3">
            <a href="#" class="link link-hover hover:text-info transition">Terms & Conditions</a>
            <a href="#" class="link link-hover hover:text-info transition">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
  import logo from "../assets/image copy 2.png";
</script>

<style scoped>
.bg-primary {
  background-color: #2c5f7c !important;
}
.text-info, .hover\:text-info:hover {
  color: #17a2b8 !important;
}
</style>