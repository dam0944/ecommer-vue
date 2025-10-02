<template>
  <div class="flex flex-col h-full bg-base-100 text-base-content">
    <div class="flex items-center justify-between p-4 border-b border-base-200">
      <h2 class="text-xl font-bold">My Cart</h2>
      <label htmlFor="my-drawer-4" aria-label="close sidebar" class="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </label>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      <div v-if="cartItems.length === 0" class="text-center text-base-content/60 py-8">
        Your cart is empty.
      </div>
      <div v-else v-for="(item, index) in cartItems" :key="item.id" class="flex items-center gap-4">
        <div class="relative w-20 h-20 flex-shrink-0">
          <img :src="item.image" :alt="item.name" class="w-full h-full object-cover rounded-lg" />
          <button @click="removeItem(index)" class="btn btn-xs btn-circle absolute -top-2 -left-2 bg-base-300 text-base-content">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-base-content">{{ item.name }}</h3>
          <p v-if="item.variant" class="text-sm text-base-content/70">{{ item.variant }}</p>
          <div class="flex items-center justify-between mt-1">
            <span class="font-bold text-base-content">${{ item.price.toFixed(2) }} USD</span>
            <div class="flex items-center gap-1 border border-base-300 rounded-full">
              <button @click="updateQuantity(index, -1)" class="btn btn-xs btn-ghost rounded-full">-</button>
              <span class="text-sm font-medium text-base-content">{{ item.quantity }}</span>
              <button @click="updateQuantity(index, 1)" class="btn btn-xs btn-ghost rounded-full">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="p-4 border-t border-base-200 space-y-2">
      <div class="flex justify-between text-sm text-base-content/80">
        <span>Taxes</span>
        <span>${{ taxes.toFixed(2) }} USD</span>
      </div>
      <div class="flex justify-between text-sm text-base-content/80">
        <span>Shipping</span>
        <span>Calculated at checkout</span>
      </div>
      <div class="flex justify-between text-lg font-bold text-base-content pt-2">
        <span>Total</span>
        <span>${{ total.toFixed(2) }} USD</span>
      </div>
      <button class="btn btn-primary w-full mt-4">Proceed to Checkout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const cartItems = ref([
  { id: 1, name: 'Acme Cap', image: '/placeholder.svg?height=80&width=80', price: 20.00, quantity: 1 },
  { id: 2, name: 'Acme Hoodie', image: '/placeholder.svg?height=80&width=80', price: 40.00, quantity: 1, variant: 'XS' },
]);

const taxes = computed(() => {
  // For simplicity, taxes are 0 as per the image.
  // In a real app, this would be calculated based on items and location.
  return 0.00;
});

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

const total = computed(() => {
  return subtotal.value + taxes.value; // Shipping is calculated at checkout, so not added here
});

const updateQuantity = (index, delta) => {
  const newQuantity = cartItems.value[index].quantity + delta;
  if (newQuantity > 0) {
    cartItems.value[index].quantity = newQuantity;
  } else if (newQuantity === 0) {
    removeItem(index);
  }
};

const removeItem = (index) => {
  cartItems.value.splice(index, 1);
};
</script>

<style scoped>
/* No additional custom styles needed beyond Tailwind and DaisyUI */
</style>
