<template>
  <div class="container-fluid py-3">
    <!-- Header and Actions -->
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="mb-1">Expired Products</h5>
        <small class="text-muted">Manage your expired products</small>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <button class="btn btn-primary btn-sm">
            <img src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/pdf.svg" alt="">
        </button>
        <button class="btn btn-success btn-sm">
            <img src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/excel.svg" alt="">
        </button>
        <button class="btn btn-outline-secondary me-2" title="Refresh">
          <i class="bi bi-arrow-repeat"></i>
        </button>
      </div>
    </div>

    <!-- Table Card -->
    <div class="card position-relative">
      <div class="card-body">
        <!-- Search & Filters -->
        <div class="d-flex flex-wrap gap-2 align-items-center mb-3">
          <div style="max-width: 260px; flex: 1 1 260px;">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control" placeholder="Search" v-model="search" />
            </div>
          </div>
          <div class="ms-auto d-flex gap-2">
            <div>
              <button class="btn btn-light border dropdown-toggle" data-bs-toggle="dropdown" type="button">
                Product
              </button>
            </div>
            <div>
              <button class="btn btn-light border-light border dropdown-toggle" data-bs-toggle="dropdown" type="button">
                Short By : 
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
              <tr>
                <th style="width:32px;"><input type="checkbox" /></th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Qty</th>
                <th>Created By</th>
                <th style="width:120px;"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in pagedProducts" :key="item.sku">
                <td><input type="checkbox" /></td>
                <td>{{ item.sku }}</td>
                <td class="d-flex align-items-center gap-2">
                  <img :src="item.img" class="product-thumb" alt="img" />
                  <span>{{ item.name }}</span>
                </td>
                <td class="text-muted">{{ item.category }}</td>
                <td class="text-muted">{{ item.brand }}</td>
                <td><span class="fw-bold">${{ item.price }}</span></td>
                <td>{{ item.unit }}</td>
                <td>{{ item.qty }}</td>
                <td class="d-flex align-items-center gap-2">
                  <img :src="item.userImg" class="user-thumb" alt="user" />
                  <span>{{ item.userName }}</span>
                </td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-light btn-sm" title="View"><i class="bi bi-eye"></i></button>
                    <button class="btn btn-light btn-sm" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-light btn-sm" title="Delete"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Table footer: Pagination, Row per page -->
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const showModal = ref(false)
const fileInputRef = ref(null)
const fileName = ref('')
const createdBy = ref('')
const desc = ref('')

const products = [
  {
    sku: "PT001",
    img: "https://img.icons8.com/color/48/000000/laptop--v1.png",
    name: "Lenovo IdeaPad 3",
    category: "Computers",
    brand: "Lenovo",
    price: 600,
    unit: "Pc",
    qty: 100,
    userImg: "https://randomuser.me/api/portraits/men/31.jpg",
    userName: "James Kirwin"
  },
  {
    sku: "PT002",
    img: "https://img.icons8.com/color/48/000000/headphones--v1.png",
    name: "Beats Pro",
    category: "Electronics",
    brand: "Beats",
    price: 160,
    unit: "Pc",
    qty: 140,
    userImg: "https://randomuser.me/api/portraits/men/32.jpg",
    userName: "Francis Chang"
  },
  {
    sku: "PT003",
    img: "https://img.icons8.com/color/48/000000/sneakers--v1.png",
    name: "Nike Jordan",
    category: "Shoe",
    brand: "Nike",
    price: 110,
    unit: "Pc",
    qty: 300,
    userImg: "https://randomuser.me/api/portraits/men/33.jpg",
    userName: "Antonio Engle"
  },
  {
    sku: "PT004",
    img: "https://img.icons8.com/color/48/000000/apple-watch.png",
    name: "Apple Series 5 Watch",
    category: "Electronics",
    brand: "Apple",
    price: 120,
    unit: "Pc",
    qty: 450,
    userImg: "https://randomuser.me/api/portraits/men/34.jpg",
    userName: "Leo Kelly"
  },
  {
    sku: "PT005",
    img: "https://img.icons8.com/color/48/000000/amazon-echo.png",
    name: "Amazon Echo Dot",
    category: "Electronics",
    brand: "Amazon",
    price: 80,
    unit: "Pc",
    qty: 320,
    userImg: "https://randomuser.me/api/portraits/women/35.jpg",
    userName: "Annette Walker"
  },
  {
    sku: "PT006",
    img: "https://img.icons8.com/color/48/000000/sofa.png",
    name: "Sanford Chair Sofa",
    category: "Furnitures",
    brand: "Modern Wave",
    price: 320,
    unit: "Pc",
    qty: 650,
    userImg: "https://randomuser.me/api/portraits/men/36.jpg",
    userName: "John Weaver"
  },
  {
    sku: "PT007",
    img: "https://img.icons8.com/color/48/000000/handbag.png",
    name: "Red Premium Satchel",
    category: "Bags",
    brand: "Dior",
    price: 60,
    unit: "Pc",
    qty: 700,
    userImg: "https://randomuser.me/api/portraits/men/37.jpg",
    userName: "Gary Hennessy"
  },
  {
    sku: "PT008",
    img: "https://img.icons8.com/color/48/000000/iphone-14-pro.png",
    name: "Iphone 14 Pro",
    category: "Phone",
    brand: "Apple",
    price: 540,
    unit: "Pc",
    qty: 630,
    userImg: "https://randomuser.me/api/portraits/women/38.jpg",
    userName: "Eleanor Panek"
  },
  {
    sku: "PT009",
    img: "https://img.icons8.com/color/48/000000/gaming-chair.png",
    name: "Gaming Chair",
    category: "Furniture",
    brand: "Arlime",
    price: 200,
    unit: "Pc",
    qty: 410,
    userImg: "https://randomuser.me/api/portraits/men/39.jpg",
    userName: "William Levy"
  },
  {
    sku: "PT010",
    img: "https://img.icons8.com/color/48/000000/backpack.png",
    name: "Borealis Backpack",
    category: "Bags",
    brand: "The North Face",
    price: 45,
    unit: "Pc",
    qty: 550,
    userImg: "https://randomuser.me/api/portraits/women/40.jpg",
    userName: "Charlotte Klotz"
  }
]

