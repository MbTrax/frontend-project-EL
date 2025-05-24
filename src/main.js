import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router/router.js";
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import {ConfirmationService} from "primevue";

const app = createApp(App)

app.use(router)
app.use(ConfirmationService);

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
app.mount('#app')
