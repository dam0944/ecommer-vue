<template>
  <div class="barcode-page bg-gray-100 min-h-screen">
    <div class="container mx-auto px-4 py-3 lg:p-6">
      <h4 class="font-bold mb-0">Print Barcode</h4>
      <div class="text-gray-500 mb-3">Manage your barcodes</div>
      <div class="barcode-card bg-white rounded-2xl p-4 shadow-md relative">
        <!-- Top Row: Warehouse & Store -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-semibold">Warehouse <span class="text-error">*</span></span></label>
            <select class="select select-bordered w-full" v-model="warehouse" required>
              <option value="">Select</option>
              <option v-for="w in warehouses" :key="w" :value="w">{{ w }}</option>
            </select>
          </div>
          <div class="form-control">
            <label class="label"><span class="label-text font-semibold">Store <span class="text-error">*</span></span></label>
            <select class="select select-bordered w-full" v-model="store" required>
              <option value="">Select</option>
              <option v-for="s in stores" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
        </div>
        <!-- Product Search -->
        <div class="form-control mb-4">
          <label class="label"><span class="label-text font-semibold">Product <span class="text-error">*</span></span></label>
          <label class="input input-bordered flex items-center gap-2">
            <i class="bi bi-search"></i>
            <input type="text" class="grow" placeholder="Search Product by Code" v-model="productSearch">
          </label>
        </div>
        <!-- Product Table -->
        <div class="barcode-table-wrapper mb-4">
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th style="width: 40%;">Product</th>
                  <th>SKU</th>
                  <th>Code</th>
                  <th>Qty</th>
                  <th class="text-right" style="width: 70px;"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, idx) in filteredProducts" :key="item.code">
                  <td>
                    <div class="flex items-center gap-2">
                      <img :src="item.img" class="product-thumb" alt="product" />
                      {{ item.name }}
                    </div>
                  </td>
                  <td>{{ item.sku }}</td>
                  <td>{{ item.code }}</td>
                  <td>
                    <div class="flex items-center gap-2">
                      <button @click="changeQty(idx, -1)" class="btn btn-outline btn-sm px-2 py-0" :disabled="item.qty <= 1"><i class="bi bi-dash"></i></button>
                      <span class="font-semibold">{{ item.qty }}</span>
                      <button @click="changeQty(idx, 1)" class="btn btn-outline btn-sm px-2 py-0"><i class="bi bi-plus"></i></button>
                    </div>
                  </td>
                  <td class="text-right">
                    <button class="btn btn-ghost btn-sm border" @click="removeProduct(idx)" title="Delete"><i class="bi bi-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- Paper Size and Toggles -->
        <div class="grid grid-cols-1 md:grid-cols-2 items-center mb-4 gap-4">
          <div class="form-control">
            <label class="label"><span class="label-text font-semibold">Paper Size <span class="text-error">*</span></span></label>
            <select class="select select-bordered w-full" v-model="paperSize" required>
              <option value="">Select</option>
              <option v-for="size in paperSizes" :key="size" :value="size">{{ size }}</option>
            </select>
          </div>
          <div class="flex flex-wrap gap-4 mt-2 md:mt-0">
            <div class="form-control">
              <label class="label cursor-pointer flex items-center gap-2">
                <input type="checkbox" class="toggle toggle-warning" v-model="showStoreName" id="showStoreName">
                <span class="label-text">Show Store Name</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer flex items-center gap-2">
                <input type="checkbox" class="toggle toggle-warning" v-model="showProductName" id="showProductName">
                <span class="label-text">Show Product Name</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer flex items-center gap-2">
                <input type="checkbox" class="toggle toggle-warning" v-model="showPrice" id="showPrice">
                <span class="label-text">Show Price</span>
              </label>
            </div>
          </div>
        </div>
        <!-- Footer Buttons -->
        <div class="flex justify-end gap-3 mt-4 flex-wrap">
          <button class="btn btn-warning font-semibold text-white" @click="generateBarcode"><i class="bi bi-eye mr-2"></i> Generate Barcode</button>
          <button class="btn font-semibold text-white bg-[#223a52] border-[#223a52] hover:bg-[#223a52]/90 hover:border-[#223a52]/90" @click="resetBarcode"><i class="bi bi-arrow-repeat mr-2"></i> Reset Barcode</button>
          <button class="btn btn-error font-semibold" @click="printBarcode"><i class="bi bi-printer mr-2"></i> Print Barcode</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const warehouse = ref("")