const filtered = computed(() =>
  products.filter(p =>
    !search.value ||
    p.sku.toLowerCase().includes(search.value.toLowerCase()) ||
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.category.toLowerCase().includes(search.value.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.value.toLowerCase())
  )
)

const totalPages = computed(() => Math.ceil(filtered.value.length / rowPerPage.value) || 1)

const pagedProducts = computed(() => {
  const start = (currentPage.value - 1) * rowPerPage.value
  return filtered.value.slice(start, start + rowPerPage.value)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function selectPage(p) {
  currentPage.value = p
}

function onFileChange(e) {
  const file = e.target.files[0]
  if (file) fileName.value = file.name
}
function onFileDrop(e) {
  const file = e.dataTransfer.files[0]
  if (file) fileName.value = file.name
}
function onSubmit() {
  // handle form submit
  showModal.value = false
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(123,63,242,0.06);
  border: none;
}
.card-header {
  background: #fafbfc;
  border-bottom: 1px solid #eee;
}
.fab-settings {
  width: 52px;
  height: 52px;
  right: -26px;
  top: 36%;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  padding: 0;
}
.product-thumb {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid #f0f0f0;
  background: #fff;
}
.user-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
  background: #fff;
  box-shadow: 0 0 0.4rem #ececec;
}
.table th, .table td {
  vertical-align: middle;
  font-size: 1rem;
}
.btn-primary-dark {
  background: #002b4e;
  color: #fff;
  border: none;
}
.btn-primary-dark:hover,
.btn-primary-dark:focus {
  background: #001f36;
  color: #fff;
}

/* CLEAN PAGINATION STYLES */
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

/* Modal Animates from top to bottom */
.animate-modal-down {
  animation: modalDown 0.35s cubic-bezier(.55,0,.1,1);
}
@keyframes modalDown {
  from {
    transform: translateY(-80px) scale(0.98);
    opacity: 0.3;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
.modal-content {
  border-radius: 12px;
  border: none;
  padding: 0 5px;
}
.modal-header {
  padding-bottom: 0.5rem;
  border-bottom: 0;
}
.btn-close {
  background: none;
  border: none;
  font-size: 1rem;
  color: #ff3d00;
}
.upload-box {
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  min-height: 120px;
  background: #fff7ee;
  transition: border-color 0.2s;
  text-align: center;
  padding: 18px 8px 10px 8px;
  position: relative;
}
.upload-box:hover {
  border-color: #ffa726;
  background: #fff3e0;
}
.btn-warning {
  background: #ffa726 !important;
  border: none !important;
}
.btn-warning.text-white:hover,
.btn-warning.text-white:focus {
  background: #ff9800 !important;
  color: #fff !important;
}
.btn-primary-dark {
  background: #002b4e;
  color: #fff;
  border: none;
}
.btn-primary-dark:hover,
.btn-primary-dark:focus {
  background: #001f36;
  color: #fff;
}
@media (max-width: 700px) {
  .modal-dialog {
    max-width: 99vw !important;
  }
}
</style>