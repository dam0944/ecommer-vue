<template>
  <div class="p-6">
    <!-- Breadcrumb -->
    <div class="text-sm breadcrumbs mb-4">
      <ul>
        <li><a href="#">Dashboard</a></li>
        <li><a href="#">Ecommerce</a></li>
        <li>Orders</li>
      </ul>
    </div>

    <!-- Toolbar -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-3 mb-4">
      <div class="flex gap-2">
        <button class="btn btn-sm">Bulk Actions</button>
        <button class="btn btn-sm">Filters</button>
        <input type="text" placeholder="Search..." class="input input-sm input-bordered w-48" />
      </div>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-primary">+ Create</button>
        <button class="btn btn-sm btn-outline">
          <i class="fa-solid fa-download mr-1"></i> Export
        </button>
        <button class="btn btn-sm btn-ghost">
          <i class="fa-solid fa-rotate-right"></i> Reload
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto bg-base-100 rounded-xl shadow">
      <table class="table table-zebra table-sm">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>ID</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Payment Status</th>
            <th>Status</th>
            <th>Tax</th>
            <th>Shipping</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td><input type="checkbox" /></td>
            <td>{{ order.id }}</td>
            <td>
              <div>
                <div class="font-bold">{{ order.name }}</div>
                <div class="text-sm text-gray-500">{{ order.email }}</div>
                <div class="text-sm">{{ order.phone }}</div>
              </div>
            </td>
            <td>${{ order.amount.toLocaleString() }}</td>
            <td>{{ order.paymentMethod }}</td>
            <td>
              <span :class="badgeClass(order.paymentStatus)">
                {{ order.paymentStatus }}
              </span>
            </td>
            <td>
              <span :class="badgeClass(order.status)">
                {{ order.status }}
              </span>
            </td>
            <td>${{ order.tax }}</td>
            <td>${{ order.shipping }}</td>
            <td>{{ order.createdAt }}</td>
            <td class="flex gap-1">
              <button class="btn btn-xs btn-primary"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-xs btn-error"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const orders = [
  {
    id: 50,
    name: 'Nasser',
    email: 'elias_love2010@windowslive.com',
    phone: '81355436',
    amount: 935.67,
    paymentMethod: 'Cash on delivery (COD)',
    paymentStatus: 'Pending',
    status: 'Pending',
    tax: 122.04,
    shipping: 0.0,
    createdAt: '2025-07-06',
  },
  {
    id: 49,
    name: 'Madelynn Gerlach',
    email: 'customer@botble.com',
    phone: '+18483823641',
    amount: 762.0,
    paymentMethod: 'Bank transfer',
    paymentStatus: 'Pending',
    status: 'Pending',
    tax: 0.0,
    shipping: 0.0,
    createdAt: '2025-06-16',
  },
  {
    id: 48,
    name: 'Madelynn Gerlach',
    email: 'customer@botble.com',
    phone: '+18483823641',
    amount: 1130.0,
    paymentMethod: 'SslCommerz',
    paymentStatus: 'Completed',
    status: 'Pending',
    tax: 0.0,
    shipping: 0.0,
    createdAt: '2025-06-15',
  },
  {
    id: 47,
    name: 'Madelynn Gerlach',
    email: 'customer@botble.com',
    phone: '+18483823641',
    amount: 5412.0,
    paymentMethod: 'PayPal',
    paymentStatus: 'Completed',
    status: 'Pending',
    tax: 0.0,
    shipping: 0.0,
    createdAt: '2025-06-15',
  },
  {
    id: 46,
    name: 'Verda Gutkowski',
    email: 'salvador67@example.net',
    phone: '+13809992619',
    amount: 7155.0,
    paymentMethod: 'Bank transfer',
    paymentStatus: 'Pending',
    status: 'Pending',
    tax: 0.0,
    shipping: 0.0,
    createdAt: '2025-06-15',
  },
  {
    id: 45,
    name: 'Verda Gutkowski',
    email: 'salvador67@example.net',
    phone: '+13809992619',
    amount: 679.0,
    paymentMethod: 'Bank transfer',
    paymentStatus: 'Pending',
    status: 'Completed',
    tax: 0.0,
    shipping: 0.0,
    createdAt: '2025-06-15',
  },
]

function badgeClass(status: string) {
  switch (status) {
    case 'Pending':
      return 'badge badge-warning text-white'
    case 'Completed':
      return 'badge badge-success text-white'
    case 'Cancelled':
      return 'badge badge-error text-white'
    default:
      return 'badge'
  }
}
</script>
