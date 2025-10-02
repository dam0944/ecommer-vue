<template>
  <aside class="sidebar-main" :class="{ 'sidebar-collapsed': isCollapsed }">
    <!-- Sidebar Toggle Button -->
    <button class="sidebar-toggle" @click="toggleSidebar">
      <i class="bi bi-list"></i>
    </button>

    <!-- User Panel -->
    <div class="sidebar-profile">
      <div class="sidebar-avatar">
        <img 
          src="https://tse4.mm.bing.net/th/id/OIP.Kk4i-k-7bOfsgPv0SJtj5AHaHa?pid=Api&P=0&h=220" 
          alt="Profile"
          class="avatar-img"
        />
        <div class="avatar-status"></div>
      </div>
      <div class="profile-info" v-show="!isCollapsed">
        <div class="sidebar-profile-name">កុសល​</div>
        <div class="sidebar-profile-role">Admin</div>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <div
          v-for="item in items"
          :key="item.title"
          class="nav-item"
        >
          <!-- Menu item with children -->
          <div v-if="item.children" class="nav-group">
            <button
              @click="toggle(item.title)"
              class="sidebar-nav-btn"
              :class="{ 
                'active': isOpen(item.title),
                'has-children': true
              }"
              :title="isCollapsed ? item.title : ''"
            >
              <span class="sidebar-icon-wrapper">
                <i :class="`bi bi-${item.icon}`"></i>
              </span>
              <span class="sidebar-menu-label" v-show="!isCollapsed">
                {{ item.title }}
              </span>
              <i 
                v-show="!isCollapsed"
                :class="`bi sidebar-chevron ${isOpen(item.title) ? 'bi-chevron-up' : 'bi-chevron-down'}`" 
              />
            </button>
            
            <!-- Submenu -->
            <transition name="submenu">
              <div 
                v-show="isOpen(item.title) && !isCollapsed" 
                class="sidebar-submenu"
              >
                <button
                  v-for="child in item.children"
                  :key="child.title"
                  @click="onMenuClick(child)"
                  class="sidebar-nav-btn sidebar-nav-btn-child"
                  :class="{ 'active': activeElement === child.title }"
                >
                  <span class="sidebar-icon-wrapper">
                    <i :class="`bi bi-${child.icon}`"></i>
                  </span>
                  <span class="sidebar-menu-label">{{ child.title }}</span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Single menu item -->
          <button
            v-else
            @click="onMenuClick(item)"
            class="sidebar-nav-btn"
            :class="{ 'active': activeElement === item.title }"
            :title="isCollapsed ? item.title : ''"
          >
            <span class="sidebar-icon-wrapper">
              <i :class="`bi bi-${item.icon}`"></i>
            </span>
            <span class="sidebar-menu-label" v-show="!isCollapsed">
              {{ item.title }}
            </span>
          </button>
        </div>
      </div>
    </nav>
  </aside>

  <!-- Overlay for mobile -->
  <div 
    v-if="isMobile && !isCollapsed" 
    class="sidebar-overlay"
    @click="closeSidebar"
  ></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

type MenuChild = {
  title: string
  icon: string
  path: string
}

type MenuItem = {
  title: string
  icon: string
  path?: string
  children?: MenuChild[]
}

const activeElement = ref<string>('ផ្ទាំងគ្រប់គ្រង')
const openMenus = ref<string[]>([])
const isCollapsed = ref<boolean>(false)
const isMobile = ref<boolean>(false)
const router = useRouter()

