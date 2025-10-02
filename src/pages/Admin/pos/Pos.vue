<template>
  <div class="pos-fullscreen d-flex flex-column">
    <!-- Header Row -->
    <div class="pos-header d-flex flex-wrap gap-2 align-items-center mb-3 px-4 pt-4 shadow-sm bg-white">
      <select class="form-select pos-header-select" v-model="selectedEmployee">
        <option disabled value="">Select Employee</option>
        <option v-for="emp in employees" :key="emp">{{ emp }}</option>
      </select>
      <select class="form-select pos-header-select" v-model="selectedCustomer">
        <option value="Regular Customer">Regular Customer</option>
        <option value="VIP Customer">VIP Customer</option>
      </select>
      <input class="form-control pos-header-input" v-model="search" placeholder="Search by name, code, category" />
      <input class="form-control pos-header-barcode" v-model="barcode" placeholder="Barcode" />
      <button class="btn btn-primary pos-header-barcode-btn" type="button">
        <i class="bi bi-upc-scan"></i> Barcode
      </button>
    </div>
    <div class="d-flex flex-row flex-grow-1 px-4" style="width: 100vw; min-height: 0;">
      <!-- Left: Cart Section -->
      <div class="flex-grow-1 d-flex flex-column pos-cart-section">
        <div class="mb-2 d-flex gap-2">
          <button class="btn btn-outline-secondary rounded-circle pos-cart-action-btn" title="Edit">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-outline-secondary rounded-circle pos-cart-action-btn" title="Add">
            <i class="bi bi-plus"></i>
          </button>
        </div>
        <div class="pos-cart-table-wrapper">
          <table class="table table-bordered table-hover bg-white pos-cart-table">
            <thead class="table-light">
              <tr>
                <th>Item</th>
                <th class="text-end">Price</th>
                <th class="text-center">Qty</th>
                <th class="text-end">Discount</th>
                <th class="text-end">Sub Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.code">
                <td>{{ item.name }}</td>
                <td class="text-end">{{ item.price }}</td>
                <td class="text-center">{{ item.qty }}</td>
                <td class="text-end">{{ item.discount }}</td>
                <td class="text-end">{{ (item.price * item.qty - item.discount).toFixed(2) }}</td>
              </tr>
              <tr v-if="cart.length === 0">
                <td colspan="5" class="text-center text-muted">No items</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-grow-1"></div>
        <!-- Bottom summary and actions always at the bottom -->
        <div class="pos-bottom-summary mt-auto">
          <div class="row mb-1">
            <div class="col-6 col-md-3">Total:</div>
            <div class="col-6 col-md-3 text-end fw-bold">{{ total.toFixed(2) }}</div>
            <div class="col-6 col-md-3">Total Item:</div>
            <div class="col-6 col-md-3 text-end">{{ cart.length }}</div>
          </div>
          <div class="row mb-1">
            <div class="col-6 col-md-3">Tax:</div>
            <div class="col-6 col-md-3 text-end">0.0</div>
            <div class="col-6 col-md-3">Discount:</div>
            <div class="col-6 col-md-3 text-end text-success fw-bold">{{ totalDiscount.toFixed(2) }}</div>
          </div>
          <div class="row mb-1">
            <div class="col-6 col-md-3">Charge:</div>
            <div class="col-6 col-md-3 text-end">0.0</div>
            <div class="col-6 col-md-3">Rounding:</div>
            <div class="col-6 col-md-3 text-end">0.0</div>
          </div>
          <div class="mb-1">Delivery Partner:</div>
          <div class="bg-white p-2 rounded mb-2 text-center fs-5 fw-bold border pos-total-payable">
            Total Payable: {{ totalPayable.toFixed(2) }}
          </div>
          <div class="d-flex gap-2 justify-content-center pos-action-btns">
            <button class="btn btn-danger px-4 shadow-sm"><i class="bi bi-x-circle"></i> Cancel</button>
            <button class="btn btn-warning px-4 text-white shadow-sm"><i class="bi bi-pause-circle"></i> Hold</button>
            <button class="btn btn-success px-4 shadow-sm"><i class="bi bi-credit-card"></i> Payment</button>
          </div>
        </div>
      </div>
      <!-- Right: Categories and Products -->
      <div class="d-flex flex-row flex-grow-1 ms-4 pos-products-section">
        <!-- Categories -->
        <div class="me-2 pos-categories">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="selectedCategory = cat"
            class="btn w-100 mb-2 pos-category-btn"
            :class="cat === selectedCategory ? 'btn-primary' : 'btn-violet'"
          >
            {{ cat }}
          </button>
        </div>
        <!-- Products -->
        <div class="flex-fill pos-products-list">
          <div class="row row-cols-2 row-cols-md-3 g-2">
            <div
              v-for="prod in filteredProducts"
              :key="prod.code"
              class="col"
            >
              <div class="card h-100 product-card" @click="addToCart(prod)">
                <div class="card-body text-center d-flex flex-column justify-content-between">
                  <div style="font-size: 2rem;">
                    <i :class="prod.icon" v-if="prod.icon"></i>
                    <img :src="prod.image" v-else-if="prod.image" style="width:32px;height:32px;" />
                  </div>
                  <div class="text-truncate mt-2">{{ prod.name }}</div>
                  <div class="text-muted small">{{ prod.code }}</div>
                  <div class="fw-bold" style="color:#7B3FF2;">SP: {{ prod.price }}</div>
                </div>
              </div>
            </div>
            <div v-if="filteredProducts.length === 0" class="col-12 text-center text-muted pt-5">
              No products found
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Product {
  name: string;
  code: string;
  price: number;
  image?: string;
  icon?: string;
  category: string;
  discount?: number;
}
interface CartItem extends Product {
  qty: number;
  discount: number;
}

