<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="navbar bg-base-100 sticky top-0 z-10">
      <div class="navbar-start">
        <div class="flex items-center gap-4">
          <!-- Updated to use Daisy UI navbar and badge components -->
          <h2 class="text-lg font-bold text-primary flex items-center gap-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            Search
          </h2>
          <div class="btn-group">
            <button class="btn btn-primary btn-sm">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
              </svg>
            </button>
            <button class="btn btn-ghost btn-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="navbar-center">
        <!-- Added badge for results info -->
        <div class="badge badge-outline">
          Showing <span class="font-medium text-primary">1 - 9 of 9 results</span>
        </div>
      </div>

      <div class="navbar-end">
        <!-- Updated sort dropdown to use Daisy UI select -->
        <div class="flex items-center gap-2">
          <span class="text-sm">Sort By:</span>
          <select class="select select-bordered select-sm">
            <option>Newest</option>
            <option>Alphabetical A-Z</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>

    <div class="container mx-auto py-6">
      <div class="flex flex-col lg:flex-row gap-5">
        <!-- Sidebar -->
        <!-- Updated sidebar to use Daisy UI card component -->
        <aside class="w-full lg:w-80 flex-shrink-0">
          <div class="card bg-base-100 shadow-sm">
            <div class="card-body">
              <!-- Search Input -->
              <!-- Updated search input to use Daisy UI input component -->
              <div class="form-control mb-6">
                <div class="input-group">
                  <input 
                    type="text" 
                    placeholder="Search our store"
                    class="input input-bordered flex-1"
                  >
                  <button class="btn btn-square btn-primary">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <!-- Categories -->
              <div class="mb-8">
                <h3 class="font-semibold text-primary mb-4 text-lg">Categories</h3>
                <div class="space-y-3">
                  <!-- Updated checkboxes to use Daisy UI checkbox component -->
                  <div v-for="category in categories" :key="category.name" class="flex items-center justify-between">
                    <label class="label cursor-pointer justify-start gap-3">
                      <input type="checkbox" class="checkbox checkbox-primary">
                      <span class="label-text">{{ category.name }}</span>
                    </label>
                    <div class="badge badge-ghost">({{ category.count }})</div>
                  </div>
                </div>
              </div>

              <!-- Tags -->
              <div class="mb-8">
                <h3 class="font-semibold text-primary mb-4 text-lg">Tags</h3>
                <!-- Updated tags to use Daisy UI badge component -->
                <div class="flex flex-wrap gap-2">
                  <div v-for="tag in tags" :key="tag" class="badge badge-primary badge-outline hover:badge-primary cursor-pointer transition-colors">
                    {{ tag }}
                  </div>
                </div>
              </div>

              <!-- Color -->
              <div>
                <h3 class="font-semibold text-primary mb-4 text-lg">Color</h3>
                <!-- Enhanced color swatches with better hover effects -->
                <div class="flex flex-wrap gap-3">
                  <button 
                    v-for="color in colors" 
                    :key="color.name"
                    :class="color.class"
                    class="w-8 h-8 rounded-full border-2 border-base-300 hover:scale-110 hover:border-primary transition-all duration-200 tooltip"
                    :data-tip="color.name"
                  ></button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <!-- Enhanced product cards with cleaner styling, ratings, badges, and better hover effects -->
        <div class="flex-1">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            <div 
              v-for="product in products" 
              :key="product.id"
              class="card hover:-translate-y-1 transition-all duration-300 border border-base-200 hover:border-primary/20 group"
            >
              <!-- Product Image with enhanced styling -->
              <figure class="px-3 pt-6 relative overflow-hidden">
                <!-- Added sale badge and wishlist button -->
                <div class="absolute top-2 left-2 z-10">
                  <div class="badge badge-error text-white font-semibold" v-if="product.onSale">
                    -{{ product.discount }}%
                  </div>
                </div>
                <div class="absolute top-2 right-2 z-10">
                  <button class="btn btn-circle btn-ghost btn-sm bg-base-100/80 hover:bg-base-100 hover:text-error transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.682l-1.318-1.364a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
                <img 
                  :src="product.image" 
                  :alt="product.name"
                  class="rounded-xl w-full h-52 object-contain bg-gradient-to-br from-base-200 to-base-300 group-hover:scale-105 transition-transform duration-300"
                />
              </figure>
              
              <!-- Enhanced product info with ratings, better typography, and improved layout -->
              <div class="card-body px-3 pb-6">
                <!-- Product category badge -->
                <div class="mb-2">
                  <div class="badge badge-outline badge-sm">{{ product.category }}</div>
                </div>
                
                <!-- Product name with better typography -->
                <h3 class="card-title text-base font-semibold leading-tight line-clamp-2 text-base-content group-hover:text-primary transition-colors">
                  {{ product.name }}
                </h3>
                <!-- Feature highlights -->
                <div class="flex flex-wrap gap-1 mb-4" v-if="product.features">
                  <div 
                    v-for="feature in product.features.slice(0, 2)" 
                    :key="feature"
                    class="badge badge-primary badge-xs"
                  >
                    {{ feature }}
                  </div>
                </div>
                
                <!-- Price and action section -->
                <div class="card-actions justify-between items-center mt-auto">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                      <span class="text-2xl font-bold text-primary">
                        ${{ product.onSale ? product.salePrice : product.price }}
                      </span>
                      <span v-if="product.onSale" class="text-sm text-base-content/50 line-through">
                        ${{ product.price }}
                      </span>
                    </div>
                    <span class="text-xs text-success font-medium" v-if="product.inStock">
                      ✓ In Stock
                    </span>
                    <span class="text-xs text-warning font-medium" v-else-if="product.lowStock">
                      ⚠ Only {{ product.stockCount }} left
                    </span>
                    <span class="text-xs text-error font-medium" v-else>
                      ✗ Out of Stock
                    </span>
                  </div>
                  
                  <!-- Enhanced action buttons -->
                  <div class="flex flex-col w-full">
                    <button 
                      class="btn btn-primary btn-sm hover:btn-primary-focus transition-colors"
                      :disabled="!product.inStock && !product.lowStock"
                    >
                      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"/>
                      </svg>
                      Add to Cart
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
    
