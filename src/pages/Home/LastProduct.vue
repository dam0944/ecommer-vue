<template>
  <div class="py-6 px-4">
    <div class="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
      <!-- Deal of the Day -->
      <div class="w-full max-w-sm p-6 flex flex-col items-center bg-base-100 border border-base-300 ">
        <div class="text-blue-600 font-semibold text-lg mb-6 text-center">DEAL OF THE DAY</div>
        <div class="rounded-sm flex items-center justify-center min-h-[200px] min-w-[200px]">
          <img src="https://tse4.mm.bing.net/th/id/OIP.NmTpBTvLbIoVBieimrCffQHaE0?pid=Api&P=0&h=220" alt="Galaxy Z Flip7" class="w-full bg-gray-500 h-full" />
        </div>
        <div class="text-xl font-semibold text-center mb-1">Galaxy Z Flip7</div>
        <div class="text-blue-700 text-2xl font-bold mb-4 text-center">$1,299.00</div>
        <button class="btn font-semibold rounded-sm px-8 py-2 transition mt-2 w-full">
          BUY NOW
        </button>
      </div>

      <!-- Latest Products -->
      <div class="flex-1 flex flex-col min-w-0">
        <div class="flex justify-between items-center mb-3">
          <h2 class="text-2xl font-bold text-gray-900">Latest Products</h2>
          <a href="#" class="text-blue-600 hover:underline font-medium text-base flex items-center gap-1">
            View All <span>&#8594;</span>
          </a>
        </div>

        <div class="grid grid-cols-2 card bg-base-100 md:grid-cols-3 xl:grid-cols-4 gap-4">
          <div v-for="(product, i) in products" :key="product.name + i" class="bg-base-100 rounded-sm flex flex-col items-center px-2 py-6 min-h-[220px] border border-base-300 transition">
            <div class="bg-base-100 rounded-sm h-[92px] w-full flex items-center justify-center mb-3">
              <img v-if="product.img" :src="product.img" :alt="product.name" class="max-w-[80px] max-h-[80px] object-contain" />
              <div v-else class="w-[80px] h-[80px] bg-gray-200 rounded-lg"></div>
            </div>
            <div class="text-base-content font-medium text-center min-h-[44px] flex items-center justify-center mb-1">{{ product.name }}</div>
            <div class="text-blue-700 text-lg font-bold text-center">${{ product.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const products = [
  {
    name: "Tecno Megapad 11",
    img: "https://tse1.mm.bing.net/th/id/OIP.RPJWLY48iO1l11_1mS_HpwHaFj?pid=Api&P=0&h=220",
    price: "189.00",
  },
  {
    name: "Honor Pad X9a",
    img: "https://tse3.mm.bing.net/th/id/OIP.cCsHrYZJUpsezBKOLaMY6gHaEK?pid=Api&P=0&h=220",
    price: "2xx.xx",
  },
  {
    name: "Tecno Spark Go 2",
    img: "https://tse3.mm.bing.net/th/id/OIP.XpryMDSH8NAJCHLAWSJRrgHaHZ?pid=Api&P=0&h=220",
    price: "79.00",
  },
  {
    name: "Huawei Watch 5",
    img: "https://tse4.mm.bing.net/th/id/OIP.xQ7eMkR18qI4tvBhfeRonAHaHa?pid=Api&P=0&h=220",
    price: "399.00",
  },
  {
    name: "Xiaomi Redmi Note 14 Pro 5G",
    img: "https://tse1.mm.bing.net/th/id/OIP.fu0UQcb11jLJgvmmDjFWKQHaHa?pid=Api&P=0&h=220",
    price: "274.00",
  },
  {
    name: "Oppo Pad SE",
    img: "https://tse2.mm.bing.net/th/id/OIP.k9vEOVihn1Z7AzBehhtKcAHaIW?pid=Api&P=0&h=220",
    price: "199.00",
  },
  {
    name: "Xiaomi Redmi 13",
    img: "https://tse2.mm.bing.net/th/id/OIP.QmWVfDCK5B7Xq_bzgKorDgHaHa?pid=Api&P=0&h=220",
    price: "105.00",
  },
  {
    name: "Xiaomi Redmi 14C",
    img: "https://tse3.mm.bing.net/th/id/OIP.fUtX3bOirle8fAB903PV3gHaHa?pid=Api&P=0&h=220",
    price: "119.00",
  },
];
</script>