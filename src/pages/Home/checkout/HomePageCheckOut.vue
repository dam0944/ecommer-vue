<template>
  <div class="py-8">
    <div class="mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-8">
        <!-- Order Summary -->
        <div class="border border-base-200 hover:border-primary/20 group p-6 h-fit rounded-xl bg-base-100 shadow">
          <h2 class="text-xl font-semibold mb-6">Order Summary</h2>
          <div class="space-y-4 mb-6">
            <div v-for="item in orderItems" :key="item.id" class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                  <span class="text-gray-500 text-xs">IMG</span>
                </div>
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">Qty: {{ item.quantity }}</p>
                </div>
              </div>
              <span class="font-medium">${{ item.price.toFixed(2) }}</span>
            </div>
          </div>
          <div class="border-t pt-4 space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping</span>
              <span>${{ shipping.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax</span>
              <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Checkout Form -->
        <div class="space-y-6">
          <div class="border border-base-200 hover:border-primary/20 group p-6 rounded-xl bg-base-100 shadow">
            <h2 class="text-xl font-semibold mb-6">Shipping Information</h2>
            <form @submit.prevent class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    v-model="userInfo.firstName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.firstName }"
                  />
                  <p v-if="errors.firstName" class="text-red-500 text-xs mt-1">{{ errors.firstName }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    v-model="userInfo.lastName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.lastName }"
                  />
                  <p v-if="errors.lastName" class="text-red-500 text-xs mt-1">{{ errors.lastName }}</p>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="userInfo.email"
                  type="email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.email }"
                />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  v-model="userInfo.phone"
                  type="tel"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.phone }"
                />
                <p v-if="errors.phone" class="text-red-500 text-xs mt-1">{{ errors.phone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  v-model="userInfo.address"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="{ 'border-red-500': errors.address }"
                />
                <p v-if="errors.address" class="text-red-500 text-xs mt-1">{{ errors.address }}</p>
              </div>
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    v-model="userInfo.city"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.city }"
                  />
                  <p v-if="errors.city" class="text-red-500 text-xs mt-1">{{ errors.city }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    v-model="userInfo.state"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.state }"
                  />
                  <p v-if="errors.state" class="text-red-500 text-xs mt-1">{{ errors.state }}</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    v-model="userInfo.zipCode"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :class="{ 'border-red-500': errors.zipCode }"
                  />
                  <p v-if="errors.zipCode" class="text-red-500 text-xs mt-1">{{ errors.zipCode }}</p>
                </div>
              </div>
            </form>
            <button
              @click="validateForm1"
              :disabled="!isForm1Valid"
              class="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Continue to Payment
            </button>
          </div>

          <!-- Payment Information -->
          <div v-if="showForm2" class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-xl font-semibold mb-6">Payment Information</h2>
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div class="grid grid-cols-1 gap-4">
                <button
                  @click="paymentMethod = 'qr'"
                  :class="[
                    'p-4 border-2 rounded-lg text-center transition-colors',
                    paymentMethod === 'qr' 
                      ? 'border-blue-500 bg-blue-50 text-blue-700' 
                      : 'border-gray-200 hover:border-gray-300'
                  ]"
                  type="button"
                >
                  <div class="font-medium">QR Code</div>
                  <div class="text-sm text-gray-500">Mobile payment</div>
                </button>
              </div>
            </div>
            <button
              @click="showModal = true"
              :disabled="!isPaymentValid"
              class="w-full mt-6 bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              type="button"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Payment QR Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-sm mx-auto p-8 relative">
        <button @click="showModal = false" class="absolute top-3 right-3 btn btn-ghost btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 8.586l4.95-4.95a1 1 0 111.414 1.414L11.414 10l4.95 4.95a1 1 0 01-1.414 1.414L10 11.414l-4.95 4.95a1 1 0 01-1.414-1.414L8.586 10l-4.95-4.95A1 1 0 115.05 3.636l4.95 4.95z" clip-rule="evenodd" />
          </svg>
        </button>
        <h3 class="text-xl font-bold text-center mb-4">Scan to Pay</h3>
        <div class="flex flex-col items-center">
          <div class="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
            <img src="../../../assets/qr.png" alt="QR Code" class="w-40 h-40 object-contain" />
          </div>
          <p class="text-gray-500 mb-2 text-center">Scan this QR code with your mobile payment app to complete your order.</p>
          <span class="font-semibold text-lg text-primary">Total: ${{ total.toFixed(2) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'

const orderItems = ref([
  { id: 1, name: 'Wireless Headphones', quantity: 1, price: 99.99 },
  { id: 2, name: 'Phone Case', quantity: 2, price: 24.99 },
  { id: 3, name: 'USB Cable', quantity: 1, price: 19.99 }
])

const shipping = ref(9.99)
const taxRate = ref(0.08)

const subtotal = computed(() => 
  orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
)
const tax = computed(() => subtotal.value * taxRate.value)
const total = computed(() => subtotal.value + shipping.value + tax.value)

const userInfo = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})
const errors = reactive({})
const showForm2 = ref(false)

const isForm1Valid = computed(() => {
  return userInfo.firstName && 
         userInfo.lastName && 
         userInfo.email && 
         userInfo.phone && 
         userInfo.address && 
         userInfo.city && 
         userInfo.state && 
         userInfo.zipCode
})

const validateForm1 = () => {
  Object.keys(errors).forEach(key => delete errors[key])
  if (!userInfo.firstName) errors.firstName = 'First name is required'
  if (!userInfo.lastName) errors.lastName = 'Last name is required'
  if (!userInfo.email) errors.email = 'Email is required'
  if (!userInfo.phone) errors.phone = 'Phone is required'
  if (!userInfo.address) errors.address = 'Address is required'
  if (!userInfo.city) errors.city = 'City is required'
  if (!userInfo.state) errors.state = 'State is required'
  if (!userInfo.zipCode) errors.zipCode = 'ZIP code is required'
  if (userInfo.email && !/\S+@\S+\.\S+/.test(userInfo.email)) {
    errors.email = 'Please enter a valid email'
  }
  if (Object.keys(errors).length === 0) {
    showForm2.value = true
  }
}

const paymentMethod = ref('qr')
const isPaymentValid = computed(() => paymentMethod.value === 'qr')
const showModal = ref(false)
</script>