const employees = ['Alice', 'Bob', 'Charlie'];
const categories = [
  'All', 'new', 'sh', 'Chicken', 'EC', 'Free Download', 'Boy', 'MOTOS', 'Ice-Cream', 'Punjabi', 'Snack Food', 'Shoes'
];

const products = ref<Product[]>([
  { name: "Full Sleeve Classic Fit Shirt", code: "10110", price: 100, icon: "bi bi-person-badge", category: "All" },
  { name: "GALVANO - RFL", code: "10110", price: 550, icon: "bi bi-camera", category: "All" },
  { name: "Ham Burger", code: "10115", price: 0, icon: "bi bi-emoji-smile", category: "All" },
  { name: "Hersheys Moments Choco", code: "2095", price: 2095, icon: "bi bi-box", category: "All" },
  { name: "Hisense 50A6F3 50'' Bez...", code: "48901", price: 48901, icon: "bi bi-tv", category: "All" },
  { name: "Hollywood 2fresh", code: "1000", price: 1000, icon: "bi bi-camera", category: "All" },
  { name: "Honor X60 Pro", code: "10059", price: 30000, icon: "bi bi-tablet", category: "All" },
  { name: "Igloo Ambrosia Ice Cream", code: "400", price: 400, icon: "bi bi-cup-straw", category: "All" },
  { name: "iphone 12", code: "10102", price: 1500, icon: "bi bi-phone", category: "All" },
]);

const selectedEmployee = ref('');
const selectedCustomer = ref('Regular Customer');
const selectedCategory = ref('All');
const search = ref('');
const barcode = ref('');
const cart = ref<CartItem[]>([
  { name: "Hersheys Moments Choco", code: "2095", price: 2095, icon: "bi bi-box", category: "All", qty: 1, discount: 0 },
  { name: "Full Sleeve Classic Fit Shirt", code: "10110", price: 100, icon: "bi bi-person-badge", category: "All", qty: 1, discount: 0 },
]);

const filteredProducts = computed(() => {
  let list = products.value;
  if (selectedCategory.value !== 'All') {
    list = list.filter(p => p.category === selectedCategory.value);
  }
  if (search.value.trim()) {
    const s = search.value.trim().toLowerCase();
    list = list.filter(
      p => p.name.toLowerCase().includes(s) ||
        p.code.includes(s) ||
        p.category.toLowerCase().includes(s)
    );
  }
  return list;
});

