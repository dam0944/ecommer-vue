<template>
  <div class="bg-white p-8 sm:p-10 md:p-12 lg:p-16 max-w-3xl mx-auto rounded-xl border border-gray-100">
    <h2 class="text-3xl font-extrabold text-gray-900 mb-10 uppercase tracking-wide text-center">
      YOUR ORDER
    </h2>

    <div class="overflow-x-auto mb-10">
      <table class="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col" class="px-4 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              PRODUCT
            </th>
            <th scope="col" class="px-4 py-4 text-right text-sm font-semibold text-gray-600 uppercase tracking-wider">
              SUBTOTAL
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-for="(product, index) in products" :key="index">
            <td class="px-4 py-5 whitespace-nowrap">
              <div class="flex items-center gap-4">
                <div class="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border border-gray-200">
                  <img :src="product.image" :alt="product.name" class="object-cover w-full h-full" />
                </div>
                <div>
                  <div class="font-semibold text-gray-800 text-lg">
                    {{ product.name }}
                  </div>
                  <div class="flex items-center gap-3 mt-3">
                    <button
                      @click="updateQuantity(index, -1)"
                      class="w-8 h-8 flex items-center justify-center text-sm border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 transition-colors duration-200 disabled:opacity-50"
                      :aria-label="`Decrease quantity of ${product.name}`"
                      :disabled="product.quantity <= 1"
                    >
                      −
                    </button>
                    <span class="text-gray-800 text-base font-medium" aria-live="polite" aria-atomic="true">
                      {{ product.quantity }}
                    </span>
                    <button
                      @click="updateQuantity(index, 1)"
                      class="w-8 h-8 flex items-center justify-center text-sm border border-gray-300 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 transition-colors duration-200"
                      :aria-label="`Increase quantity of ${product.name}`"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-5 whitespace-nowrap text-right text-gray-800 font-bold text-lg">
              {{ currency.format(product.price * product.quantity) }}
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="2" class="px-4 py-6 text-center text-sm text-gray-600">
              Your cart is empty.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="space-y-6 text-gray-800">
      <div class="flex justify-between items-center border-t border-gray-200 pt-6">
        <span class="font-semibold text-lg">Subtotal</span>
        <span class="font-bold text-emerald-600 text-xl">{{ currency.format(subtotal) }}</span>
      </div>

      <div class="flex justify-between items-start">
        <span class="font-semibold text-lg">Shipping</span>
        <div class="text-right space-y-3">
          <label class="flex items-center justify-end gap-3 cursor-pointer">
            <span class="text-gray-700 text-base">
              Flat rate:
              <span :class="{'text-emerald-600 font-semibold': selectedShipping === 'flat'}">
                {{ currency.format(shippingOptions.flatRate) }}
              </span>
            </span>
            <input
              type="radio"
              name="shipping"
              class="h-5 w-5 rounded-full border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
              value="flat"
              v-model="selectedShipping"
              aria-label="Flat rate shipping"
            />
          </label>

          <label class="flex items-center justify-end gap-3 cursor-pointer">
            <span class="text-gray-700 text-base">
              Local pickup:
              <span :class="{'text-emerald-600 font-semibold': selectedShipping === 'local'}">
                {{ currency.format(shippingOptions.localPickup) }}
              </span>
            </span>
            <input
              type="radio"
              name="shipping"
              class="h-5 w-5 rounded-full border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
              value="local"
              v-model="selectedShipping"
              aria-label="Local pickup shipping"
            />
          </label>
        </div>
      </div>

      <div class="flex justify-between items-center border-t border-gray-200 pt-6">
        <span class="text-2xl font-bold">Total</span>
        <span class="text-2xl font-bold text-emerald-700">{{ currency.format(total) }}</span>
      </div>
    </div>

    <div class="my-10 border-t border-gray-200"></div>

    <div class="space-y-5">
       Payment Methods 
      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          class="h-5 w-5 rounded-full border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
          value="bank"
          v-model="selectedPayment"
          aria-label="Direct bank transfer"
        />
        <span class="text-gray-800 text-base">Direct bank transfer</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          class="h-5 w-5 rounded-full border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
          value="cheque"
          v-model="selectedPayment"
          aria-label="Cheque payment"
        />
        <span class="text-gray-800 text-base">Cheque Payment</span>
      </label>

      <label class="flex items-center gap-3 cursor-pointer">
        <input
          type="radio"
          name="payment"
          class="h-5 w-5 rounded-full border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
          value="cash"
          v-model="selectedPayment"
          aria-label="Cash on delivery"
        />
        <span class="text-gray-800 text-base">Cash on delivery</span>
      </label>

      <div class="flex flex-col">
        <label class="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            class="h-5 w-5 rounded-full border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
            value="paypal"
            v-model="selectedPayment"
            aria-label="Pay with PayPal"
          />
          <span class="text-gray-800 flex items-center gap-2 text-base">
            PayPal
            <img
              src=""
              alt="PayPal, Visa, Mastercard logos"
              class="h-5 w-auto"
            />
            <a href="#" class="text-emerald-700 hover:underline text-sm font-medium">What is PayPal?</a>
          </span>
        </label>

        <div
          v-if="selectedPayment === 'paypal'"
          class="bg-emerald-50 text-emerald-900 text-sm mt-4 p-4 rounded-lg border border-emerald-200"
        >
          Pay via PayPal; you can pay with your credit card if you don't have a PayPal account.
          <span class="font-bold"> SANDBOX ENABLED.</span>
          You can use sandbox testing accounts only. See the
          <a href="#" class="text-emerald-700 hover:underline font-semibold">PayPal Sandbox Testing Guide</a>
          for more details.
        </div>
      </div>
    </div>

    <div class="my-10 border-t border-gray-200"></div>

    <p class="text-sm text-gray-600 mb-6 leading-relaxed">
      Your personal data will be used to process your order, support your experience throughout this website, and for
      other purposes described in our
      <a href="#" class="text-emerald-700 hover:underline font-medium">privacy policy</a>.
    </p>

    <label class="flex items-center gap-3 mb-8 cursor-pointer">
      <input
        type="checkbox"
        class="h-5 w-5 rounded border border-gray-300 checked:bg-emerald-600 checked:border-transparent focus:ring-emerald-600 focus:ring-offset-2 transition-colors duration-200"
        v-model="termsAccepted"
        aria-label="Agree to terms and conditions"
      />
      <span class="text-gray-800 text-base">
        I have read and agree to the website terms and conditions
        <span class="text-red-500">*</span>
      </span>
    </label>

    <button
      class="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-bold text-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
      :disabled="!termsAccepted || products.length === 0"
      @click="proceedToPayPal"
    >
      PROCEED TO PAYPAL
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

