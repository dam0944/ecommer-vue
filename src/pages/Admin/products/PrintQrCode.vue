<template>
  <div class="min-h-screen bg-gray-100 py-6 px-4">
    <div class="mx-auto space-y-6">
      <!-- Page Header -->
      <div>
        <h1 class="text-2xl font-bold">Print QR Code</h1>
        <p class="text-sm text-gray-500">Manage your QR code</p>
      </div>

      <div class="bg-white shadow-sm rounded-2xl p-6 relative">
        <!-- Top Row: Warehouse & Store -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-semibold mb-1">Warehouse <span class="text-red-500">*</span></label>
            <select v-model="warehouse" required class="select select-bordered w-full">
              <option value="">Select</option>
              <option v-for="w in warehouses" :key="w" :value="w">{{ w }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-semibold mb-1">Store <span class="text-red-500">*</span></label>
            <select v-model="store" required class="select select-bordered w-full">
              <option value="">Select</option>
              <option v-for="s in stores" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>

        <!-- Product Search -->
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1">Product <span class="text-red-500">*</span></label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              <i class="bi bi-search"></i>
            </div>
            <input
              v-model="productSearch"
              placeholder="Search Product by Code"
              class="input input-bordered w-full pl-10"
            />
          </div>
        </div>

        <!-- Product Table -->
        <div class="bg-gray-50 rounded-xl border border-gray-200 p-2 mb-4 overflow-auto">
          <table class="table w-full">
            <thead class="bg-gray-100">
              <tr>
                <th class="w-1/3 font-semibold text-gray-600">Product</th>
                <th>SKU</th>
                <th>Code</th>
                <th>Reference Number</th>
                <th>Qty</th>
                <th class="w-16"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, idx) in filteredProducts" :key="item.code">
                <td>
                  <div class="flex items-center gap-2">
                    <img :src="item.img" class="w-8 h-8 object-cover rounded border p-0.5 bg-white" />
                    <span>{{ item.name }}</span>
                  </div>
                </td>
                <td>{{ item.sku }}</td>
                <td>{{ item.code }}</td>
                <td>{{ item.refNumber }}</td>
                <td>
                  <div class="flex items-center gap-2">
                    <button @click="changeQty(idx, -1)" class="btn btn-sm btn-outline px-2 py-0" :disabled="item.qty <= 1">
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="font-semibold">{{ item.qty }}</span>
                    <button @click="changeQty(idx, 1)" class="btn btn-sm btn-outline px-2 py-0">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </td>
                <td class="text-right">
                  <button @click="removeProduct(idx)" class="btn btn-sm btn-ghost text-gray-600">
                    <i class="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paper Size and Toggles -->
        <div class="grid md:grid-cols-3 gap-4 mb-4 items-center">
          <div>
            <label class="block text-sm font-semibold mb-1">Paper Size <span class="text-red-500">*</span></label>
            <select v-model="paperSize" required class="select select-bordered w-full">
              <option value="">Select</option>
              <option v-for="size in paperSizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="md:col-span-2 flex items-center gap-4">
            <label class="cursor-pointer label">
              <input type="checkbox" v-model="showRefNumber" class="toggle toggle-primary mr-2" />
              <span class="label-text">Reference Number</span>
            </label>
          </div>
        </div>

        <!-- Footer Buttons -->
        <div class="flex flex-wrap justify-end gap-2 mt-6">
          <button class="btn btn-warning text-white" @click="generateQRCode">
            <i class="bi bi-eye"></i> Generate QR Code
          </button>
          <button class="btn btn-primary text-white" @click="resetForm">
            <i class="bi bi-power"></i> Reset
          </button>
          <button class="btn btn-error text-white" @click="printQRCode">
            <i class="bi bi-printer"></i> Print QRcode
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const warehouse = ref('')
const store = ref('')
const paperSize = ref('')
const productSearch = ref('')
const showRefNumber = ref(true)

const warehouses = ['Main Warehouse', 'Secondary Warehouse']
const stores = ['Store A', 'Store B']
const paperSizes = ['A4', 'A5', 'Custom']

interface ProductRow {
  name: string
  sku: string
  code: string
  refNumber: string
  qty: number
  img: string
}

const products = ref<ProductRow[]>([
  {
    name: 'Nike Jordan',
    sku: 'PT002',
    code: 'HG3FK',
    refNumber: '32RRR554',
    qty: 1,
    img: 'https://cdn-icons-png.flaticon.com/512/25/25694.png'
  }
])

const filteredProducts = computed(() => {
  if (!productSearch.value) return products.value
  const s = productSearch.value.toLowerCase()
  return products.value.filter(
    p =>
      p.name.toLowerCase().includes(s) ||
      p.code.toLowerCase().includes(s) ||
      p.sku.toLowerCase().includes(s) ||
      p.refNumber.toLowerCase().includes(s)
  )
})

function changeQty(idx: number, delta: number) {
  const item = filteredProducts.value[idx]
  if (!item) return
  const realIdx = products.value.findIndex(p => p.code === item.code)
  const newQty = products.value[realIdx].qty + delta
  if (newQty > 0) products.value[realIdx].qty = newQty
}

function removeProduct(idx: number) {
  const item = filteredProducts.value[idx]
  if (!item) return
  const realIdx = products.value.findIndex(p => p.code === item.code)
  if (realIdx !== -1) products.value.splice(realIdx, 1)
}

function generateQRCode() {
  alert('QR Code preview generated (stub action).')
}

function resetForm() {
  warehouse.value = ''
  store.value = ''
  paperSize.value = ''
  productSearch.value = ''
  showRefNumber.value = true
  products.value = [
    {
      name: 'Nike Jordan',
      sku: 'PT002',
      code: 'HG3FK',
      refNumber: '32RRR554',
      qty: 1,
      img: 'https://cdn-icons-png.flaticon.com/512/25/25694.png'
    }
  ]
}

function printQRCode() {
  alert('QR Code print initiated (stub action).')
}
</script>