const items: MenuItem[] = [
  {
    title: 'ផ្ទាំងគ្រប់គ្រង',
    icon: 'speedometer2',
    path: "/dashboard",
  },
  {
    title: 'ប្រព័ន្ធលក់ (POS)',
    icon: 'tablet',
    path: "/pos",
  },
  {
    title: 'ផលិតផល',
    icon: 'inbox',
    children: [
      { title: 'បញ្ជីផលិតផល', path: "/list", icon: 'card-list' },  
      { title: 'បន្ថែមផលិតផល', path: '/create', icon: 'plus-square' },
      { title: 'កែប្រែផលិតផល', path: '/edit', icon: 'pencil-square' },
      { title: 'ផលិតផលផុតកំណត់', path: '/expire', icon: 'exclamation-triangle' },
      { title: 'ផលិតផលជិតអស់', path: '/low-stocks', icon: 'arrow-down' },
      { title: 'ប្រភេទ', path: '/category', icon: 'collection' },
      { title: 'ប្រភេទរង', path: '/sub-category', icon: 'diagram-3' },
      { title: 'ម៉ាកផលិតផល', path: '/brand-product', icon: 'award' },
      { title: 'ឯកតា', path: '/units', icon: 'grid-3x3-gap' },
      { title: 'លក្ខណៈបន្សំ', path: '/variant-attributes', icon: 'layers' },
      { title: 'ការធានា', path: '/warranties', icon: 'shield-check' },
      { title: 'បោះពុម្ព Barcode', path: '/print-barcode', icon: 'upc' },
      { title: 'បោះពុម្ព QR Code', path: '/print-qr', icon: 'qr-code' },
    ]
  },
  {
    title: 'ស្តុក',
    icon: 'boxes',
    children: [
      { title: 'គ្រប់គ្រងស្តុក', icon: 'box-seam', path: '/stock/manage' },
      { title: 'កែសម្រួលស្តុក', icon: 'tools', path: '/stock/adjustment' },
      { title: 'ផ្ទេរស្តុក', icon: 'arrow-left-right', path: '/stock/transfer' },
    ]
  },
  {
    title: 'លក់',
    icon: 'bar-chart-line',
    children: [
      { title: 'ការបញ្ជាទិញតាមអនឡាញ', icon: 'cart-check', path: '/sales/online-order' },
      { title: 'ការបញ្ជាទិញតាម POS', icon: 'credit-card', path: '/sales/pos-order' },
      { title: 'វិក្កយបត្រ', icon: 'file-earmark-text', path: '/sales/invoices' },
      { title: 'ត្រឡប់លក់', icon: 'arrow-counterclockwise', path: '/sales/return' },
      { title: 'បញ្ជាលក់', icon: 'chat-left-text', path: '/sales/quotation' },
    ]
  },
  {
    title: 'ព្រីមូសិន',
    icon: 'gift',
    children: [
      { title: 'គុប៉ុង', icon: 'ticket-perforated', path: '/promotion/coupons' },
      { title: 'កាតអំណោយ', icon: 'credit-card-2-front', path: '/promotion/gift-cards' },
      { title: 'ផែនការបញ្ចុះតម្លៃ', icon: 'percent', path: '/promotion/discount-plan' },
      { title: 'បញ្ចុះតម្លៃ', icon: 'badge-percent', path: '/promotion/discount' },
    ]
  },
  {
    title: 'ទិញ',
    icon: 'basket',
    children: [
      { title: 'ទិញ', icon: 'basket', path: '/purchase' },
      { title: 'បញ្ជាទិញ', icon: 'file-earmark-plus', path: '/purchase/order' },
      { title: 'ត្រឡប់ទិញ', icon: 'arrow-return-left', path: '/purchase/returns' },
    ]
  },
  {
    title: 'អ្នកប្រើប្រាស់',
    icon: 'people',
    children: [
      { title: 'អតិថិជន', icon: 'person-badge', path: '/people/customers' },
      { title: 'អ្នកចេញវិក្កយបត្រ', icon: 'person-lines-fill', path: '/people/billers' },
      { title: 'អ្នកផ្គត់ផ្គង់', icon: 'truck', path: '/people/suppliers' },
      { title: 'ហាង', icon: 'shop', path: '/people/stores' },
      { title: 'ឃ្លាំង', icon: 'building', path: '/people/warehouses' },
    ]
  },
  {
    title: 'អ្នកប្រើ & តួនាទី',
    icon: 'person-gear',
    children: [
      { title: 'អ្នកប្រើប្រាស់', icon: 'person-fill', path: '/user/users' },
      { title: 'តួនាទី & សិទ្ធិ', icon: 'key', path: '/user/roles' },
      { title: 'ប្រវត្តិចូលប្រើ', icon: 'clipboard-data', path: '/user/logs' },
    ]
  },
  {
    title: 'ហិរញ្ញវត្ថុ',
    icon: 'cash-stack',
    children: [
      { title: 'គណនីធនាគារ', icon: 'bank', path: '/finance/accounts' },
      { title: 'ប្រតិបត្តិការ', icon: 'arrow-left-right', path: '/finance/transactions' },
      { title: 'ចំណាយ', icon: 'receipt', path: '/finance/expenses' },
    ]
  },

  {
    title: 'របាយការណ៍',
    icon: 'bar-chart',
    children: [
      { title: 'របាយការណ៍លក់', icon: 'graph-up-arrow', path: '/report/sale' },
      { title: 'ផលិតផលលក់ដាច់', icon: 'star-fill', path: '/report/best-seller' },
      { title: 'របាយការណ៍ទិញ', icon: 'file-earmark-bar-graph', path: '/report/purchase' },
      { title: 'របាយការណ៍ស្តុក', icon: 'clipboard-data', path: '/report/inventory' },
      { title: 'របាយការណ៍វិក្កយបត្រ', icon: 'file-earmark-text', path: '/report/invoice' },
      { title: 'របាយការណ៍អតិថិជន', icon: 'person-lines-fill', path: '/report/customer' },
      { title: 'របាយការណ៍ផលិតផល', icon: 'box', path: '/report/product' },
      { title: 'របាយការណ៍ពន្ធ', icon: 'currency-dollar', path: '/report/tax' },
      { title: 'ចំណេញ និង ខាត', icon: 'cash-stack', path: '/report/profit-loss' },
    ]
  },
]

function toggle(title: string): void {
  if (isCollapsed.value) {
    isCollapsed.value = false
  }
  
  if (openMenus.value.includes(title)) {
    openMenus.value = openMenus.value.filter(t => t !== title)
  } else {
    openMenus.value.push(title)
  }
}

function isOpen(title: string): boolean {
  return openMenus.value.includes(title)
}

