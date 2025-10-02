<template>
  <div class="p-6 md:p-10 bg-gray-50 min-h-screen">
    <div class="mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h5 class="text-3xl font-bold text-gray-800 mb-1">Category Management</h5>
          <p class="text-lg text-gray-500">Manage and organize your product categories</p>
        </div>
        <div class="flex flex-wrap gap-2 mt-4 md:mt-0">
          <button class="btn btn-ghost btn-sm tooltip" data-tip="Remove Selected"><i class="bi bi-x-circle text-error text-xl"></i></button>
          <button class="btn btn-ghost btn-sm tooltip" data-tip="Enable Selected"><i class="bi bi-check-circle text-success text-xl"></i></button>
          <button class="btn btn-ghost btn-sm tooltip" data-tip="Move Up"><i class="bi bi-arrow-up text-lg"></i></button>
          <button class="btn btn-ghost btn-sm tooltip" data-tip="Move Down"><i class="bi bi-arrow-down text-lg"></i></button>

          <label htmlFor="my_modal_6" className="btn">open modal</label>
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />  
          <div className="modal" role="dialog">
            <div className="modal-box">
              <form @submit.prevent="onSubmit" class="mt-4">
                <div class="form-control w-full mb-4">
                  <label class="label"><span class="label-text font-medium text-gray-700">Category Name <span class="text-error">*</span></span></label>
                  <input type="text" placeholder="e.g., Electronics" class="input input-bordered w-full" v-model="newCategory.name" required />
                </div>
                <div class="form-control w-full mb-4">
                  <label class="label"><span class="label-text font-medium text-gray-700">Category Slug <span class="text-error">*</span></span></label>
                  <input type="text" placeholder="e.g., electronics" class="input input-bordered w-full" v-model="newCategory.slug" required />
                </div>
                <div class="form-control w-full mb-4">
                  <label class="label"><span class="label-text font-medium text-gray-700">Created On <span class="text-error">*</span></span></label>
                  <input type="date" class="input input-bordered w-full" v-model="newCategory.created" required />
                </div>
                <div class="form-control w-full mb-4">
                  <label class="label"><span class="label-text font-medium text-gray-700">Status</span></label>
                  <select class="select select-bordered w-full" v-model="newCategory.status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div class="modal-action mt-6 pt-4 border-t border-gray-200">
                  <label htmlFor="my_modal_6" className="btn">Close!</label>
                  <button type="submit" class="btn btn-primary text-base-content">Add Category</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="card rounded-sm border border-gray-200">
        <div class="card-body p-6 md:p-8">
          <div class="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
            <div class="w-full md:max-w-xs">
              <label class="input input-bordered flex items-center gap-2">
                <i class="bi bi-search text-gray-400"></i>
                <input type="text" class="grow bg-gray-100" placeholder="Search categories..." v-model="search" />
              </label>
            </div>
            <div class="w-full md:w-auto">
              <div class="dropdown dropdown-end w-full">
                <div tabindex="0" role="button" class="btn btn-outline border-gray-300 w-full md:w-auto">
                  Status <i class="bi bi-chevron-down ml-2"></i>
                </div>
                <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                  <li><a>All</a></li>
                  <li><a>Active</a></li>
                  <li><a>Inactive</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto rounded-sm">
            <table class="table w-full">
              <thead class="bg-slate-200 text-gray-700">
                <tr class="text-left">
                  <th class="w-8 p-4"><label><input type="checkbox" class="checkbox checkbox-sm" /></label></th>
                  <th class="p-4 font-semibold text-lg">Category</th>
                  <th class="p-4 font-semibold text-lg">Category Slug</th>
                  <th class="p-4 font-semibold text-lg">Created On</th>
                  <th class="p-4 font-semibold text-lg">Status</th>
                  <th class="w-24 p-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="cat in pagedCategories" :key="cat.slug" class="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-150">
                  <td class="p-4"><label><input type="checkbox" class="checkbox checkbox-sm" /></label></td>
                  <td class="p-4 font-medium text-gray-800">{{ cat.name }}</td>
                  <td class="p-4 text-gray-500 text-sm">{{ cat.slug }}</td>
                  <td class="p-4 text-gray-500">{{ cat.created }}</td>
                  <td class="p-4">
                    <span class="badge badge-success badge-outline bg-success/20 text-success border-success px-3 py-2 font-semibold">Active</span>
                  </td>
                  <td class="p-4">
                    <div class="flex gap-1">
                      <button class="btn btn-ghost btn-circle btn-sm tooltip" data-tip="Edit">
                        <i class="bi bi-pencil-square text-lg"></i>
                      </button>
                      <button class="btn btn-ghost btn-circle btn-sm tooltip" data-tip="Delete">
                        <i class="bi bi-trash text-lg"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <span>Row Per Page</span>
              <select class="select select-bordered select-sm w-20" v-model="rowPerPage">
                <option v-for="n in [10, 20, 50]" :value="n" :key="n">{{ n }}</option>
              </select>
              <span>Entries</span>
            </div>
            <div class="join">
              <button class="join-item btn btn-sm" @click="prevPage" :disabled="currentPage === 1">
                <i class="bi bi-chevron-left"></i>
              </button>
              <button v-for="p in totalPages" :key="p" class="join-item btn btn-sm" :class="{ 'btn-active btn-primary text-white': currentPage === p }" @click="selectPage(p)">
                {{ p }}
              </button>
              <button class="join-item btn btn-sm" @click="nextPage" :disabled="currentPage === totalPages">
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'

