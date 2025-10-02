<template>
  <div class="drawer">
    <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />

    <!-- Page Content -->
    <div class="drawer-content flex flex-col">
      <!-- Navbar -->
      <header
        class="bg-white/80 border-b border-gray-200 fixed w-full top-0 z-40 backdrop-blur-md shadow transition-shadow duration-300"
      >
        <!-- Fixed container structure and removed inline styles -->
        <div class="container px-3 sm:px-4 md:px-6 h-14 sm:h-16 mx-auto flex items-center justify-between responsive-container">
          <!-- Mobile Menu -->
          <div class="flex-none lg:hidden">
            <label
              for="my-drawer-3"
              aria-label="open sidebar"
              class="btn btn-square btn-ghost btn-sm sm:btn-md hover:bg-gray-100 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-5 w-5 sm:h-6 sm:w-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <!-- Responsive logo with better mobile sizing -->
          <router-link
            to="/"
            class="flex items-center gap-2 sm:gap-2.5 hover:opacity-80 transition flex-1 lg:flex-none justify-center lg:justify-start"
          >
            <div class="flex items-center">
              <img :src="logo" alt="Logo" class="max-h-8 sm:max-h-10 mb-2 sm:mb-3" />
            </div>
          </router-link>

          <!-- Desktop Nav -->
          <nav class="flex-none hidden lg:block">
            <ul class="flex gap-1 xl:gap-2 items-center">
              <li>
                <router-link
                  to="/"
                  class="px-3 xl:px-4 py-2 rounded-md font-medium text-sm xl:text-base text-gray-700 hover:bg-gray-100 transition"
                >Home</router-link>
              </li>
              <li>
                <router-link
                  to="/brand"
                  class="px-3 xl:px-4 py-2 rounded-md font-medium text-sm xl:text-base text-gray-700 hover:bg-gray-100 transition"
                >Branding</router-link>
              </li>
              <li v-if="user.loggedIn">
                <router-link
                  to="/product-grid"
                  class="px-3 xl:px-4 py-2 rounded-md font-medium text-sm xl:text-base text-gray-700 hover:bg-gray-100 transition"
                >Discount Product</router-link>
              </li>
              <li>
                <router-link
                  to="/about"
                  class="px-3 xl:px-4 py-2 rounded-md font-medium text-sm xl:text-base text-gray-700 hover:bg-gray-100 transition"
                >About</router-link>
              </li>
            </ul>
          </nav>

          <!-- Enhanced responsive actions with better mobile spacing -->
          <div class="flex items-center gap-2 sm:gap-3 md:gap-4">
            <!-- Cart -->
            <router-link to="/viewcard" class="relative flex items-center group p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-indigo-600 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="7" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
              </svg>
              <span
                v-if="cartCount > 0"
                class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-indigo-600 text-white rounded-full text-xs px-1.5 py-0.5 sm:px-2 shadow min-w-[1.25rem] h-5 flex items-center justify-center"
              >{{ cartCount }}</span>
            </router-link>

            <!-- Simplified conditional rendering structure -->
            <template v-if="user.loggedIn">
              <div class="dropdown dropdown-end">
                <div
                  class="btn btn-ghost btn-circle btn-sm sm:btn-md avatar"
                  role="button"
                  tabindex="0"
                >
                  <div class="w-8 sm:w-10 rounded-full ring ring-indigo-500 ring-offset-white ring-offset-1 sm:ring-offset-2">
                    <img
                      :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.name"
                      :alt="user.name"
                    />
                  </div>
                </div>
                <ul
                  tabindex="0"
                  class="menu menu-sm dropdown-content bg-white rounded-xl z-[1] mt-3 w-48 sm:w-52 p-2 shadow-lg border"
                >
                  <li>
                    <router-link to="/profile" class="flex justify-between items-center">
                      Profile
                      <span class="badge bg-indigo-50 text-indigo-600">New</span>
                    </router-link>
                  </li>
                  <li><router-link to="/settings">Settings</router-link></li>
                  <li><a @click="logout" class="text-red-500 hover:underline">Logout</a></li>
                </ul>
              </div>
            </template>
            
            <template v-else>
              <!-- Desktop login button -->
              <div class="hidden sm:block">
                <router-link to="/login" class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition font-medium text-sm sm:text-base">
                  Login
                </router-link>
              </div>
              <!-- Mobile login icon -->
              <div class="block sm:hidden">
                <router-link to="/login" class="btn btn-ghost btn-sm btn-circle">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </router-link>
              </div>
            </template>
          </div>
        </div>
      </header>

      <!-- Responsive spacer -->
      <div class="pt-14 sm:pt-16"></div>
    </div>
    
    <!-- Enhanced mobile drawer with better organization -->
    <div class="drawer-side">
      <label
        for="my-drawer-3"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-72 sm:w-80 min-h-full bg-white text-gray-700 space-y-1">
        <!-- Simplified mobile user section structure -->
        <template v-if="user.loggedIn">
          <li class="mb-4">
            <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div class="avatar">
                <div class="w-10 rounded-full ring ring-indigo-500 ring-offset-white ring-offset-1">
                  <img
                    :src="user.avatar || 'https://ui-avatars.com/api/?name=' + user.name"
                    :alt="user.name"
                  />
                </div>
              </div>
              <div>
                <p class="font-medium text-gray-900">{{ user.name }}</p>
                <p class="text-sm text-gray-500">Welcome back!</p>
              </div>
            </div>
          </li>
        </template>
        
        <!-- Enhanced navigation links -->
        <li><router-link to="/" class="rounded-lg px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition font-medium">🏠 Home</router-link></li>
        <li><router-link to="/brand" class="rounded-lg px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition font-medium">🎨 Branding</router-link></li>
        <li v-if="user.loggedIn">
          <router-link to="/product-grid" class="rounded-lg px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition font-medium">🛍️ Discount Product</router-link>
        </li>
        <li><router-link to="/about" class="rounded-lg px-4 py-3 hover:bg-indigo-50 hover:text-indigo-600 transition font-medium">ℹ️ About</router-link></li>
        
        <!-- Mobile-specific actions -->
        <div class="divider my-4"></div>
        
        <template v-if="user.loggedIn">
          <li><router-link to="/profile" class="rounded-lg px-4 py-3 hover:bg-gray-50 transition font-medium">👤 Profile</router-link></li>
          <li><router-link to="/settings" class="rounded-lg px-4 py-3 hover:bg-gray-50 transition font-medium">⚙️ Settings</router-link></li>
          <li><a @click="logout" class="rounded-lg px-4 py-3 text-red-500 hover:bg-red-50 transition font-medium">🚪 Logout</a></li>
        </template>
        
        <template v-else>
          <li>
            <router-link to="/login" class="rounded-lg px-4 py-3 bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium">
              👤 Login
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import logo from "../assets/image copy 2.png";

const router = useRouter();

const user = reactive({
  name: "John Doe",
  avatar: "",
  loggedIn: true,
});

const cart = reactive({
  items: [
    { name: "Mouse", price: 29 },
    { name: "Keyboard", price: 70 },
    { name: "Monitor", price: 200 },
  ],
});

const cartCount = computed(() => cart.items.length);
const cartSubtotal = computed(() =>
  cart.items.reduce((sum, item) => sum + item.price, 0)
);

function logout() {
  user.loggedIn = false;
  router.push("/login");
}
</script>

<style scoped>
header {
  font-family: 'Inter', 'Poppins', Arial, sans-serif;
  background: rgba(255,255,255,0.85);
}

/* Added responsive container class */
.responsive-container {
  max-width: 1350px;
}

/* Enhanced responsive styles */
</style>