function onMenuClick(item: MenuItem | MenuChild): void {
  if (item.path) {
    activeElement.value = item.title
    router.push(item.path)
    // Close sidebar on mobile after navigation
    if (isMobile.value) {
      isCollapsed.value = true
    }
  }
}

function toggleSidebar(): void {
  isCollapsed.value = !isCollapsed.value
}

function closeSidebar(): void {
  if (isMobile.value) {
    isCollapsed.value = true
  }
}

function checkMobile(): void {
  isMobile.value = window.innerWidth < 768
  if (isMobile.value) {
    isCollapsed.value = true
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
/* Import Bootstrap Icons */
@import url('https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css');

.sidebar-main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 280px;
  min-width: 280px;
  background: linear-gradient(180deg, #1a2332 0%, #232f3e 100%);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
  color: #fff;
  font-family: 'Noto Sans Khmer', 'Inter', 'Segoe UI', Arial, sans-serif;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;
}

.sidebar-main.sidebar-collapsed {
  width: 70px;
  min-width: 70px;
}

/* Sidebar Toggle */
.sidebar-toggle {
  position: absolute;
  top: 20px;
  right: -15px;
  width: 30px;
  height: 30px;
  background: #007bff;
  border: none;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 123, 255, 0.3);
  transition: all 0.3s ease;
  z-index: 1001;
}

.sidebar-toggle:hover {
  background: #0056b3;
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.4);
}

/* Profile Section */
.sidebar-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.sidebar-collapsed .sidebar-profile {
  justify-content: center;
  padding: 1rem;
}

.sidebar-avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.sidebar-collapsed .sidebar-avatar {
  width: 40px;
  height: 40px;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-status {
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: #28a745;
  border: 2px solid #fff;
  border-radius: 50%;
}

.profile-info {
  flex: 1;
  min-width: 0;
}

.sidebar-profile-name {
  font-weight: 600;
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-profile-role {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  padding: 1rem 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-section {
  padding: 0 0.5rem;
}

.nav-item {
  margin-bottom: 0.25rem;
}

.sidebar-nav-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.875rem 1rem;
  border: none;
  background: transparent;
  color: #cbd5e1;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 12px;
  text-align: left;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  overflow: hidden;
}

.sidebar-nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.05));
  transition: width 0.3s ease;
  z-index: -1;
}

.sidebar-nav-btn:hover::before {
  width: 100%;
}

.sidebar-nav-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  transform: translateX(4px);
}

.sidebar-nav-btn.active {
  background: linear-gradient(135deg, #007bff, #0056b3);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
  transform: translateX(4px);
}

.sidebar-nav-btn.active::before {
  width: 100%;
}

.sidebar-collapsed .sidebar-nav-btn {
  justify-content: center;
  padding: 0.875rem 0.5rem;
}

.sidebar-icon-wrapper {
  width: 24px;
  min-width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.sidebar-collapsed .sidebar-icon-wrapper {
  margin-right: 0;
}

.sidebar-menu-label {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: all 0.3s ease;
}

.sidebar-chevron {
  font-size: 0.875rem;
  transition: transform 0.3s ease;
  margin-left: auto;
}

.sidebar-nav-btn.active .sidebar-chevron {
  transform: rotate(180deg);
}

/* Submenu */
.sidebar-submenu {
  background: rgba(0, 0, 0, 0.2);
  margin: 0.5rem 0 0.5rem 1rem;
  border-radius: 8px;
  border-left: 3px solid #007bff;
  padding: 0.5rem 0;
  backdrop-filter: blur(5px);
}

.sidebar-nav-btn-child {
  font-size: 0.875rem;
  padding: 0.625rem 1rem;
  color: #94a3b8;
  margin: 0.125rem 0.5rem;
  border-radius: 8px;
  font-weight: 500;
}

.sidebar-nav-btn-child:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  transform: translateX(2px);
}

.sidebar-nav-btn-child.active {
  background: rgba(0, 123, 255, 0.2);
  color: #fff;
  font-weight: 600;
}

/* Submenu Animation */
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  transform: scaleY(0) translateY(-10px);
  max-height: 0;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  transform: scaleY(1) translateY(0);
  max-height: 500px;
}

/* Footer */
.sidebar-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.footer-info {
  text-align: center;
}

.app-version {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
}

.copyright {
  font-size: 0.7rem;
  color: #475569;
}

/* Scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  transition: background 0.3s ease;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Mobile Overlay */
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(2px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sidebar-main {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transform: translateX(-100%);
  }
  
  .sidebar-main:not(.sidebar-collapsed) {
    transform: translateX(0);
  }
  
  .sidebar-toggle {
    display: none;
  }
}

/* Tooltip for collapsed state */
.sidebar-collapsed .sidebar-nav-btn {
  position: relative;
}

.sidebar-collapsed .sidebar-nav-btn:hover::after {
  content: attr(title);
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2937;
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 1000;
  margin-left: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  animation: tooltipFadeIn 0.2s ease;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

/* Focus states for accessibility */
.sidebar-nav-btn:focus-visible {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* Smooth transitions */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
