<template>
  <div class="container-fluid py-3">
    <div class="d-flex flex-wrap align-items-center mb-3 gap-3">
      <div class="flex-grow-1" style="max-width:260px;">
        <div class="input-group">
          <span class="input-group-text"><i class="bi bi-search"></i></span>
          <input type="text" class="form-control" placeholder="Search" v-model="search" />
        </div>
      </div>
      <div class="d-flex gap-2 ms-auto">
        <button class="btn btn-light border dropdown-toggle" type="button">Warehouse</button>
        <button class="btn btn-light border dropdown-toggle" type="button">Store</button>
        <button class="btn btn-light border dropdown-toggle" type="button">Category</button>
        <button v-if="showSort" class="btn btn-light border dropdown-toggle" type="button">Sort By : Last 7 Days</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table align-middle mb-0 low-stock-table">
        <thead>
          <tr>
            <th style="width:32px;"><input type="checkbox" /></th>
            <th>Warehouse</th>
            <th>Store</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>SKU</th>
            <th>Qty</th>
            <th>Qty Alert</th>
            <th v-if="showAction">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pagedStocks" :key="item.sku">
            <td><input type="checkbox" /></td>
            <td>{{ item.warehouse }}</td>
            <td>{{ item.store }}</td>
            <td class="d-flex align-items-center gap-2">
              <img :src="item.img" class="product-thumb" alt="img" />
              <span>{{ item.product }}</span>
            </td>
            <td class="text-muted">{{ item.category }}</td>
            <td>{{ item.sku }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.alert.toString().padStart(2, '0') }}</td>
            <td v-if="showAction">
              <div class="d-flex gap-1">
                <button class="btn btn-light btn-sm" title="Edit"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-light btn-sm" title="Delete"><i class="bi bi-trash"></i></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="d-flex align-items-center justify-content-between mt-2 flex-wrap">
      <div class="d-flex align-items-center gap-2">
        <span>Row Per Page</span>
        <select class="form-select form-select-sm" style="width: 70px;" v-model="rowPerPage">
          <option v-for="n in [10, 20, 50]" :value="n" :key="n">{{ n }}</option>
        </select>
        <span>Entries</span>
      </div>
      <nav>
        <ul class="pagination mb-0">
          <li class="page-item" :class="{disabled: currentPage===1}">
            <button class="page-link" @click="prevPage"><i class="bi bi-chevron-left"></i></button>
          </li>
          <li class="page-item" v-for="p in totalPages" :key="p" :class="{active: currentPage===p}">
            <button class="page-link" @click="selectPage(p)">{{ p }}</button>
          </li>
          <li class="page-item" :class="{disabled: currentPage===totalPages}">
            <button class="page-link" @click="nextPage"><i class="bi bi-chevron-right"></i></button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface StockItem {
  warehouse: string
  store: string
  product: string
  img: string
  category: string
  sku: string
  qty: number
  alert: number
}

// Set true for the table in image 6, false for image 5
const showAction = ref(true)  // set to false for image 5
const showSort = ref(true)    // set to false for image 5

const search = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)

const stocks = ref<StockItem[]>([
  {
    warehouse: "Lavish Warehouse",
    store: "Electro Mart",
    product: "Lenovo IdeaPad 3",
    img: "https://img.icons8.com/color/48/000000/laptop--v1.png",
    category: "Computers",
    sku: "PT001",
    qty: 20,
    alert: 15
  },
  {
    warehouse: "Quaint Warehouse",
    store: "Quantum Gadgets",
    product: "Beats Pro",
    img: "https://img.icons8.com/color/48/000000/headphones--v1.png",
    category: "Electronics",
    sku: "PT002",
    qty: 25,
    alert: 20
  },
  {
    warehouse: "Traditional Warehouse",
    store: "Prime Bazaar",
    product: "Nike Jordan",
    img: "https://img.icons8.com/color/48/000000/sneakers--v1.png",
    category: "Shoe",
    sku: "PT003",
    qty: 40,
    alert: 35
  },
  {
    warehouse: "Cool Warehouse",
    store: "Gadget World",
    product: "Apple Series 5 Watch",
    img: "https://img.icons8.com/color/48/000000/apple-watch.png",
    category: "Electronics",
    sku: "PT004",
    qty: 50,
    alert: 45
  },
  {
    warehouse: "Overflow Warehouse",
    store: "Volt Vault",
    product: "Amazon Echo Dot",
    img: "https://img.icons8.com/color/48/000000/amazon-echo.png",
    category: "Electronics",
    sku: "PT005",
    qty: 30,
    alert: 25
  },
  {
    warehouse: "Nova Storage Hub",
    store: "Elite Retail",
    product: "Sanford Chair Sofa",
    img: "https://img.icons8.com/color/48/000000/sofa.png",
    category: "Furniture",
    sku: "PT006",
    qty: 10,
    alert: 8
  },
  {
    warehouse: "Retail Supply Hub",
    store: "Prime Mart",
    product: "Red Premium Satchel",
    img: "https://img.icons8.com/color/48/000000/handbag.png",
    category: "Bags",
    sku: "PT007",
    qty: 70,
    alert: 60
  },
  {
    warehouse: "EdgeWare Solutions",
    store: "NeoTech Store",
    product: "Iphone 14 Pro",
    img: "https://img.icons8.com/color/48/000000/iphone-14-pro.png",
    category: "Phone",
    sku: "PT008",
    qty: 35,
    alert: 30
  },
  {
    warehouse: "North Zone Warehouse",
    store: "Urban Mart",
    product: "Gaming Chair",
    img: "https://img.icons8.com/color/48/000000/gaming-chair.png",
    category: "Furniture",
    sku: "PT009",
    qty: 15,
    alert: 10
  },
  {
    warehouse: "Fulfillment Hub",
    store: "Travel Mart",
    product: "Borealis Backpack",
    img: "https://img.icons8.com/color/48/000000/backpack.png",
    category: "Bags",
    sku: "PT010",
    qty: 45,
    alert: 40
  }
])