function addToCart(product: Product) {
  const idx = cart.value.findIndex(i => i.code === product.code);
  if (idx === -1) {
    cart.value.push({ ...product, qty: 1, discount: product.discount ?? 0 });
  } else {
    cart.value[idx].qty += 1;
  }
}

const total = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
);
const totalDiscount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.discount, 0)
);
const totalPayable = computed(() => total.value - totalDiscount.value);
</script>

<style scoped>
.pos-fullscreen {
  width: 100vw;
  min-height: 100vh;
  background: #f7f8fa;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: auto;
  overflow-y: auto;
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.pos-header {
  border-radius: 0 0 12px 12px;
  min-height: 64px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(123, 63, 242, 0.04);
}

.pos-header-select, .pos-header-input, .pos-header-barcode {
  min-width: 160px;
  max-width: 210px;
  height: 40px;
  font-size: 1rem;
}
.pos-header-input {
  min-width: 250px;
  flex: 1;
}
.pos-header-barcode {
  max-width: 160px;
}
.pos-header-barcode-btn {
  min-width: 120px;
  height: 40px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.pos-cart-section {
  min-width: 420px;
  max-width: 900px;
  background: #f7f8fa;
}
.pos-cart-action-btn {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pos-cart-table-wrapper {
  overflow-x: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(123, 63, 242, 0.03);
  margin-bottom: 1rem;
}
.pos-cart-table {
  margin-bottom: 0;
  border-radius: 8px;
  overflow: hidden;
}
.pos-bottom-summary {
  width: 100%;
  background: #f7f8fa;
  border-radius: 12px 12px 0 0;
  padding-bottom: 2rem;
  padding-top: 1.2rem;
  margin-top: auto;
  box-shadow: 0 -2px 10px 0 rgba(123, 63, 242, 0.02);
}
.pos-total-payable {
  background: #fff !important;
  color: #7B3FF2;
  border: 2px solid #7B3FF2;
  font-size: 1.35rem;
}
.pos-action-btns .btn {
  min-width: 120px;
  font-size: 1.1rem;
}
.pos-products-section {
  min-width: 500px;
  max-width: 900px;
}
.pos-categories {
  width: 170px;
  min-width: 150px;
}
.pos-category-btn {
  border-radius: 18px !important;
  font-weight: 500;
  font-size: 1rem;
  margin-bottom: 0.5rem !important;
  border: none !important;
}
.btn-violet {
  background: #7B3FF2 !important;
  color: #fff !important;
  border: none !important;
  transition: background 0.2s;
}
.btn-violet:hover, .btn-violet:focus {
  background: #6332c5 !important;
  color: #fff !important;
}
.product-card {
  cursor: pointer;
  transition: box-shadow 0.2s, border 0.2s;
  border: 2px solid #fff;
  border-radius: 18px;
  min-height: 145px;
  box-shadow: 0 2px 8px rgba(123, 63, 242, 0.06);
}
.product-card:hover {
  border: 2px solid #7B3FF2;
  box-shadow: 0 0 0.5rem #7B3FF2;
  background: #f3eafc;
}
.table th, .table td {
  vertical-align: middle;
  font-size: 1rem;
}
body, html, #app {
  width: 100vw;
  min-height: 100vh;
  overflow-x: hidden;
}
@media (max-width: 1200px) {
  .pos-fullscreen,
  body, html, #app {
    width: 100vw;
    min-width: 100vw;
    overflow-x: auto;
  }
  .pos-cart-section, .pos-products-section {
    min-width: 300px;
    max-width: 100vw;
  }
}
@media (max-width: 900px) {
  .pos-header {
    flex-direction: column;
    gap: 0.5rem !important;
    padding-bottom: 1rem;
  }
  .pos-cart-section, .pos-products-section {
    min-width: unset;
    max-width: unset;
  }
}
</style>