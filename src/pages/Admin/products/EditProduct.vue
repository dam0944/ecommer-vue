<template>
  <div class="container mx-auto p-4 md:p-6">
    <!-- Header Bar -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h5 class="text-xl font-semibold mb-1">Edit Product</h5>
        <small class="text-gray-500">Edit Your product</small>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-ghost btn-sm md:btn-md" title="Refresh">
          <i class="bi bi-arrow-repeat text-lg"></i>
        </button>
        <button class="btn btn-ghost btn-sm md:btn-md" title="Back">
          <i class="bi bi-arrow-left text-lg"></i>
        </button>
        <router-link to="/list">
          <!-- DaisyUI's btn-primary is typically purple/blue, matching the screenshot -->
          <button class="btn btn-primary btn-sm md:btn-md">Back to Product</button>
        </router-link>
      </div>
    </div>

    <!-- Product Information Card -->
    <div class="card bg-base-100 shadow-xl rounded-2xl mb-6">
      <div class="card-header bg-gray-50 px-4 py-3 flex items-center rounded-t-2xl border-b border-gray-200">
        <i class="bi bi-info-circle text-warning mr-2 text-lg"></i>
        <b class="font-bold">Product Information</b>
        <button
          class="btn btn-ghost ml-auto p-0"
          :aria-expanded="showForm"
          aria-controls="productForm"
          @click="showForm = !showForm"
        >
          <i
            class="bi text-xl"
            :class="showForm ? 'bi-chevron-up' : 'bi-chevron-down'"
          ></i>
        </button>
      </div>
      <transition name="slide-fade">
        <div class="card-body p-4" v-show="showForm" id="productForm">
          <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Store <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Warehouse <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Product Name <span class="text-error">*</span></span></label>
              <input type="text" class="input input-bordered w-full" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Slug <span class="text-error">*</span></span></label>
              <input type="text" class="input input-bordered w-full" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">SKU <span class="text-error">*</span></span></label>
              <label class="input-group">
                <input type="text" class="input input-bordered w-full" />
                <button class="btn btn-warning" type="button">Generate</button>
              </label>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Selling Type <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Category <span class="text-error">*</span></span></label>
              <div class="flex items-center gap-2">
                <select class="select select-bordered flex-1"><option>Select</option></select>
                <button class="btn btn-link text-warning p-0" type="button">
                  <i class="bi bi-plus-circle mr-1"></i> Add New
                </button>
              </div>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Sub Category <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Brand <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Unit <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Barcode Symbology <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Barcode Symbology</span></label>
              <select class="select select-bordered w-full"><option>Choose</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Item Barcode <span class="text-error">*</span></span></label>
              <label class="input-group">
                <input type="text" class="input input-bordered w-full" />
                <button class="btn btn-warning" type="button">Generate</button>
              </label>
            </div>
          </form>
          <div class="form-control mt-4 col-span-1 md:col-span-2">
            <label class="label"><span class="label-text">Description</span></label>
            <div class="border rounded-lg overflow-hidden">
              <div class="flex gap-1 px-2 py-1 border-b bg-gray-50">
                <button class="btn btn-ghost btn-sm" type="button"><b>B</b></button>
                <button class="btn btn-ghost btn-sm" type="button"><i>I</i></button>
                <button class="btn btn-ghost btn-sm" type="button"><u>U</u></button>
                <button class="btn btn-ghost btn-sm" type="button"><i class="bi bi-link"></i></button>
                <button class="btn btn-ghost btn-sm" type="button"><i class="bi bi-list-ul"></i></button>
                <button class="btn btn-ghost btn-sm" type="button"><i class="bi bi-list-ol"></i></button>
                <button class="btn btn-ghost btn-sm" type="button"><i class="bi bi-type"></i></button>
              </div>
              <textarea class="textarea textarea-bordered w-full border-none h-24" placeholder="Enter product description"></textarea>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Pricing & Stocks Card -->
    <div class="card bg-base-100 shadow-xl rounded-2xl mt-4 mb-6">
      <div class="card-header bg-gray-50 px-4 py-3 flex items-center rounded-t-2xl border-b border-gray-200">
        <i class="bi bi-emoji-smile text-warning mr-2 text-lg"></i>
        <b class="font-bold">Pricing & Stocks</b>
        <button
          class="btn btn-ghost ml-auto p-0"
          :aria-expanded="showFormPricing"
          aria-controls="showFormPricing"
          @click="showFormPricing = !showFormPricing"
        >
          <i
            class="bi text-xl"
            :class="showFormPricing ? 'bi-chevron-up' : 'bi-chevron-down'"
          ></i>
        </button>
      </div>
      <transition name="slide-fade">
        <div class="card-body p-4" v-show="showFormPricing" id="showFormPricing">
          <form>
            <div class="flex items-center gap-4 mb-4">
              <label class="font-semibold mb-0">Product Type <span class="text-error">*</span></label>
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <input type="radio" name="productType" class="radio radio-warning" checked />
                  <span class="label-text">Single Product</span>
                </label>
              </div>
              <div class="form-control">
                <label class="label cursor-pointer gap-2">
                  <input type="radio" name="productType" class="radio radio-warning" />
                  <span class="label-text">Variable Product</span>
                </label>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="form-control">
                <label class="label"><span class="label-text">Quantity <span class="text-error">*</span></span></label>
                <input type="number" class="input input-bordered w-full" />
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text">Price <span class="text-error">*</span></span></label>
                <input type="number" class="input input-bordered w-full" />
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text">Tax Type <span class="text-error">*</span></span></label>
                <select class="select select-bordered w-full"><option>Select</option></select>
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text">Tax <span class="text-error">*</span></span></label>
                <select class="select select-bordered w-full"><option>Select</option></select>
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text">Discount Type <span class="text-error">*</span></span></label>
                <select class="select select-bordered w-full"><option>Select</option></select>
              </div>
              <div class="form-control">
                <label class="label"><span class="label-text">Discount Value <span class="text-error">*</span></span></label>
                <input type="number" class="input input-bordered w-full" />
              </div>
            </div>
            <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="form-control">
                <label class="label"><span class="label-text">Quantity Alert <span class="text-error">*</span></span></label>
                <input type="number" class="input input-bordered w-full" />
              </div>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <!-- Images Card -->
    <div class="card bg-base-100 shadow-xl rounded-2xl mt-4 mb-6">
      <div class="card-header bg-gray-50 px-4 py-3 flex items-center rounded-t-2xl border-b border-gray-200">
        <i class="bi bi-images text-warning mr-2 text-lg"></i>
        <b class="font-bold">Images</b>
        <button
          class="btn btn-ghost ml-auto p-0"
          :aria-expanded="showImages"
          aria-controls="imagesSection"
          @click="showImages = !showImages"
        >
          <i
            class="bi text-xl"
            :class="showImages ? 'bi-chevron-up' : 'bi-chevron-down'"
          ></i>
        </button>
      </div>
      <transition name="slide-fade">
        <div v-show="showImages" class="card-body p-4" id="imagesSection">
          <div class="flex items-start gap-4 flex-wrap">
            <div
              class="flex flex-col items-center justify-center w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:border-warning hover:bg-yellow-50 transition-all cursor-pointer"
              @click="triggerInput"
            >
              <i class="bi bi-plus-circle text-2xl text-gray-500"></i>
              <span class="mt-2 text-gray-500">Add Images</span>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="onAddImage"
              />
            </div>
            <div
              v-for="(img, idx) in images"
              :key="idx"
              class="relative w-24 h-32 overflow-hidden rounded-md border"
            >
              <img :src="img" alt="product" class="w-full h-full object-cover" />
              <button
                type="button"
                class="btn btn-error btn-circle btn-xs absolute top-1 right-1"
                @click="removeImage(idx)"
              >
                <i class="bi bi-x-lg text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>

    <!-- Custom Fields Card -->
    <div class="card bg-base-100 shadow-xl rounded-2xl mt-4 mb-6">
      <div class="card-header bg-gray-50 px-4 py-3 flex items-center rounded-t-2xl border-b border-gray-200">
        <i class="bi bi-list-ul text-warning mr-2 text-lg"></i>
        <b class="font-bold">Custom Fields</b>
        <button
          class="btn btn-ghost ml-auto p-0"
          :aria-expanded="showCustomFields"
          aria-controls="customFieldsBody"
          @click="showCustomFields = !showCustomFields"
        >
          <i
            class="bi text-xl"
            :class="showCustomFields ? 'bi-chevron-up' : 'bi-chevron-down'"
          ></i>
        </button>
      </div>
      <transition name="slide-fade">
        <div v-show="showCustomFields" class="card-body p-4" id="customFieldsBody">
          <div class="bg-gray-100 rounded-lg p-4 mb-4 flex flex-wrap gap-4">
            <div class="form-control">
              <label class="label cursor-pointer gap-2">
                <input type="checkbox" class="checkbox checkbox-warning" id="warranties" />
                <span class="label-text">Warranties</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer gap-2">
                <input type="checkbox" class="checkbox checkbox-warning" id="manufacturer" />
                <span class="label-text">Manufacturer</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label cursor-pointer gap-2">
                <input type="checkbox" class="checkbox checkbox-warning" id="expiry" />
                <span class="label-text">Expiry</span>
              </label>
            </div>
          </div>
          <form class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label"><span class="label-text">Warranty <span class="text-error">*</span></span></label>
              <select class="select select-bordered w-full"><option>Select</option></select>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Manufacturer <span class="text-error">*</span></span></label>
              <input type="text" class="input input-bordered w-full" />
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Manufactured Date <span class="text-error">*</span></span></label>
              <label class="input-group">
                <input type="text" class="input input-bordered w-full" placeholder="dd/mm/yyyy" />
                <span class="btn btn-ghost"><i class="bi bi-calendar"></i></span>
              </label>
            </div>
            <div class="form-control">
              <label class="label"><span class="label-text">Expiry On <span class="text-error">*</span></span></label>
              <label class="input-group">
                <input type="text" class="input input-bordered w-full" placeholder="dd/mm/yyyy" />
                <span class="btn btn-ghost"><i class="bi bi-calendar"></i></span>
              </label>
            </div>
          </form>
        </div>
      </transition>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end mt-6 gap-2">
      <button type="button" class="btn btn-ghost">Cancel</button>
      <button type="submit" class="btn btn-warning text-white font-bold">Add Product</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showForm = ref(true)
