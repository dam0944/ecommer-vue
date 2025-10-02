<template>
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 my-16  w-max mx-auto">
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-t-0 border-l-0"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-t-0 border-x-0 md:border-r"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden md:flex md:border-t-0 md:border-x-0 lg:border-r"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden lg:block lg:border-x-0 lg:border-t-0"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden xl:block xl:border-t-0 xl:border-r-0"></div>

    <div
      v-for="(item, i) in items"
      :key="i"
      class="hover:bg-slate-50 flex items-center justify-center h-16 w-44 sm:w-60 sm:h-20 border border-slate-200"
    >
      <img :src="item.image" alt="" class="w-[70%] h-[70%] object-contain"/>
    </div>

    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden xl:block xl:border-y-0 xl:border-l-0"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden lg:block lg:border-y-0 lg:border-l-0"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 hidden md:block md:border-l-0 md:border-y-0"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-x-0 border-y-0 border-r xl:border-r-0"></div>
    <div class="hover:bg-slate-50 h-16 w-44 sm:w-60 sm:h-20 border border-slate-200 border-x-0 border-y-0 xl:border-l"></div>
</div>
    
</template>
<script setup>
    import {ref} from "vue"
    const items=ref([
        {
            image:"https://cdn.worldvectorlogo.com/logos/lenovo-1.svg",
        },
        {
            image:"https://cdn.worldvectorlogo.com/logos/asus-4.svg",
        },
        {
            image:"https://cdn.worldvectorlogo.com/logos/dell-2.svg",
        },
        {
            image:"https://cdn.worldvectorlogo.com/logos/asus-rog-1-1.svg",
        },
        {
            image:"https://img.icons8.com/?size=80&id=oOaQa2nsHmDV&format=png",
        },
        {
            image:"https://cdn.worldvectorlogo.com/logos/msi-gaming.svg",   
        },
        {
            image:"https://img.icons8.com/?size=48&id=doXmogC0imya&format=png",
        },
        {
            image:"https://img.icons8.com/?size=48&id=wGYgIlqPWdC2&format=png",
        },
        {
            image: "https://img.icons8.com/?size=48&id=V5cGWnc9R4xj&format=png",
        },
        {
            image:"https://img.icons8.com/?size=50&id=30840&format=png",
        }
    ])
</script>