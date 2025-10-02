<template>
  <div class="warranties-page bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 pb-4 lg:p-6">
      <!-- Header -->
      <div class="flex justify-between items-center pt-4 mb-2 flex-wrap gap-2">
        <div>
          <h3 class="font-bold mb-0">Warranties</h3>
          <div class="text-gray-500 text-sm">Manage your warranties</div>
        </div>
        <div class="flex items-center gap-2 flex-wrap">
          <button class="btn btn-ghost btn-sm p-2 bg-white shadow-sm border rounded" title="Export PDF">
            <i class="bi bi-file-earmark-pdf-fill text-error"></i>
          </button>
          <button class="btn btn-ghost btn-sm p-2 bg-white shadow-sm border rounded" title="Export XLS">
            <i class="bi bi-file-earmark-excel-fill text-success"></i>
          </button>
          <button class="btn btn-ghost btn-sm p-2 bg-white shadow-sm border rounded" title="Up">
            <i class="bi bi-chevron-up"></i>
          </button>
          <button class="btn btn-ghost btn-sm p-2 bg-white shadow-sm border rounded" title="Down">
            <i class="bi bi-chevron-down"></i>
          </button>
          <!-- Add Warranty Button (modal) -->
          <button class="btn btn-warning flex items-center gap-2 px-3 rounded-xl text-white font-bold" @click="showModal = true">
            <i class="bi bi-plus-circle"></i> Add Warranty
          </button>
        </div>
      </div>
      <!-- Card Section -->
      <div class="bg-white p-3 rounded-2xl shadow-md mb-4 relative overflow-visible">
        <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
          <!-- Search -->
          <div class="w-full md:w-auto max-w-xs">
            <label class="input input-bordered flex items-center gap-2">
              <i class="bi bi-search"></i>
              <input type="text" class="grow" v-model="search" placeholder="Search" />
            </label>
          </div>
          <!-- Table Filter Dropdown (right) -->
          <div>
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="btn btn-ghost border">
                Status
                <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017-1017-1017 242-241 775 775 775-775z"></path></svg>
              </div>
              <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Active</a></li>
                <li><a>Inactive</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table w-full">
            <thead>
              <tr class="font-semibold text-[#626d7a] text-base bg-[#f7f8fa] border-b-2 border-[#eef2f7]">
                <th class="w-8">
                  <label><input type="checkbox" class="checkbox" /></label>
                </th>
                <th>Warranty</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Status</th>
                <th class="text-right w-24"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="w in pagedWarranties" :key="w.id" class="border-b border-[#f2f3f7]">
                <td><label><input type="checkbox" class="checkbox" /></label></td>
                <td>{{ w.name }}</td>
                <td>{{ w.description }}</td>
                <td>{{ w.duration }}</td>
                <td>
                  <span
                    class="badge px-3 py-2 text-sm font-medium"
                    :class="w.status === 'Active' ? 'bg-[#e6f7ec] text-[#24b47e]' : 'bg-[#f1f1f2] text-[#777]'"
                  >
                    <i class="bi bi-dot"></i> {{ w.status }}
                  </span>
                </td>
                <td class="text-right">
                  <div class="flex gap-2 justify-end">
                    <button class="btn btn-ghost btn-sm border" title="Edit"><i class="bi bi-pencil"></i></button>
                    <button class="btn btn-ghost btn-sm border" title="Delete"><i class="bi bi-trash"></i></button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Table footer: row/entries and pagination -->
        <div class="flex justify-between items-center flex-wrap gap-2 mt-3">
          <div class="text-gray-500 text-sm flex items-center gap-2">
            Rows Per Page
            <select class="select select-sm select-bordered w-20" v-model.number="rowsPerPage">
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            Entries
          </div>
          <div class="join">
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === 1 }" @click.prevent="changePage(currentPage-1)">
              <i class="bi bi-chevron-left"></i>
            </button>
            <button class="join-item btn btn-sm btn-active">
              {{ currentPage }}
            </button>
            <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === pageCount }" @click.prevent="changePage(currentPage+1)">
              <i class="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
        <!-- Floating cog/settings button -->
        <button
          class="btn btn-warning absolute w-12 h-12 rounded-full text-xl flex items-center justify-center z-20 border-none shadow-lg
          md:right-[-26px] md:top-[60px]
          max-md:right-2 max-md:bottom-[-24px]"
        >
          <i class="bi bi-gear"></i>
        </button>
      </div>
    </div>
    <!-- Add Warranty Modal (DaisyUI modal) -->
    <dialog :class="{ 'modal-open': showModal }" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-0">Add Warranty</h3>
        <form @submit.prevent="addWarranty">
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Warranty Name</span>
            </label>
            <input v-model="newWarranty.name" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Description</span>
            </label>
            <input v-model="newWarranty.description" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Duration</span>
            </label>
            <input v-model="newWarranty.duration" class="input input-bordered w-full" required placeholder="e.g. 1 Year, 6 Months" />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Status</span>
            </label>
            <select v-model="newWarranty.status" class="select select-bordered w-full">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div class="modal-action mt-6 pt-4 border-t border-gray-200">
            <button class="btn btn-ghost" type="button" @click="showModal = false">Cancel</button>
            <button class="btn btn-primary" type="submit">Add Warranty</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showModal = false">close</button>
      </form>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"