const filteredStocks = computed(() =>
  stocks.value.filter(item =>
    !search.value ||
    item.warehouse.toLowerCase().includes(search.value.toLowerCase()) ||
    item.store.toLowerCase().includes(search.value.toLowerCase()) ||
    item.product.toLowerCase().includes(search.value.toLowerCase()) ||
    item.category.toLowerCase().includes(search.value.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.value.toLowerCase())
  )
)

const totalPages = computed(() => Math.ceil(filteredStocks.value.length / rowPerPage.value) || 1)

const pagedStocks = computed(() => {
  const start = (currentPage.value - 1) * rowPerPage.value
  return filteredStocks.value.slice(start, start + rowPerPage.value)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function selectPage(p: number) {
  currentPage.value = p
}
</script>

<style scoped>
.table.low-stock-table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0;
}
.table.low-stock-table th {
  background: #f8f9fc;
  color: #2d3875;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding: 0.9rem 0.5rem;
  font-size: 1.07rem;
  letter-spacing: .01rem;
}
.table.low-stock-table td {
  border-top: none;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  vertical-align: middle;
  font-size: 1rem;
  padding: 0.78rem 0.5rem;
}
.table.low-stock-table tbody tr:last-child td {
  border-bottom: none;
}
.table.low-stock-table tbody tr:hover {
  background: #f3eafc;
  transition: background .15s;
}
.table-responsive {
  border-radius: 12px;
  overflow-x: auto;
  background: transparent;
}
.product-thumb {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid #f0f0f0;
  background: #fff;
}
.pagination {
  --bs-pagination-padding-x: 0.75rem;
  --bs-pagination-padding-y: 0.35rem;
  --bs-pagination-font-size: 1rem;
  --bs-pagination-color: #6A5ACD;
  --bs-pagination-bg: #fff;
  --bs-pagination-border-width: 0;
  --bs-pagination-border-radius: 50%;
  --bs-pagination-hover-color: #fff;
  --bs-pagination-hover-bg: #7B3FF2;
  --bs-pagination-hover-border-color: #fff;
  --bs-pagination-focus-color: #fff;
  --bs-pagination-focus-bg: #ffc107;
  --bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgba(255,193,7,.25);
  --bs-pagination-active-color: #fff;
  --bs-pagination-active-bg: #ffc107;
  --bs-pagination-active-border-color: #ffc107;
  --bs-pagination-disabled-color: #adb5bd;
  --bs-pagination-disabled-bg: #fff;
  --bs-pagination-disabled-border-color: #fff;
  display: flex;
  gap: 0.25rem;
}

.pagination .page-item {
  margin: 0 2px;
}

.pagination .page-link {
  padding: 0.5rem 0.9rem;
  border-radius: 50% !important;
  border: none !important;
  color: #7B3FF2;
  background: #fff;
  box-shadow: 0 1px 2px 0 #ececec;
  transition: background 0.15s, color 0.15s;
  font-weight: 500;
  outline: none;
  min-width: 2.2em;
  text-align: center;
}
.pagination .page-link:focus {
  z-index: 2;
  background: #ffe082;
  color: #7B3FF2;
}
.pagination .page-item.active .page-link {
  background: #ffc107 !important;
  color: #fff !important;
  font-weight: 700;
  box-shadow: 0 2px 8px 0 #fddb6f26;
  border: none;
}
.pagination .page-link:hover, .pagination .page-link:active {
  background: #7B3FF2;
  color: #fff !important;
}
.pagination .page-item.disabled .page-link {
  background: #f7f8fa;
  color: #adb5bd;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .pagination .page-link {
    padding: 0.4rem 0.7rem;
    min-width: 2em;
    font-size: 0.95rem;
  }
}
</style>