const showFormPricing = ref(true)
const showImages = ref(true)
const showCustomFields = ref(true)

const images = ref([
  // Example image, remove or replace with actual uploads
  'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935'
])

const fileInput = ref(null)

function triggerInput() {
  fileInput.value && fileInput.value.click()
}

function onAddImage(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      images.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  }
  // Reset input so same file can be re-selected if needed
  event.target.value = ''
}

function removeImage(idx) {
  images.value.splice(idx, 1)
}
</script>

<style scoped>
/* The slide-fade transition is the only custom CSS needed.
 * This animation doesn't have a direct equivalent in Tailwind.
 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(.4,0,.2,1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  max-height: 2000px;
  opacity: 1;
  overflow: hidden;
}

/* Custom styles for image upload box to match screenshot */
.add-image-box {
  width: 120px;
  height: 160px;
  border: 2px dashed #e9ecef; /* Matches Bootstrap's border-light */
  border-radius: 8px;
  transition: border-color 0.2s, background-color 0.2s;
  background: #fafbfc; /* Matches Bootstrap's bg-light */
}
.add-image-box:hover {
  border-color: #ffc107; /* Bootstrap warning color */
  background-color: #fdf7e3; /* Light yellow hover background */
}
.image-preview {
  width: 90px;
  height: 130px;
  overflow: hidden;
  position: relative;
  margin-right: 8px; /* Equivalent to gap-2 or gap-3 in Tailwind */
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-preview img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 4px;
}
</style>