interface Category {
  name: string
  slug: string
  created: string
  status: string
}

const search = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)

const categories = ref<Category[]>([
  { name: "Computers", slug: "computers", created: "24 Dec 2024", status: "active" },
  { name: "Electronics", slug: "electronics", created: "10 Dec 2024", status: "active" },
  { name: "Shoe", slug: "shoe", created: "27 Nov 2024", status: "active" },
  { name: "Cosmetics", slug: "cosmetics", created: "18 Nov 2024", status: "active" },
  { name: "Groceries", slug: "groceries", created: "06 Nov 2024", status: "active" },
  { name: "Furniture", slug: "furniture", created: "25 Oct 2024", status: "active" },
  { name: "Bags", slug: "bags", created: "14 Oct 2024", status: "active" },
  { name: "Phone", slug: "phone", created: "03 Oct 2024", status: "active" },
  { name: "Appliances", slug: "appliances", created: "20 Sep 2024", status: "active" },
  { name: "Clothing", slug: "clothing", created: "10 Sep 20244", status: "active" }
])

const newCategory = ref<Category>({
  name: '',
  slug: '',
  created: '',
  status: 'active'
})

const filteredCategories = computed(() =>
  categories.value.filter(cat =>
    !search.value ||
    cat.name.toLowerCase().includes(search.value.toLowerCase()) ||
    cat.slug.toLowerCase().includes(search.value.toLowerCase())
  )
)

const totalPages = computed(() => Math.ceil(filteredCategories.value.length / rowPerPage.value) || 1)

const pagedCategories = computed(() => {
  const start = (currentPage.value - 1) * rowPerPage.value
  return filteredCategories.value.slice(start, start + rowPerPage.value)
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
  if (!newCategory.value.name || !newCategory.value.slug || !newCategory.value.created) return
  // Format created date as e.g. 24 Dec 2024
  const d = new Date(newCategory.value.created)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  newCategory.value.created = `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${d.getFullYear()}`
  categories.value.unshift({ ...newCategory.value })

  // The modal close logic is now handled by DaisyUI's dialog and forms
  const modal = document.getElementById('my_modal_1') as HTMLDialogElement
  modal.close()

  newCategory.value.name = ''
  newCategory.value.slug = ''
  newCategory.value.created = ''
  newCategory.value.status = 'active'
}
</script>

<style scoped>
/* Scoped styles are no longer needed, as all styling is handled by Tailwind and Daisy UI utility classes. */
</style>