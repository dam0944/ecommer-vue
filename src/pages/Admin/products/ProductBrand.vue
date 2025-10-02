<template>
  <div class="p-6">
    <!-- Breadcrumb -->
    <div class="text-sm breadcrumbs mb-5 text-gray-500 font-medium">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Ecommerce</a></li>
        <li class="text-black">Brands</li>
      </ul>
    </div>

    <!-- Top Bar -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
      <div class="flex gap-2">
        <button class="btn btn-sm btn-outline">Bulk Actions</button>
        <button class="btn btn-sm btn-outline">Filters</button>
        <input type="text" placeholder="Search..." class="input input-sm input-bordered w-52" />
      </div>
      <div class="flex gap-2 items-center">
        <button class="btn btn-sm bg-purple-700 hover:bg-purple-800 text-white">+ Create</button>
        <button class="btn btn-sm btn-link text-black">Reload</button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-white rounded-xl shadow">
      <table class="table table-sm">
        <thead class="text-gray-600 bg-gray-50">
          <tr>
            <th><input type="checkbox" class="checkbox checkbox-sm" /></th>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Is Featured</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in brands" :key="brand.id" class="hover">
            <td><input type="checkbox" class="checkbox checkbox-sm" /></td>
            <td>{{ brand.id }}</td>
            <td>
              <img :src="brand.logo" alt="Logo" class="w-12 h-8 object-contain" />
            </td>
            <td class="text-blue-600 hover:underline cursor-pointer">
              {{ brand.name }}
            </td>
            <td>
              <span class="badge badge-success px-4 py-1 rounded-full text-white">Yes</span>
            </td>
            <td>{{ brand.createdAt }}</td>
            <td>
              <span class="badge badge-success px-4 py-1 rounded-full text-white">Published</span>
            </td>
            <td>
              <div class="flex gap-2">
                <button class="btn btn-xs bg-blue-500 hover:bg-blue-600 text-white">
                  <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="btn btn-xs bg-red-500 hover:bg-red-600 text-white">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Footer -->
      <div class="p-4 text-sm text-gray-500">
        Show from <strong>1</strong> to <strong>5</strong> in <strong>5</strong> records
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const brands = [
  {
    id: 5,
    logo: 'https://via.placeholder.com/80x40?text=ASS',
    name: 'Soda Brand',
    createdAt: '2025-05-13',
    flags: [
      'https://flagcdn.com/us.svg',
      'https://flagcdn.com/vn.svg',
      'https://flagcdn.com/sa.svg',
    ],
  },
  {
    id: 4,
    logo: 'https://via.placeholder.com/80x40?text=Sunshy',
    name: 'Shofy',
    createdAt: '2025-05-13',
    flags: [
      'https://flagcdn.com/us.svg',
      'https://flagcdn.com/vn.svg',
      'https://flagcdn.com/sa.svg',
    ],
  },
  {
    id: 3,
    logo: 'https://via.placeholder.com/80x40?text=HOWTIN',
    name: 'Soda Brand',
    createdAt: '2025-05-13',
    flags: [
      'https://flagcdn.com/us.svg',
      'https://flagcdn.com/vn.svg',
      'https://flagcdn.com/sa.svg',
    ],
  },
  {
    id: 2,
    logo: 'https://via.placeholder.com/80x40?text=Vintage',
    name: 'iTea JSC',
    createdAt: '2025-05-13',
    flags: [
      'https://flagcdn.com/us.svg',
      'https://flagcdn.com/vn.svg',
      'https://flagcdn.com/sa.svg',
    ],
  },
  {
    id: 1,
    logo: 'https://via.placeholder.com/80x40?text=RANDI',
    name: 'FoodPound',
    createdAt: '2025-05-13',
    flags: [
      'https://flagcdn.com/us.svg',
      'https://flagcdn.com/vn.svg',
      'https://flagcdn.com/sa.svg',
    ],
  },
]
</script>