// Simulated 2025 popular products with more up-to-date names and images
const topRatedProducts = ref([
  { id: 1, name: 'Apple iPhone 15 Pro Max', price: '1199.00', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-max-2025.jpg?wid=120&hei=120&fmt=png-alpha&.v=2025' },
  { id: 2, name: 'Samsung Galaxy S25 Ultra', price: '1099.00', image: 'https://images.samsung.com/is/image/samsung/assets/s25-ultra-thumb.png' },
  { id: 3, name: 'MacBook Pro M4 (2025)', price: '2299.00', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-pro-m4-2025.jpg?wid=120&hei=120&fmt=png-alpha&.v=2025' },
  { id: 4, name: 'Sony WH-1000XM6 Headphones', price: '399.00', image: 'https://cdn.sony.com/images/wh1000xm6-thumb.jpg' },
  { id: 5, name: 'Apple Watch Series 11', price: '599.00', image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-series-11-thumb.jpg?wid=120&hei=120&fmt=png-alpha&.v=2025' }
])

const categories = ref([
  { name: 'All Categories', count: 9 },
  { name: 'Smartphones', count: 3 },
  { name: 'Laptops', count: 2 },   
  { name: 'Headphones', count: 2 },
  { name: 'Wearables', count: 2 }
])

const tags = ref(['5G', 'OLED', 'Noise Canceling', 'M4 Chip', 'Waterproof', 'Wireless', 'USB-C', 'Touchscreen', '2025 Edition'])

const colors = ref([
  { name: 'Yellow', class: 'bg-yellow-400' },
  { name: 'Orange', class: 'bg-orange-500' },
  { name: 'Red', class: 'bg-red-500' },
  { name: 'Pink', class: 'bg-pink-500' },
  { name: 'Purple', class: 'bg-purple-500' },
  { name: 'Blue', class: 'bg-blue-500' },
  { name: 'Green', class: 'bg-green-500' },
  { name: 'Black', class: 'bg-black' }
])

const products = ref([
  {
    id: 1,
    name: 'ASUS ProArt Display PA278QV 27" WQHD Monitor',
    price: '299.99',
    salePrice: '249.99',
    onSale: true,
    discount: 17,
    category: 'Professional',
    rating: 4,
    reviews: 128,
    features: ['IPS Panel', 'USB-C'],
    inStock: true,
    image: 'https://tse1.mm.bing.net/th/id/OIP.SRI5yuwnqNRd6hQjHFBK4wHaGL?pid=Api&P=0&h=220'
  },
  {
    id: 2,
    name: 'Samsung Odyssey G7 32" Curved Gaming Monitor',
    price: '599.99',
    category: 'Gaming',
    rating: 5,
    reviews: 89,
    features: ['240Hz', 'G-Sync'],
    inStock: true,
    image: 'https://tse2.mm.bing.net/th/id/OIP._ThcJgVk4D7TnHEzHYtZegHaHa?pid=Api&P=0&h=220'
  },
  {
    id: 3,
    name: 'LG UltraWide 34" 5K2K Nano IPS Monitor',
    price: '899.99',
    salePrice: '799.99',
    onSale: true,
    discount: 11,
    category: 'Ultrawide',
    rating: 4,
    reviews: 156,
    features: ['Nano IPS', 'HDR10'],
    lowStock: true,
    stockCount: 3,
    image: 'https://tse1.mm.bing.net/th/id/OIP.onFlY4e97nrQhesQNg9jFwHaHa?pid=Api&P=0&h=220'
  },
  {
    id: 4,
    name: 'Dell UltraSharp U2723QE 27" 4K USB-C Monitor',
    price: '649.99',
    category: 'Professional',
    rating: 5,
    reviews: 203,
    features: ['4K UHD', 'USB-C Hub'],
    inStock: true,
    image: 'https://tse1.mm.bing.net/th/id/OIP.4cB4ZS_3WiZeyPCcsh8YsQHaHa?pid=Api&P=0&h=220'
  },
  {
    id: 5,
    name: 'AOC CQ27G2 27" Curved Gaming Monitor 144Hz',
    price: '199.99',
    category: 'Gaming',
    rating: 4,
    reviews: 94,
    features: ['144Hz', 'FreeSync'],
    inStock: true,
    image: 'https://tse3.mm.bing.net/th/id/OIP.6oc81F8n-a9t6fEQHPKI7wHaHa?pid=Api&P=0&h=220'
  },
  {
    id: 6,
    name: 'BenQ PD3220U 32" 4K Designer Monitor',
    price: '899.99',
    category: 'Professional',
    rating: 5,
    reviews: 67,
    features: ['4K UHD', 'Color Accurate'],
    inStock: false,
    image: 'https://tse2.mm.bing.net/th/id/OIP.PH8-fFSqBrA-4fZyL7-figHaH6?pid=Api&P=0&h=220'
  },
  {
    id: 7,
    name: 'HP E24 G5 24" Full HD Business Monitor',
    price: '159.99',
    salePrice: '129.99',
    onSale: true,
    discount: 19,
    category: 'Business',
    rating: 3,
    reviews: 45,
    features: ['Full HD', 'Ergonomic'],
    inStock: true,
    image: 'https://tse1.mm.bing.net/th/id/OIP.7YSX5bu-lsN86VpuyTYClQAAAA?pid=Api&P=0&h=220'
  },
  {
    id: 8,
    name: 'MSI Optix MAG274QRF-QD 27" Gaming Monitor',
    price: '399.99',
    category: 'Gaming',
    rating: 4,
    reviews: 112,
    features: ['165Hz', 'Quantum Dot'],
    lowStock: true,
    stockCount: 2,
    image: 'https://tse3.mm.bing.net/th/id/OIP.rjV9_aVIHnlzytural2uAgHaHa?pid=Api&P=0&h=220'
  },
  {
    id: 9,
    name: 'Acer Predator X27 27" 4K HDR Gaming Monitor',
    price: '1299.99',
    category: 'Gaming',
    rating: 5,
    reviews: 78,
    features: ['4K HDR', 'G-Sync Ultimate'],
    inStock: true,
    image: 'https://tse3.mm.bing.net/th/id/OIP.7f7I9VkZx7oSmpDLNmYbPgHaFo?pid=Api&P=0&h=220'
  }
])
</script>

<style>
/* Added line-clamp utility for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