interface WarrantyRow {
  id: number
  name: string
  description: string
  duration: string
  status: string
}

const warranties = ref<WarrantyRow[]>([
  { id: 1, name: "Replacement Warranty", description: "Covers replacement of faulty items", duration: "2 Year", status: "Active" },
  { id: 2, name: "On-Site Warranty", description: "Product repairs done at the customer's location", duration: "1 Year", status: "Active" },
  { id: 3, name: "Accidental Protection Plan", description: "Coverage for accidental damage", duration: "6 Months", status: "Active" },
  { id: 4, name: "Labor-Only Warranty", description: "Covers only labor costs, not parts", duration: "6 Months", status: "Active" },
  { id: 5, name: "No-Cost Repairs", description: "No charge for repairs during warranty period", duration: "3 Months", status: "Active" },
  { id: 6, name: "Accidental Damage", description: "Coverage for unexpected damage", duration: "6 Months", status: "Active" },
  { id: 7, name: "Wear & Tear Warranty", description: "Covers specific product aging issues", duration: "1 Year", status: "Active" },
  { id: 8, name: "Money-Back Guarantee", description: "Refund within a specified period", duration: "3 Months", status: "Active" },
  { id: 9, name: "Water Damage Warranty", description: "Coverage for water-related issues", duration: "6 Months", status: "Active" },
  { id: 10, name: "Power Surge Protection", description: "Covers damage from power surges", duration: "6 Months", status: "Active" },
])

const search = ref("")
const rowsPerPage = ref(10)
const currentPage = ref(1)
const showModal = ref(false)
const newWarranty = ref({
  name: "",
  description: "",
  duration: "",
  status: "Active"
})

function addWarranty() {
  warranties.value.push({
    id: Date.now(),
    name: newWarranty.value.name,
    description: newWarranty.value.description,
    duration: newWarranty.value.duration,
    status: newWarranty.value.status
  })
  showModal.value = false
  newWarranty.value = {
    name: "",
    description: "",
    duration: "",
    status: "Active"
  }
}

const filteredWarranties = computed(() => {
  if (!search.value) return warranties.value
  const s = search.value.toLowerCase()
  return warranties.value.filter(
    w =>
      w.name.toLowerCase().includes(s) ||
      w.description.toLowerCase().includes(s) ||
      w.duration.toLowerCase().includes(s)
  )
})

const pageCount = computed(() =>
  Math.ceil(filteredWarranties.value.length / rowsPerPage.value))

const pagedWarranties = computed(() =>
  filteredWarranties.value.slice(
    (currentPage.value - 1) * rowsPerPage.value,
    currentPage.value * rowsPerPage.value
  ))

function changePage(page: number) {
  if (page >= 1 && page <= pageCount.value) currentPage.value = page
}
</script>