type Product = {
  name: string
  price: number
  quantity: number
  image: string
}

const products = ref<Product[]>([
  { name: 'Secure camera', price: 210.0, quantity: 2, image: '/placeholder.svg?height=80&width=80' },
  { name: 'Riructor quis', price: 159.0, quantity: 1, image: '/placeholder.svg?height=80&width=80' },
])

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

const shippingOptions = {
  flatRate: 20.0,
  localPickup: 25.0,
}

const selectedShipping = ref<'flat' | 'local'>('flat') // Default to flat rate
const selectedPayment = ref<'bank' | 'cheque' | 'cash' | 'paypal'>('bank') // Default to direct bank transfer
const termsAccepted = ref(false)

const subtotal = computed(() => products.value.reduce((sum, p) => sum + p.price * p.quantity, 0))
const shippingCost = computed(() => (selectedShipping.value === 'flat' ? shippingOptions.flatRate : shippingOptions.localPickup))
const total = computed(() => subtotal.value + shippingCost.value)

function updateQuantity(index: number, delta: number) {
  const item = products.value[index]
  const next = item.quantity + delta
  if (next < 1) return
  item.quantity = next
}

function proceedToPayPal() {
  if (!termsAccepted.value || products.value.length === 0) return
  // Simulate submission
  // In a real app, call your checkout API here.
  console.log('Proceeding to PayPal with:', {
    items: products.value,
    shipping: selectedShipping.value,
    payment: selectedPayment.value,
    subtotal: subtotal.value,
    total: total.value,
  })
  alert('Redirecting to PayPal (sandbox)...')
}
</script>

<style scoped>
/* Tailwind handles styling */
</style>