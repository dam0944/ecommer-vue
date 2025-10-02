<template>
  <div class="container-fluid py-3">
    <div class="d-flex justify-content-between align-items-start mb-3">
      <div>
        <h5 class="mb-1">Sub Category</h5>
        <small class="text-muted">Manage your sub categories</small>
      </div>
      <div class="d-flex gap-2 align-items-center">
        <button class="btn btn-danger btn-sm"><i class="bi bi-x-circle"></i></button>
        <button class="btn btn-success btn-sm"><i class="bi bi-check-circle"></i></button>
        <button class="btn btn-light btn-sm"><i class="bi bi-arrow-up"></i></button>
        <button class="btn btn-light btn-sm"><i class="bi bi-arrow-down"></i></button>
        <button class="btn btn-warning text-white fw-bold ms-2" @click="showModal = true">
          <i class="bi bi-plus-circle me-2"></i>Add Sub Category
        </button>
      </div>
    </div>

    <div class="card position-relative">
      <div class="card-body">
        <div class="d-flex flex-wrap align-items-center mb-3 gap-3">
          <div class="flex-grow-1" style="max-width:260px;">
            <div class="input-group">
              <span class="input-group-text"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control" placeholder="Search" v-model="search" />
            </div>
          </div>
          <div class="ms-auto d-flex gap-2">
            <button class="btn btn-light border dropdown-toggle" type="button">Category</button>
            <button class="btn btn-light border dropdown-toggle" type="button">Status</button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table align-middle mb-0 sub-category-table">
            <thead>
              <tr>
                <th style="width:32px;"><input type="checkbox" /></th>
                <th>Image</th>
                <th>Sub Category</th>
                <th>Category</th>
                <th>Category Code</th>
                <th>Description</th>
                <th>Status</th>
                <th style="width:100px;"> </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sub in pagedSubCategories" :key="sub.code">
                <td><input type="checkbox" /></td>
                <td>
                  <img :src="sub.img" class="subcat-thumb" alt="img" />
                </td>
                <td>{{ sub.name }}</td>
                <td>{{ sub.category }}</td>
                <td>{{ sub.code }}</td>
                <td class="text-muted">{{ sub.desc }}</td>
                <td>
                  <span class="badge bg-success bg-opacity-75 px-3 py-2" style="font-size:0.92em;">Active</span>
                </td>
                <td>
                  <div class="d-flex gap-1">
                    <button class="btn btn-light btn-sm" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-light btn-sm" title="Delete"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer: Pagination, Row per page -->
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

    <!-- Modal Add Sub Category -->
    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal d-block" tabindex="-1" style="background:rgba(0,0,0,0.08);">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 440px;">
        <div class="modal-content animate-modal-down">
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold">Add Sub Category</h5>
            <button type="button" class="btn-close text-danger" @click="showModal = false">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="modal-body pt-0">
            <form @submit.prevent="onSubmit">
              <div class="mb-3">
                <label class="form-label">Sub Category Name <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="newSubCategory.name" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Category <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="newSubCategory.category" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Category Code <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="newSubCategory.code" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Description</label>
                <input type="text" class="form-control" v-model="newSubCategory.desc" />
              </div>
              <div class="mb-3">
                <label class="form-label">Image URL</label>
                <input type="text" class="form-control" v-model="newSubCategory.img" />
              </div>
              <div class="mb-3">
                <label class="form-label">Status</label>
                <select class="form-select" v-model="newSubCategory.status">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="d-flex justify-content-end gap-2 mt-3 border-top pt-3">
                <button type="button" class="btn btn-secondary" @click="showModal = false">Cancel</button>
                <button type="submit" class="btn btn-warning text-white fw-bold">Add to Sub Category</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface SubCategory {
  img: string
  name: string
  category: string
  code: string
  desc: string
  status: string
}

const showModal = ref(false)
const search = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)

const subCategories = ref<SubCategory[]>([
  { img: "https://img.icons8.com/color/48/000000/laptop--v1.png", name: "Laptop", category: "Computers", code: "CT001", desc: "Efficient Productivity", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/computer.png", name: "Desktop", category: "Computers", code: "CT002", desc: "Compact Design", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/sneakers--v1.png", name: "Sneakers", category: "Shoe", code: "CT003", desc: "Dynamic Grip", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/derby-shoe.png", name: "Formals", category: "Shoe", code: "CT004", desc: "Stylish Comfort", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/headphones--v1.png", name: "Wearables", category: "Electronics", code: "CT005", desc: "Seamless Connectivity", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/amazon-echo.png", name: "Speakers", category: "Electronics", code: "CT006", desc: "Reliable Sound", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/handbag.png", name: "Handbags", category: "Bags", code: "CT007", desc: "Compact Carry", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/backpack.png", name: "Travel", category: "Bags", code: "CT008", desc: "Travel Ready", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/sofa.png", name: "Sofa", category: "Furniture", code: "CT009", desc: "Cozy Comfort", status: "active" },
  { img: "https://img.icons8.com/color/48/000000/gaming-chair.png", name: "Chair", category: "Furniture", code: "CT010", desc: "Stylish Comfort", status: "active" }
])

const newSubCategory = ref<SubCategory>({
  img: "",
  name: "",
  category: "",
  code: "",
  desc: "",
  status: "active"
})

const filteredSubCategories = computed(() =>
  subCategories.value.filter(sub =>
    !search.value ||
    sub.name.toLowerCase().includes(search.value.toLowerCase()) ||
    sub.category.toLowerCase().includes(search.value.toLowerCase()) ||
    sub.desc.toLowerCase().includes(search.value.toLowerCase()) ||
    sub.code.toLowerCase().includes(search.value.toLowerCase())
  )
)

const totalPages = computed(() => Math.ceil(filteredSubCategories.value.length / rowPerPage.value) || 1)
const pagedSubCategories = computed(() => {
  const start = (currentPage.value - 1) * rowPerPage.value
  return filteredSubCategories.value.slice(start, start + rowPerPage.value)
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

function onSubmit() {
  if (!newSubCategory.value.name || !newSubCategory.value.category || !newSubCategory.value.code) return
  subCategories.value.unshift({ ...newSubCategory.value })
  showModal.value = false
  newSubCategory.value.img = ""
  newSubCategory.value.name = ""
  newSubCategory.value.category = ""
  newSubCategory.value.code = ""
  newSubCategory.value.desc = ""
  newSubCategory.value.status = "active"
}
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(123,63,242,0.06);
  border: none;
}
.sub-category-table {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0;
}
.sub-category-table th {
  background: #f8f9fc;
  color: #2d3875;
  font-weight: 600;
  border-bottom: 2px solid #f0f0f0;
  padding: 0.9rem 0.5rem;
  font-size: 1.07rem;
  letter-spacing: .01rem;
}
.sub-category-table td {
  border-top: none;
  border-bottom: 1px solid #f2f2f2;
  background: #fff;
  vertical-align: middle;
  font-size: 1rem;
  padding: 0.78rem 0.5rem;
}
.sub-category-table tbody tr:last-child td {
  border-bottom: none;
}
.sub-category-table tbody tr:hover {
  background: #f3eafc;
  transition: background .15s;
}
.table-responsive {
  border-radius: 12px;
  overflow-x: auto;
  background: transparent;
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
  position: absolute;
}
.subcat-thumb {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid #f0f0f0;
  background: #fff;
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
@media (max-width: 700px) {
  .modal-dialog {
    max-width: 99vw !important;
  }
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