import ficheroAdminView from "@/modules/admin/views/ficheroAdminView";

export default {
    children: [
        {
            path:"/admin",
            name: "ficheroAdmin",
            component: () => Promise.resolve(ficheroAdminView),
            beforeEnter: (to, from, next) => {
                if(!sessionStorage.getItem("token"))next("/");
                else next();
            },
        }
    ]
}