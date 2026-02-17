import ficheroAdminRenovadoView from "@/modules/admin/views/ficheroAdminRenovadoView";

export default {
    children: [
        {
            path:"/admin",
            name: "ficheroAdminRenovado",
            component: () => Promise.resolve(ficheroAdminRenovadoView),
            beforeEnter: (to, from, next) => {
                if(!sessionStorage.getItem("token"))next("/");
                else next();
            },
        }
    ]
}