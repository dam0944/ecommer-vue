<template>
  <div class="bg-base-100 rounded-sm p-6 card">
    <div class="font-semibold mb-2 text-base-content">More From The Store</div>
    <div class="space-y-3">
      <div
        v-for="item in items"
        :key="item.title + item.newPrice"
        class="flex items-center gap-3 p-2 border border-base-200 rounded-lg hover:bg-base-100 transition"
      >
        <span class="bg-primary text-primary-content text-xs font-bold px-2 py-0.5 rounded">
          {{ item.discount }}
        </span>
        <img :src="item.img" class="rounded w-[60px] h-[60px] object-cover" :alt="item.title" />
        <div>
          <div class="text-sm font-medium truncate max-w-[140px] text-base-content">{{ item.title }}</div>
          <div class="text-xs text-base-content/40 line-through">{{ item.oldPrice }}</div>
          <div class="text-sm font-bold text-base-content">{{ item.newPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const items = [
  {
    title: 'ASUS TUF Gaming VG34VQL3A',
    oldPrice: '$399.00',
    newPrice: '$349.00',
    discount: '$50.00',
    img: 'https://tse1.mm.bing.net/th/id/OIP.48Psf53_0mbCuD-vcY_8JAHaEL?pid=Api&P=0&h=220',
  },
  {
    title: 'ROG Swift OLED PG49WCD',
    oldPrice: '$1,699.00',
    newPrice: '$1,599.00',
    discount: '$100.00',
    img: 'https://tse1.mm.bing.net/th/id/OIP.13cqi4Q-P31HvsQ4we8V3QHaD4?pid=Api&P=0&h=220',
  },
  {
    title: 'ROG Swift OLED PG49WCD',
    oldPrice: '$1,699.00',
    newPrice: '$1,599.00',
    discount: '$100.00',
    img: 'https://tse1.mm.bing.net/th/id/OIP.13cqi4Q-P31HvsQ4we8V3QHaD4?pid=Api&P=0&h=220',
  },
  {
    title: 'ASUS ProArt PA32UCX-PK',
    oldPrice: '$3,999.00',
    newPrice: '$3,499.00',
    discount: '$500.00',
    img: 'https://tse1.mm.bing.net/th/id/OIP.4b2a8f7c5d6e4f0c9b5c8f8f8f8f8f8f?pid=Api&P=0&h=220',
  },
  {
    title: 'ASUS ProArt PA32UCX-PK',
    oldPrice: '$3,999.00',
    newPrice: '$3,499.00',
    discount: '$500.00',
    img: 'https://tse1.mm.bing.net/th/id/OIP.4b2a8f7c5d6e4f0c9b5c8f8f8f8f8f8f?pid=Api&P=0&h=220',
  },
];
</script>