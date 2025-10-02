import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import FormLogin from "../auth/FormLogin.vue";
import HomeLayoutAdmin from "../layouts/HomeLayoutAdmin.vue";
import Dasboard from "../pages/Admin/dashboard/Dasboard.vue";
import HomeLayoutWebsite from "../layouts/HomeLayoutWebsite.vue";
import Home from "../pages/Home/Home.vue";
import About from "../pages/Home/about/About.vue";
import FormSignUp from "../auth/FormSignUp.vue";
import ForgotPassword from "../auth/ForgotPassword.vue";
import HomeLayoutPos from "../layouts/HomeLayoutPos.vue";
import Pos from "../pages/Admin/pos/Pos.vue";
// import HomeDetails from "../pages/Home/product-detail/HomeDetails.vue";
// import ProductDescount from "../pages/Home/productDescount/ProductDescount.vue";
import OrderPage from "../pages/Home/checkout/OrderPage.vue";
// import BrandGrid from "../pages/Home/brand/BrandGrid.vue";
// import ViewCard from "../pages/Home/checkout/ViewCard.vue";
import CreateProduct from "../pages/Admin/products/CreateProduct.vue";
import ProductList from "../pages/Admin/products/ProductList.vue";
import EditProduct from "../pages/Admin/products/EditProduct.vue";
import ExpireProduct from "../pages/Admin/products/ExpireProduct.vue";
import LowStock from "../pages/Admin/products/LowStock.vue";
import Category from "../pages/Admin/products/Category.vue";
import SubCategory from "../pages/Admin/products/SubCategory.vue";
import ProductBrand from "../pages/Admin/products/ProductBrand.vue";
import UnitProduct from "../pages/Admin/products/UnitProduct.vue";
import Variantibutes from "../pages/Admin/products/Variantibutes.vue";
import Varianties from "../pages/Admin/products/Varianties.vue";
import PrintBarod from "../pages/Admin/products/PrintBarod.vue";
import PrintQrCode from "../pages/Admin/products/PrintQrCode.vue";
import Card from "../pages/Home/Card.vue";
// import ProductDescount from "../pages/Home/productDetail/ProductDescount.vue";
import ProductDetail from "../pages/Home/productDetail/ProductDetail.vue";
import ProductGrid from "../pages/Home/productDetail/ProductGrid.vue";
import HomePageCheckOut from "../pages/Home/checkout/HomePageCheckOut.vue";
import ProductOrder from "../pages/Admin/products/ProductOrder.vue";
import BrandCard from "@/pages/Home/brand/BrandCard.vue";

const routes: RouteRecordRaw[] = [

    // website layout and pages
    {
        path: "/",  
        component: HomeLayoutWebsite,
        children: [
            {
                path: "/",
                component: Home,
            },
            {
                path:"/about",
                component:About,
            },
            {
                path: "/product-grid",
                component:ProductGrid,
            },
            {
                path: "/order",
                component:OrderPage,
            },
            {
                path:"/brand",
                component: BrandCard,
            },
            {
                path:"/viewcard",
                component: Card,
            },
            {
                path:"/details",
                component: ProductDetail,
            },
        
            {
                path:"/checkout",
                component: HomePageCheckOut,
            }
        ]
    },
    
    // layout  authication
    {
        path: "/login",
        component: FormLogin,
    },
    {
        path: "/signup",
        component:FormSignUp,
    },
    {
        path:"/forgotpassword",
        component:ForgotPassword,
    },

    // dashboard layout and pages
    {
        path: "/dashboard",
        component: HomeLayoutAdmin,
        children: [
            {
                path: "/dashboard",
                component: Dasboard,
            }, 
            {
                path: "/create",
                component: CreateProduct,
            },
            {
                path: "/list",
                component: ProductList,
            },
            {
                path:"/edit",
                component: EditProduct,
            },
            {
                path:"/expire",
                component: ExpireProduct,
            },
            {
                path: "/low-stocks",
                component: LowStock,
            },
                       {
                path: "/category",
                component:Category ,
            },
            {
                path: "/sub-category",
                component: SubCategory ,
            },
            {
                path: "/brand-product",
                component:ProductBrand,
            },
            {
                path: "/units",
                component:UnitProduct,
            },
            {
                path: "/variant-attributes",
                component: Variantibutes,
            },
            {
                path: "/warranties",
                component : Varianties ,
            },
            {
                path: "/print-barcode",
                component : PrintBarod ,
            },
            {
                path: "/print-qr",
                component: PrintQrCode,
            },
            {
                path:"/sales/online-order",
                component: ProductOrder,
            }
        ]
    },

    // route POS
    {
        path : "/pos",
        component: HomeLayoutPos,
        children : [
            {
                path :"/pos",
                component: Pos,
            },
        ]
    }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
}); 

export default router;