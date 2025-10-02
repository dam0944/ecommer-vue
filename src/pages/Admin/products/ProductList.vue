<template>
  <div class="container mx-auto p-3 lg:p-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h5 class="text-xl font-semibold mb-1">Product List</h5>
        <small class="text-gray-500">Manage your products</small>
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <div class="flex gap-2">
          <button class="btn btn-sm btn-error"><i class="bi bi-x-circle"></i></button>
          <button class="btn btn-sm btn-success"><i class="bi bi-check-circle"></i></button>
          <button class="btn btn-sm btn-ghost"><i class="bi bi-arrow-up"></i></button>
          <button class="btn btn-sm btn-ghost"><i class="bi bi-arrow-down"></i></button>
        </div>
        <router-link to="/create">
          <button class="btn btn-warning text-white font-bold ml-2">
            <i class="bi bi-plus-circle mr-2"></i>Add Product
          </button>
        </router-link>
        <button class="btn btn-primary" @click="showModal = true">
          <i class="bi bi-download mr-2"></i>Import Product
        </button>
      </div>
    </div>
    <div class="bg-base-100 shadow-xl rounded-2xl p-4 md:p-6">
      <div class="flex flex-wrap items-center mb-4 gap-4">
        <div class="w-full md:w-auto flex-1">
          <label class="input input-bordered flex items-center gap-2">
            <i class="bi bi-search"></i>
            <input type="text" class="grow" placeholder="Search" v-model="search" />
          </label>
        </div>
        <div class="md:ml-auto flex gap-2">
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost border">
              Category
              <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017-1017-1017 242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div>
          <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost border">
              Brand
              <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048"><path d="M1799 349l242 241-1017 1017-1017-1017 242-241 775 775 775-775z"></path></svg>
            </div>
            <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Item 1</a></li>
              <li><a>Item 2</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th><label><input type="checkbox" class="checkbox" /></label></th>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Unit</th>
              <th>Qty</th>
              <th>Created By</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pagedProducts" :key="item.sku">
              <th><label><input type="checkbox" class="checkbox" /></label></th>
              <td>{{ item.sku }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12 border">
                      <img :src="item.img" :alt="item.name" />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{{ item.name }}</div>
                  </div>
                </div>
              </td>
              <td class="text-gray-500">{{ item.category }}</td>
              <td class="text-gray-500">{{ item.brand }}</td>
              <td class="font-bold">${{ item.price }}</td>
              <td>{{ item.unit }}</td>
              <td>{{ item.qty }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img :src="item.userImg" :alt="item.userName" />
                    </div>
                  </div>
                  <span>{{ item.userName }}</span>
                </div>
              </td>
              <td>
                <div class="flex gap-1">
                  <button class="btn btn-ghost btn-sm" title="View"><i class="bi bi-eye"></i></button>
                  <button class="btn btn-ghost btn-sm" title="Edit"><i class="bi bi-pencil"></i></button>
                  <button class="btn btn-ghost btn-sm" title="Delete"><i class="bi bi-trash"></i></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
        <div class="flex items-center gap-2">
          <span>Rows Per Page</span>
          <select class="select select-sm select-bordered w-20" v-model="rowPerPage">
            <option v-for="n in [10, 20, 50]" :value="n" :key="n">{{ n }}</option>
          </select>
          <span>Entries</span>
        </div>
        <div class="join">
          <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === 1 }" @click="prevPage">
            <i class="bi bi-chevron-left"></i>
          </button>
          <button v-for="p in totalPages" :key="p" class="join-item btn btn-sm" :class="{ 'btn-active': currentPage === p }" @click="selectPage(p)">
            {{ p }}
          </button>
          <button class="join-item btn btn-sm" :class="{ 'btn-disabled': currentPage === totalPages }" @click="nextPage">
            <i class="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>
    <dialog :class="{ 'modal-open': showModal }" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-0">Import Product</h3>
        <form @submit.prevent="onSubmit">
          <div class="form-control mt-4">
            <label class="label">
              <span class="label-text">Product <span class="text-error">*</span></span>
            </label>
            <select class="select select-bordered w-full"><option>Select</option></select>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Category <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Sub Category <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
          </div>
          <div class="mt-4 text-right">
            <button type="button" class="btn btn-warning text-white">
              Download Sample File
            </button>
          </div>
          <div class="form-control mt-4">
            <label class="label"><span class="label-text">Upload CSV File</span></label>
            <div
              class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg bg-yellow-50 hover:border-orange-400 hover:bg-yellow-100 cursor-pointer transition"
              @dragover.prevent
              @drop.prevent="onFileDrop"
              @click="fileInputRef.click()"
            >
              <input
                ref="fileInputRef"
                type="file"
                accept=".csv"
                class="hidden"
                @change="onFileChange"
              />
              <svg width="54" height="54" viewBox="0 0 54 54">
                <ellipse cx="27" cy="27" rx="24" ry="24" fill="#ffb967" fill-opacity="0.2"/>
                <ellipse cx="27" cy="29" rx="15" ry="14" fill="#fff7ee" />
                <path d="M27 18v14M27 32l-5-5M27 32l5-5" stroke="#ff9800" stroke-width="2" stroke-linecap="round"/>
                <ellipse cx="27" cy="24" rx="7" ry="7" fill="#ffb967"/>
                <ellipse cx="27" cy="24" rx="4.5" ry="4.5" fill="#fff7ee"/>
              </svg>
              <div class="mt-2 text-center">
                <span class="text-gray-500">Drag and drop a <span class="text-warning">file to upload</span></span>
              </div>
              <div v-if="fileName" class="mt-1 text-sm text-success">
                {{ fileName }}
              </div>
            </div>
          </div>
          <div class="form-control mt-4">
            <label class="label"><span class="label-text">Created by <span class="text-error">*</span></span></label>
            <input type="text" class="input input-bordered" v-model="createdBy" />
          </div>
          <div class="form-control mt-4">
            <label class="label"><span class="label-text">Description</span></label>
            <textarea class="textarea textarea-bordered h-20" maxlength="60" v-model="desc"></textarea>
            <label class="label"><span class="label-text-alt text-gray-500">Maximum 60 Characters</span></label>
          </div>
          <div class="modal-action mt-6 pt-4 border-t border-gray-200">
            <button type="button" class="btn btn-ghost" @click="showModal = false">Cancel</button>
            <button type="submit" class="btn btn-warning text-white">Submit</button>
          </div>
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button @click="showModal = false">close</button>
      </form>
    </dialog>
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
  ))

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
