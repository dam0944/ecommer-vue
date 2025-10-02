import type { Shop,Category,Product } from "../types/user";

export const ShopList: Shop[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    description: "High quality wireless headphones with noise cancellation.",
    image: "https://via.placeholder.com/300x200?text=Headphones",
    price: 99.99
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness and notifications with style.",
    image: "https://via.placeholder.com/300x200?text=Smart+Watch",
    price: 149.99
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and long battery life.",
    image: "https://via.placeholder.com/300x200?text=Speaker",
    price: 59.99
  }
];

export const CategoryList: Category[] = [
  {
    id: 1,
    name: 'Headphones',
    image: 'https://via.placeholder.com/150x100?text=Headphones',
    desc: 'High quality audio devices for immersive music and calls.'
  },
  {
    id: 2,
    name: 'Smart Watches',
    image: 'https://via.placeholder.com/150x100?text=Smart+Watch',
    desc: 'Track your health, notifications, and more with stylish smart watches.'
  },
  {
    id: 3,
    name: 'Bluetooth Speakers',
    image: 'https://via.placeholder.com/150x100?text=Speaker',
    desc: 'Portable speakers with powerful sound and long battery life.'
  },
  {
    id: 4,
    name: 'Wearable Cameras',
    image: 'https://via.placeholder.com/150x100?text=Camera',
    desc: 'Capture your adventures hands-free with wearable cameras.'
  }
];

export const ProductList: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    desc: "High quality wireless headphones with noise cancellation.",
    image: "https://tse4.mm.bing.net/th?id=OIP.QROk03RwgT_rCRa073wEEQHaHa&pid=Api&P=0&h=220",
    Sku: "WH-1001"
  },
  {
    id: 2,
    name: "Smart Watch",
    desc: "Stay connected and track your fitness with this smart watch.",
    image: "https://tse3.mm.bing.net/th?id=OIP.wJuA305EkyHH6vl2mpw1SAHaHT&pid=Api&P=0&h=220",
    Sku: "SW-2025"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    desc: "Portable Bluetooth speaker with deep bass.",
    image: "https://via.placeholder.com/300x200?text=Speaker",
    Sku: "BS-350"
  }
];
