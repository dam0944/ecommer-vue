// main.js or main.ts
import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createVuestic } from "vuestic-ui";
import router from './routes/index';
import Aura from '@primeuix/themes/aura';
import ToastService from 'primevue/toastservice'; // ✅ Import this
import PrimeVue from 'primevue/config';
import {definePreset} from "@primevue/themes";


const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{indigo.50}',
            100: '{indigo.100}',
            200: '{indigo.200}',
            300: '{indigo.300}',
            400: '{indigo.400}',
            500: '{indigo.500}',
            600: '{indigo.600}',
            700: '{indigo.700}',
            800: '{indigo.800}',
            900: '{indigo.900}',
            950: '{indigo.950}'
        },
        colorScheme : {
            light : {
                formField : {
                    hoverBorderColor:"{primary.color}",
                },
            },
            dark : {
                formField : {
                    hoverBorderColor:"{primary.color}",
                },
                surface  : {

                    50: '{zinc.50}',
                    100: '{zinc.100}',
                    200: '{zinc.200}',
                    300: '{zinc.300}',
                    400: '{zinc.400}',
                    500: '{zinc.500}',
                    600: '{zinc.600}',
                    700: '{zinc.700}',
                    800: '{zinc.800}',
                    900: '{zinc.900}',
                    950: '{zinc.950}'
                }
            }
        }
    }
});

const app = createApp(App);
app.use(router);
app.use(ToastService);
app.use(PrimeVue, {
    theme: {
        option: {
            darkModeSelector : ".my-app",
        },
        preset: MyPreset,
    }
 });
 
app.use(createVuestic());
app.mount("#app");
