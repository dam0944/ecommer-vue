<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">

    <!-- Best Sellings -->
    <div>
      <div class="bg-base-100 min-h-[340px] rounded-sm border border-base-300 p-2.5 flex flex-col">
        <div class="p-4 flex-1 flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center">
              <span class="text-3xl mr-2 text-warning">
                <i class="bi bi-trophy-fill"></i>
              </span>
              <span class="font-semibold text-lg text-base-content">Best sellings</span>
            </div>
            <a href="#" class="link link-primary font-semibold flex items-center hover:underline">
              View All <i class="bi bi-chevron-right text-xs ml-1"></i>
            </a>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="item in bestSellings" :key="item.id">
              <div class="flex items-center gap-3 rounded-sm px-1 py-1.5 min-h-[78px] border border-base-300 transition-colors">
                <div class="flex flex-col items-center justify-center relative w-16 min-w-16 h-16">
                  <img :src="item.img" :alt="item.title" class="max-w-16 max-h-16 object-contain rounded-md bg-base-100" />
                  <div v-if="item.brand || item.warranty" class="absolute left-0 -bottom-5 w-full text-center text-xs whitespace-nowrap leading-tight">
                    <small v-if="item.brand" class="text-base-content/60">{{ item.brand }}</small>
                    <small v-if="item.warranty" class="text-base-content/40 block">{{ item.warranty }}</small>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-base-content truncate mb-0.5">{{ item.title }}</div>
                  <div class="text-primary font-bold">${{ item.price.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Rated -->
    <div>
      <div class="bg-base-100 min-h-[340px] rounded-sm border border-base-300 p-2.5 flex flex-col">
        <div class="p-4 flex-1 flex flex-col">
          <div class="flex justify-between items-center mb-3">
            <div class="flex items-center">
              <span class="text-3xl mr-2 text-error">
                <i class="bi bi-award-fill"></i>
              </span>
              <span class="font-semibold text-lg text-base-content">Top rated</span>
            </div>
            <a href="#" class="link link-primary font-semibold flex items-center hover:underline">
              View All <i class="bi bi-chevron-right text-xs ml-1"></i>
            </a>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="item in topRated" :key="item.id">
              <div class="flex items-center gap-3 rounded-sm px-1 py-1.5 min-h-[78px] border border-base-300 transition-colors">
                <div class="flex flex-col items-center justify-center relative w-16 min-w-16 h-16">
                  <img :src="item.img" :alt="item.title" class="max-w-16 max-h-16 object-contain rounded-sm" />
                  <div v-if="item.brand || item.warranty" class="absolute left-0 -bottom-5 w-full text-center text-xs whitespace-nowrap leading-tight">
                    <small v-if="item.brand" class="text-base-content/60">{{ item.brand }}</small>
                    <small v-if="item.warranty" class="text-base-content/40 block">{{ item.warranty }}</small>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-base-content truncate mb-0.5">{{ item.title }}</div>
                  <div class="text-primary font-bold">${{ item.price.toLocaleString() }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ProductMini {
  id: number
  title: string
  price: number
  img: string
  brand?: string
  warranty?: string
}

const bestSellings: ProductMini[] = [
  {
    id: 1,
    title: 'Dell Vostro 3520 (i3®)',
    price: 349,
    img: 'https://tse4.mm.bing.net/th/id/OIP.lm4qE0seFx9pbb9nQBn2dgHaHa?pid=Api&P=0&h=220',
    brand: 'DELL',
    warranty: '1 Year Warranty'
  },
  {
    id: 2,
    title: 'Asus ZenBook S16 OLED',
    price: 1299,
    img: 'https://tse2.mm.bing.net/th/id/OIP.gN6EuXCnvoHsfXjp4nDyWwHaHa?pid=Api&P=0&h=220',
    brand: 'ASUS',
    warranty: '3 Year Warranty'
  },
  {
    id: 3,
    title: 'Huawei Watch Band 9',
    price: 49,
    img: 'https://tse3.mm.bing.net/th/id/OIP.mRqxOrQ9e7s5TDW0sX6jLQHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 4,
    title: 'Gimbal 3Axis Handheld',
    price: 59,
    img: 'https://tse2.mm.bing.net/th/id/OIP.i65ZvBABgl1h-jiw4kFzugHaHa?pid=Api&P=0&h=220',
    brand: 'A2045',
  },
  {
    id: 5,
    title: 'iPhone 16 Pro',
    price: 1009,
    img: 'https://tse2.mm.bing.net/th/id/OIP.26BTLmqIr5wvgVH2n6QWhAHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 6,
    title: 'Lightning To HDMI UA15',
    price: 15,
    img: 'https://tse1.mm.bing.net/th/id/OIP.zh3wh2IrlTZVDBxPD6OOEAHaHZ?pid=Api&P=0&h=220',
  }
]

const topRated: ProductMini[] = [
   {
    id: 1,
    title: 'Dell Vostro 3520 (i3®)',
    price: 349,
    img: 'https://tse4.mm.bing.net/th/id/OIP.lm4qE0seFx9pbb9nQBn2dgHaHa?pid=Api&P=0&h=220',
    brand: 'DELL',
    warranty: '1 Year Warranty'
  },
  {
    id: 2,
    title: 'Asus ZenBook S16 OLED',
    price: 1299,
    img: 'https://tse2.mm.bing.net/th/id/OIP.gN6EuXCnvoHsfXjp4nDyWwHaHa?pid=Api&P=0&h=220',
    brand: 'ASUS',
    warranty: '3 Year Warranty'
  },
  {
    id: 3,
    title: 'Huawei Watch Band 9',
    price: 49,
    img: 'https://tse3.mm.bing.net/th/id/OIP.mRqxOrQ9e7s5TDW0sX6jLQHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 4,
    title: 'Gimbal 3Axis Handheld',
    price: 59,
    img: 'https://tse2.mm.bing.net/th/id/OIP.i65ZvBABgl1h-jiw4kFzugHaHa?pid=Api&P=0&h=220',
    brand: 'A2045',
  },
  {
    id: 5,
    title: 'iPhone 16 Pro',
    price: 1009,
    img: 'https://tse2.mm.bing.net/th/id/OIP.26BTLmqIr5wvgVH2n6QWhAHaHa?pid=Api&P=0&h=220',
  },
  {
    id: 6,
    title: 'Lightning To HDMI UA15',
    price: 15,
    img: 'https://tse1.mm.bing.net/th/id/OIP.zh3wh2IrlTZVDBxPD6OOEAHaHZ?pid=Api&P=0&h=220',
  }
]
</script>