import { createRouter, createWebHistory } from 'vue-router'
import loginAdminView from "@/modules/admin/views/loginAdminView.vue"; 
import loginUserView from "@/modules/usuarios/views/loginUserView.vue"; 
import adminRouter from "@/modules/admin/router";
const routes = [
    {
        path: "/",
        name: "adminView",
        component: ()=> Promise.resolve(loginAdminView),

    },
    {
        path: "/admin",
        ...adminRouter,
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
