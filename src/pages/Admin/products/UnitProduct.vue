<template>
  <div class="units-page bg-light min-vh-100">
    <div class="container-fluid px-4 pb-4">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center pt-4 mb-2">
        <div>
          <h3 class="fw-bold mb-0">Units</h3>
          <div class="text-muted small">Manage your units</div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-link btn-sm p-2 bg-white shadow-none border rounded" title="Export PDF"><i class="bi bi-file-earmark-pdf-fill text-danger"></i></button>
          <button class="btn btn-link btn-sm p-2 bg-white shadow-none border rounded" title="Export XLS"><i class="bi bi-file-earmark-excel-fill text-success"></i></button>
          <button class="btn btn-link btn-sm p-2 bg-white shadow-none border rounded" title="Up"><i class="bi bi-chevron-up"></i></button>
          <button class="btn btn-link btn-sm p-2 bg-white shadow-none border rounded" title="Down"><i class="bi bi-chevron-down"></i></button>
          <!-- Add Unit Dropdown -->
          <div class="dropdown position-relative">
            <button class="btn btn-warning d-flex align-items-center gap-2 px-3" style="border-radius: 0.7rem;" @click="toggleDropdown" ref="addUnitBtn">
              <i class="bi bi-plus-circle"></i> Add Unit
            </button>
            <div class="dropdown-menu dropdown-menu-end p-3 shadow" :class="{ show: showDropdown }" :style="dropdownPosition">
              <form @submit.prevent="addUnit">
                <div class="mb-2">
                  <label class="form-label small mb-1">Unit Name</label>
                  <input v-model="newUnit.unit" class="form-control form-control-sm" required />
                </div>
                <div class="mb-2">
                  <label class="form-label small mb-1">Short Name</label>
                  <input v-model="newUnit.short" class="form-control form-control-sm" required />
                </div>
                <div class="mb-2">
                  <label class="form-label small mb-1">No of Products</label>
                  <input v-model.number="newUnit.products" type="number" class="form-control form-control-sm" required min="1" />
                </div>
                <div class="mb-2">
                  <label class="form-label small mb-1">Created Date</label>
                  <input v-model="newUnit.date" type="date" class="form-control form-control-sm" required />
                </div>
                <div class="mb-3">
                  <label class="form-label small mb-1">Status</label>
                  <select v-model="newUnit.status" class="form-select form-select-sm">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <button class="btn btn-primary btn-sm w-100" type="submit">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <!-- Card Section -->
      <div class="bg-white p-3 rounded-4 shadow-sm mb-4 position-relative overflow-visible">
        <div class="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <!-- Search -->
          <div style="max-width: 270px;">
            <div class="input-group">
              <span class="input-group-text border-end-0 bg-light"><i class="bi bi-search"></i></span>
              <input type="text" class="form-control border-start-0" v-model="search" placeholder="Search" />
            </div>
          </div>
          <!-- Table Filter Dropdown (right) -->
          <div>
            <div class="dropdown">
              <button class="btn btn-light border dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Status
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Active</a></li>
                <li><a class="dropdown-item" href="#">Inactive</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div class="table-responsive">
          <table class="table align-middle mb-0 table-borderless units-table">
            <thead class="table-light">
              <tr>
                <th scope="col" style="width:32px;">
                  <input type="checkbox" />
                </th>
                <th>Unit</th>
                <th>Short name</th>
                <th>No of Products</th>
                <th>Created Date</th>
                <th>Status</th>
                <th class="text-end" style="width:100px;"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="unit in pagedUnits" :key="unit.id">
                <td><input type="checkbox" /></td>
                <td>{{ unit.unit }}</td>
                <td>{{ unit.short }}</td>
                <td>{{ unit.products }}</td>
                <td>{{ formatDate(unit.date) }}</td>
                <td>
                  <span
                    class="badge rounded-pill px-3 py-2"
                    :class="unit.status === 'Active' ? 'bg-success-light text-success' : 'bg-secondary-light text-secondary'"
                    style="font-size:0.9em;"
                  >
                    <i class="bi bi-dot"></i> {{ unit.status }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="d-flex gap-2 justify-content-end">
                    <button class="btn btn-light border btn-sm" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-light border btn-sm" title="Delete"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Table footer: row/entries and pagination -->
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3">
          <div class="small text-muted d-flex align-items-center gap-2">
            Row Per Page
            <select class="form-select form-select-sm" v-model.number="rowsPerPage" style="width:60px;">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            Entries
          </div>
          <nav>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item" :class="{disabled: currentPage===1}">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage-1)">&lt;</a>
              </li>
              <li class="page-item active">
                <span class="page-link">{{ currentPage }}</span>
              </li>
              <li class="page-item" :class="{disabled: currentPage===pageCount}">
                <a class="page-link" href="#" @click.prevent="changePage(currentPage+1)">&gt;</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue"

interface UnitRow {
  id: number
  unit: string
  short: string
  products: number
  date: string // yyyy-mm-dd
  status: string
}

const units = ref<UnitRow[]>([
  { id: 1, unit: "Kilograms", short: "kg", products: 25, date: "2024-12-24", status: "Active" },
  { id: 2, unit: "Liters", short: "L", products: 18, date: "2024-12-10", status: "Active" },
  { id: 3, unit: "Dozen", short: "dz", products: 30, date: "2024-11-27", status: "Active" },
  { id: 4, unit: "Pieces", short: "pcs", products: 42, date: "2024-11-18", status: "Active" },
  { id: 5, unit: "Boxes", short: "bx", products: 60, date: "2024-11-06", status: "Active" },
  { id: 6, unit: "Tons", short: "t", products: 10, date: "2024-10-25", status: "Active" },
  { id: 7, unit: "Grams", short: "g", products: 70, date: "2024-10-03", status: "Active" },
  { id: 8, unit: "Meters", short: "m", products: 80, date: "2024-09-20", status: "Active" },
  { id: 9, unit: "Centimeters", short: "cm", products: 120, date: "2024-09-10", status: "Active" },
])

const search = ref("")
const rowsPerPage = ref(10)
const currentPage = ref(1)

// Dropdown Add Unit
const showDropdown = ref(false)
const addUnitBtn = ref<HTMLElement | null>(null)
const dropdownPosition = ref<Record<string, string>>({})

const newUnit = ref({
  unit: "",
  short: "",
  products: 1,
  date: "",
  status: "Active"
})

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
  setDropdownPosition()
}
function setDropdownPosition() {
  if (addUnitBtn.value) {
    const rect = addUnitBtn.value.getBoundingClientRect()
    dropdownPosition.value = {
      position: "absolute",
      top: `${rect.bottom + window.scrollY + 6}px`,
      left: `${rect.left + window.scrollX}px`,
      minWidth: "260px",
      zIndex: "1051"
    }
  }
}
function clickOutsideHandler(e: MouseEvent) {
  if (!showDropdown.value) return
  const dropdown = document.querySelector('.dropdown-menu.show')
  if (
    dropdown &&
    !dropdown.contains(e.target as Node) &&
    !(addUnitBtn.value && addUnitBtn.value.contains(e.target as Node))
  ) {
    showDropdown.value = false
  }
}
function addUnit() {
  // Format date as "dd MMM yyyy"
  const dt = new Date(newUnit.value.date)
  const dateStr = dt.toLocaleDateString("en-GB", {
    day: '2-digit', month: 'short', year: 'numeric'
  }).replace(/ /g, ' ')
  units.value.push({
    id: Date.now(),
    unit: newUnit.value.unit,
    short: newUnit.value.short,
    products: newUnit.value.products,
    date: dateStr,
    status: newUnit.value.status
  })
  showDropdown.value = false
  // Reset form
  newUnit.value = {
    unit: "",
    short: "",
    products: 1,
    date: "",
    status: "Active"
  }
}

const filteredUnits = computed(() => {
  if (!search.value) return units.value
  const s = search.value.toLowerCase()
  return units.value.filter(
    u =>
      u.unit.toLowerCase().includes(s) ||
      u.short.toLowerCase().includes(s)
  )
})

const pageCount = computed(() =>
  Math.ceil(filteredUnits.value.length / rowsPerPage.value)
)

const pagedUnits = computed(() =>
  filteredUnits.value.slice(
    (currentPage.value - 1) * rowsPerPage.value,
    currentPage.value * rowsPerPage.value
  )
)

function changePage(page: number) {
  if (page >= 1 && page <= pageCount.value) currentPage.value = page
}

function formatDate(dateStr: string) {
  // Accepts "yyyy-mm-dd" or already formatted (skip if format is not yyyy-mm-dd)
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const dt = new Date(dateStr)
    return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')
  }
  return dateStr
}

onMounted(() => {
  window.addEventListener("mousedown", clickOutsideHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener("mousedown", clickOutsideHandler)
})
</script>
