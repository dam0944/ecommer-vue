<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Order Summary -->
        <div class="bg-white rounded-lg p-6">
          <h2 class="text-xl font-semibold mb-6">Order Summary</h2>
          
          <div class="space-y-4 mb-6">
            <div v-for="item in orderItems" :key="item.id" class="flex items-center space-x-4">
              <div class="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs font-medium">
                IMG
              </div>
              <div class="flex-1">
                <h3 class="font-medium">{{ item.name }}</h3>
                <p class="text-sm text-gray-600">Qty: {{ item.quantity }}</p>
              </div>
              <div class="font-medium">${{ item.price.toFixed(2) }}</div>
            </div>
          </div>

          <div class="border-t pt-4 space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-blue-600">
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

        <!-- Forms Container -->
        <div class="bg-white rounded-lg shadow-md p-6">
          <!-- Progress Indicator -->
          <div class="mb-8">
            <div class="flex items-center">
              <div class="flex items-center">
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium', 
                             currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-green-600 text-white']">
                  {{ currentStep === 1 ? '1' : '✓' }}
                </div>
                <span class="ml-2 text-sm font-medium">Shipping</span>
              </div>
              <div class="flex-1 h-px bg-gray-300 mx-4"></div>
              <div class="flex items-center">
                <div :class="['w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                             currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600']">
                  2
                </div>
                <span class="ml-2 text-sm font-medium">Payment</span>
              </div>
            </div>
          </div>

          <!-- Form 1: Shipping Information -->
          <div v-if="currentStep === 1">
            <h2 class="text-xl font-semibold mb-6">Shipping Information</h2>
            
            <form @submit.prevent="proceedToPayment" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    v-model="shippingInfo.firstName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    v-model="shippingInfo.lastName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  v-model="shippingInfo.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  v-model="shippingInfo.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  v-model="shippingInfo.address"
                  type="text"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    v-model="shippingInfo.city"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    v-model="shippingInfo.state"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                  <input
                    v-model="shippingInfo.zipCode"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                :disabled="!isForm1Valid"
                class="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          <!-- Form 2: Payment Information -->
          <div v-else-if="currentStep === 2">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-semibold">Payment Information</h2>
              <button
                @click="backToShipping"
                class="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ← Back to Shipping
              </button>
            </div>

            <form @submit.prevent="completeOrder" class="space-y-6">
              <!-- Payment Method Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                <div class="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    @click="paymentMethod = 'card'"
                    :class="['p-4 border-2 rounded-lg text-center transition-colors',
                             paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400']"
                  >
                    <div class="font-medium">Credit Card</div>
                    <div class="text-sm text-gray-600">Visa, Mastercard, etc.</div>
                  </button>
                  <button
                    type="button"
                    @click="paymentMethod = 'qr'"
                    :class="['p-4 border-2 rounded-lg text-center transition-colors',
                             paymentMethod === 'qr' ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-gray-400']"
                  >
                    <div class="font-medium">QR Code</div>
                    <div class="text-sm text-gray-600">Mobile payment</div>
                  </button>
                </div>
              </div>

              <!-- Credit Card Form -->
              <div v-if="paymentMethod === 'card'" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                  <input
                    v-model="cardInfo.number"
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      v-model="cardInfo.expiry"
                      type="text"
                      placeholder="MM/YY"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                    <input
                      v-model="cardInfo.cvv"
                      type="text"
                      placeholder="123"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    v-model="cardInfo.name"
                    type="text"
                    placeholder="John Doe"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                class="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Complete Order • ${{ total.toFixed(2) }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Step management
const currentStep = ref(1)

// Order data
const orderItems = ref([
  { id: 1, name: 'Wireless Headphones', quantity: 1, price: 99.99 },
  { id: 2, name: 'Phone Case', quantity: 1, price: 24.99 },
  { id: 3, name: 'USB Cable', quantity: 1, price: 19.99 }
])

const shipping = ref(5.99)
const taxRate = ref(0.08)

// Form data
const shippingInfo = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

const paymentMethod = ref('card')
const cardInfo = ref({
  number: '',
  expiry: '',
  cvv: '',
  name: ''
})

// Computed properties
const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0)
})

const tax = computed(() => {
  return subtotal.value * taxRate.value
})

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value
})

const isForm1Valid = computed(() => {
  return Object.values(shippingInfo.value).every(value => value.trim() !== '')
})

// Methods
const proceedToPayment = () => {
  if (isForm1Valid.value) {
    currentStep.value = 2
  }
}

const backToShipping = () => {
  currentStep.value = 1
}

const completeOrder = () => {
  alert(`Order completed! Total: $${total.value.toFixed(2)}`)
}
</script>