<template>
  <div class="dashboard-container container mx-auto py-4 font-khmer bg-base-100">
    <div class="grid grid-cols-2  lg:grid-cols-4 gap-4 mb-4">
      <div v-for="(card, idx) in summaryCards" :key="card.label">
        <div class="card bg-base-content/50 text-white overflow-hidden rounded-sm transition-shadow"
          :class="card.theme">
          <div class="card-body flex items-center gap-3 w-full md:p-6">
            <div class="w-[50px] h-[50px] bg-white bg-opacity-10 rounded-full flex items-center justify-center">
              <i :class="card.icon" class="text-2xl"></i>
            </div>
            <div>
              <div class="text-xl font-bold">{{ card.value }}</div>
              <div class="text-sm opacity-90">{{ card.label }}</div>
            </div>
          </div>
          <div class="w-full px-3 pb-3">
            <canvas :id="`summaryChart${idx}`" class="w-full max-w-full h-10"></canvas>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <div v-for="(stat, idx) in statCards" :key="stat.label">
        <div class="card  text-white bg-base-content/50 overflow-hidden rounded-sm"
          :class="stat.theme">
          <div class="card-body relative w-full p-4 md:p-6">
            <div class="text-xl font-bold">{{ stat.value }}</div>
            <div class="text-sm mb-2 opacity-90">{{ stat.label }}</div>
            <i :class="stat.icon" class="text-2xl absolute bg-base-content/50 top-3 right-3 opacity-25"></i>
            <div class="mt-3">
              <canvas :id="`statChart${idx}`" class="w-full max-w-full h-8"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="col-span-1 lg:col-span-2">
        <div class="card border border-gray-100 h-full rounded-sm">
          <div class="card-body p-4 md:p-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-2xl font-bold text-[#222]">ការទិញ និង លក់</span>
              <div class="flex items-center gap-2">
                <div class="btn btn-sm badge-success text-base-content">លក់</div>
                <div class="btn btn-sm btn-primary text-base-200">ទិញ</div>
                <select class="select select-sm select-bordered w-auto">
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
              </div>
            </div>
            <div class="w-full h-[180px] md:h-[230px] pt-1 pb-4">
              <canvas id="mainChart" class="w-full h-full max-w-full"></canvas>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1">
        <div class="card h-full rounded-sm border border-gray-100 ">
          <div class="card-body p-4 md:p-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-2xl font-bold text-[#222]">ផលិតផលថ្មីៗ</span>
              <a href="#" class="link link-hover text-sm">មើលបន្ថែម</a>
            </div>
            <div class="overflow-x-auto">
              <table class="table table-compact w-full text-base">
                <thead>
                  <tr class="bg-[#f2f5f9] text-[#222]">
                    <th class="font-black">#</th>
                    <th class="font-black">ផលិតផល</th>
                    <th class="font-black text-right">តម្លៃ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, idx) in products" :key="product.name" class="hover:bg-[#f7f9fb] transition-colors duration-150">
                    <td>{{ idx + 1 }}</td>
                    <td class="flex items-center gap-2">
                      <img :src="product.img" :alt="product.name" width="24" height="24" class="rounded" />
                      <span>{{ product.name }}</span>
                    </td>
                    <td class="text-right">${{ product.price }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import {
  Chart,
  LinearScale,
  CategoryScale,
  LineController,
  BarController,
  LineElement,
  PointElement,
  BarElement
} from 'chart.js';

Chart.register(LinearScale, CategoryScale, LineController, BarController, LineElement, PointElement, BarElement);

const summaryCards = [
  { value: "$307144", label: "បំណុលទិញសរុប", icon: "fas fa-shopping-bag", theme: "bg-warning" },
  { value: "$4385", label: "បំណុលលក់សរុប", icon: "fas fa-money-bill-wave", theme: "bg-success" },
  { value: "$385656.5", label: "ចំណូលលក់សរុប", icon: "fas fa-arrow-down", theme: "bg-info" },
  { value: "$40000", label: "ចំណាយសរុប", icon: "fas fa-arrow-up", theme: "bg-danger" },
];

const statCards = [
  { value: 100, label: "អតិថិជន", icon: "fas fa-user", theme: "bg-warning", fab: false },
  { value: 110, label: "អ្នកផ្គត់ផ្គង់", icon: "fas fa-user-check", theme: "bg-primary", fab: false },
  { value: 150, label: "វិក្កយបត្រទិញ", icon: "fas fa-file-invoice", theme: "bg-base-300", fab: false },
  { value: 170, label: "វិក្កយបត្រលក់", icon: "fas fa-file-alt", theme: "bg-success", fab: true },
];

const products = [
  { name: "កុំព្យូទ័រ Lenovo ជំនាន់ទី 3", img: "https://img.icons8.com/color/36/000000/laptop.png", price: "12500" },
  { name: "កាស Bold V3.2", img: "https://img.icons8.com/color/36/000000/headphones.png", price: "1600" },
  { name: "ស្បែកជើង Nike Jordan", img: "https://img.icons8.com/color/36/000000/nike.png", price: "2000" },
  { name: "នាឡិកា Apple Series 5", img: "https://img.icons8.com/color/36/000000/apple-watch.png", price: "800" },
];

onMounted(() => {
  if (!window.Chart) {
    const script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/npm/chart.js"
    script.onload = renderCharts
    document.head.appendChild(script)
  } else {
    renderCharts()
  }
})

function renderCharts() {
  // Summary Cards Mini-Charts
  summaryCards.forEach((card, idx) => {
    const ctx = document.getElementById(`summaryChart${idx}`)
    if (ctx) {
      const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 38);
      gradient.addColorStop(0, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(1, 'rgba(255,255,255,0.1)');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["", "", "", "", ""],
          datasets: [{
            data: [18 + idx * 2, 23 + idx * 1.5, 19 + idx, 21 + idx * 1.8, 15 + idx],
            borderColor: "#fff",
            borderWidth: 2.2,
            backgroundColor: gradient,
            pointRadius: 0,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          elements: { line: { borderJoinStyle: 'round' }, point: { radius: 0 } },
          scales: { x: { display: false }, y: { display: false } }
        }
      });
    }
  });

  // Stat Cards Mini-Charts
  statCards.forEach((stat, idx) => {
    const ctx = document.getElementById(`statChart${idx}`)
    if (ctx) {
      const colorMap = [
        "rgba(255, 193, 7, 0.5)",
        "rgba(13, 110, 253, 0.5)",
        "rgba(33, 37, 41, 0.5)",
        "rgba(25, 135, 84, 0.5)"
      ];
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ["", "", "", ""],
          datasets: [{
            data: [2 + idx, 3 + idx * 2, 1 + idx, 4 + idx * 1.5],
            backgroundColor: colorMap[idx],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { enabled: false } },
          scales: { x: { display: false }, y: { display: false } }
        }
      });
    }
  });

  // Main Sales/Purchase Chart
  const mainChart = document.getElementById("mainChart");
  if (mainChart) {
    const ctx = mainChart.getContext('2d');
    const sellGradient = ctx.createLinearGradient(0, 0, 0, 180);
    sellGradient.addColorStop(0, 'rgba(25,135,84,0.16)');
    sellGradient.addColorStop(1, 'rgba(25,135,84,0)');
    const buyGradient = ctx.createLinearGradient(0, 0, 0, 180);
    buyGradient.addColorStop(0, 'rgba(13,110,253,0.13)');
    buyGradient.addColorStop(1, 'rgba(13,110,253,0)');

    new Chart(mainChart, {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "លក់",
            data: [120, 110, 140, 150, 170, 190],
            borderColor: "#198754",
            backgroundColor: sellGradient,
            pointBackgroundColor: "#198754",
            pointBorderColor: "#fff",
            pointRadius: 6,
            fill: true,
            tension: 0.4,
            borderWidth: 3
          },
          {
            label: "ទិញ",
            data: [100, 130, 115, 160, 120, 140],
            borderColor: "#0d6efd",
            backgroundColor: buyGradient,
            pointBackgroundColor: "#0d6efd",
            pointBorderColor: "#fff",
            pointRadius: 6,
            fill: true,
            tension: 0.4,
            borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { top: 20, bottom: 10, left: 0, right: 0 }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'center',
            labels: {
              color: '#222',
              font: { weight: 'bold', size: 15, family: "'Noto Sans Khmer', 'Noto Sans', 'Roboto', Arial, sans-serif" },
              padding: 16,
              boxWidth: 32,
              usePointStyle: true,
            }
          },
          tooltip: {
            backgroundColor: '#fff',
            titleColor: '#222',
            bodyColor: '#222',
            borderColor: '#eee',
            borderWidth: 1,
            titleFont: { weight: 'bold' },
            bodyFont: { weight: 'bold' }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#444', font: { weight: 'bold', size: 13 } }
          },
          y: {
            grid: { color: 'rgba(0,0,0,0.06)' },
            ticks: { color: '#444', font: { size: 13 } }
          }
        }
      }
    });
  }
}
</script>