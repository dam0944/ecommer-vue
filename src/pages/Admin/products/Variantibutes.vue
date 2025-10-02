<template>
  <div class="variant-attributes-page bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 pb-4">
      <!-- Header -->
      <div class="flex justify-between items-center pt-4 mb-2 flex-wrap gap-2">
        <div>
          <h3 class="font-bold mb-0">Variant Attributes</h3>
          <div class="text-gray-500 text-sm">Manage your variant attributes</div>
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
          <button class="btn btn-warning flex items-center gap-2 px-3 rounded-xl text-white font-bold" @click="showModal = true">
            <i class="bi bi-plus-circle"></i> Add Variant
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
                <th>Variant</th>
                <th>Values</th>
                <th>Created Date</th>
                <th>Status</th>
                <th class="text-right w-24"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="variant in pagedVariants" :key="variant.id" class="border-b border-[#f2f3f7]">
                <td><label><input type="checkbox" class="checkbox" /></label></td>
                <td>{{ variant.name }}</td>
                <td>
                  <span v-for="(v, idx) in variant.values" :key="idx" class="mr-1">
                    <span v-if="idx>0">, </span>{{ v }}
                  </span>
                </td>
                <td>{{ formatDate(variant.date) }}</td>
                <td>
                  <span
                    class="badge px-3 py-2 text-sm font-medium rounded-full"
                    :class="variant.status === 'Active' ? 'bg-[#e6f7ec] text-[#24b47e]' : 'bg-[#f1f1f2] text-[#777]'"
                  >
                    <i class="bi bi-dot"></i> {{ variant.status }}
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
    <!-- Add Variant Modal (DaisyUI modal) -->
    <dialog :class="{ 'modal-open': showModal }" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-0">Add Variant Attribute</h3>
        <form @submit.prevent="addVariant">
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Variant Name</span>
            </label>
            <input v-model="newVariant.name" class="input input-bordered w-full" required />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Values <span class="text-gray-500">(comma separated)</span></span>
            </label>
            <input v-model="newVariant.values" class="input input-bordered w-full" required placeholder="e.g. Red, Blue, Green" />
          </div>
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text text-sm">Status</span>
            </label>
            <select v-model="newVariant.status" class="select select-bordered w-full">
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div class="modal-action mt-6 pt-4 border-t border-gray-200">
            <button class="btn btn-ghost" type="button" @click="showModal = false">Cancel</button>
            <button class="btn btn-primary" type="submit">Add Variant</button>
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

interface VariantRow {
  id: number
  name: string
  values: string[]
  date: string // yyyy-mm-dd
  status: string
}

const variants = ref<VariantRow[]>([
  { id: 1, name: "Size", values: ["XS", "S", "M", "L", "XL"], date: "2024-12-24", status: "Active" },
  { id: 2, name: "Color", values: ["Red", "Blue", "Green"], date: "2024-12-10", status: "Active" },
  { id: 3, name: "Capacity", values: ["Small", "Medium", "Large"], date: "2024-11-27", status: "Active" },
  { id: 4, name: "Material", values: ["Cotton", "Leather", "Synthetic"], date: "2024-11-18", status: "Active" },
  { id: 5, name: "Weight", values: ["Light", "Heavy"], date: "2024-11-06", status: "Active" },
  { id: 6, name: "Style", values: ["Casual", "Formal", "Sporty"], date: "2024-10-25", status: "Active" },
  { id: 7, name: "Pattern", values: ["Solid", "Striped", "Printed"], date: "2024-10-14", status: "Active" },
  { id: 8, name: "Memory", values: ["8 GB", "16 GB", "36 GB"], date: "2024-10-03", status: "Active" },
  { id: 9, name: "Storage", values: ["128 GB", "256 GB", "512 GB", "1TB"], date: "2024-09-20", status: "Active" },
  { id: 10, name: "Length", values: ["Short", "Regular", "Long"], date: "2024-09-10", status: "Active" },
])

const search = ref("")
const rowsPerPage = ref(10)
const currentPage = ref(1)
const showModal = ref(false)
const newVariant = ref({
  name: "",
  values: "",
  date: "",
  status: "Active"
})

function addVariant() {
  // Format date as "yyyy-mm-dd" for internal storage, then format for display
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months start at 0!
  const dd = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${yyyy}-${mm}-${dd}`;

  variants.value.push({
    id: Date.now(),
    name: newVariant.value.name,
    values: newVariant.value.values.split(",").map(s => s.trim()).filter(Boolean),
    date: formattedDate, // Store in yyyy-mm-dd format
    status: newVariant.value.status
  })
  showModal.value = false
  newVariant.value = {
    name: "",
    values: "",
    date: "",
    status: "Active"
  }
}

const filteredVariants = computed(() => {
  if (!search.value) return variants.value
  const s = search.value.toLowerCase()
  return variants.value.filter(
    v =>
      v.name.toLowerCase().includes(s) ||
      v.values.some(val => val.toLowerCase().includes(s))
  )
})

const pageCount = computed(() =>
  Math.ceil(filteredVariants.value.length / rowsPerPage.value))

const pagedVariants = computed(() =>
  filteredVariants.value.slice(
    (currentPage.value - 1) * rowsPerPage.value,
    currentPage.value * rowsPerPage.value
  ))

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
</script>