const store = ref("")
const paperSize = ref("")
const productSearch = ref("")
const showStoreName = ref(true)
const showProductName = ref(true)
const showPrice = ref(true)

const warehouses = ["Main Warehouse", "Secondary Warehouse"]
const stores = ["Store A", "Store B"]
const paperSizes = ["A4", "A5", "Custom"]

interface ProductRow {
  name: string,
  sku: string,
  code: string,
  qty: number,
  img: string
}

const products = ref<ProductRow[]>([
  { name: "Nike Jordan", sku: "PT002", code: "HG3FK", qty: 4, img: "https://cdn-icons-png.flaticon.com/512/25/25694.png" },
  { name: "Apple Series 5 Watch", sku: "PT003", code: "TEUIU7", qty: 4, img: "https://cdn-icons-png.flaticon.com/512/747/747376.png" }
])

const filteredProducts = computed(() => {
  if (!productSearch.value) return products.value
  const s = productSearch.value.toLowerCase()
  return products.value.filter(p =>
    p.name.toLowerCase().includes(s) ||
    p.code.toLowerCase().includes(s) ||
    p.sku.toLowerCase().includes(s)
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

function generateBarcode() {
  alert("Barcode preview generated (stub action).")
}

function resetBarcode() {
  warehouse.value = ""
  store.value = ""
  paperSize.value = ""
  productSearch.value = ""
  showStoreName.value = true
  showProductName.value = true
  showPrice.value = true
  products.value = [
    { name: "Nike Jordan", sku: "PT002", code: "HG3FK", qty: 4, img: "https://cdn-icons-png.flaticon.com/512/25/25694.png" },
    { name: "Apple Series 5 Watch", sku: "PT003", code: "TEUIU7", qty: 4, img: "https://cdn-icons-png.flaticon.com/512/747/747376.png" }
  ]
}

function printBarcode() {
  alert("Barcode print initiated (stub action).")
}
</script>

<style scoped>
/* Custom styles for the barcode card and table to match the screenshot */
.barcode-card {
  box-shadow: 0 2px 24px 0 rgba(30,136,229,0.04), 0 1.5px 3.5px 0 rgba(60,80,130,0.02);
}

.barcode-table-wrapper {
  background: #f6f7fa;
  border-radius: 1.1rem;
  padding: 0.5rem 0.5rem 0.2rem 0.5rem;
  border: 1px solid #e7eaf2;
}

.barcode-table-wrapper table thead th {
  font-weight: 600;
  color: #626d7a;
  font-size: 1em;
  background: #ecf1f7 !important;
  border-bottom: 2px solid #eef2f7;
}

.barcode-table-wrapper table tbody tr {
  border-bottom: 1px solid #ecf1f7;
}

.barcode-table-wrapper table td,
.barcode-table-wrapper table th {
  vertical-align: middle;
}

.product-thumb {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  object-fit: cover;
  background: #fff;
  border: 1px solid #eee;
  padding: 3px;
}

.settings-fab {
  position: absolute;
  right: -26px;
  top: 60px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 1.25rem;
  box-shadow: 0 4px 14px 0 rgba(228, 162, 40, 0.11);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border: none;
}

@media (max-width: 991px) {
  .settings-fab {
    right: 8px;
    top: auto;
    bottom: -24px;
  }
}
</style>
