import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'

import HomeView from "../views/HomeView.vue";
import Login from "@/components/auth/Login.vue";
import Register from "@/components/auth/Register.vue";

import { useAuthStore } from "@/store/authStore";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { hideHeader: true, hideSidebar: true },

    children: [
      {
        path: "login",
        name: "login",
        component: Login,
      },

      {
        path: "register",
        name: "register",
        component: Register,
      },
    ],
  },

  {
    path: "/admin/:component?",
    name: "admin",
    component: AdminView,
    props: true,
    meta: { requiresAuth: true, role: "PH_OPERATOR" },
  },

  {
    path: "/user/:component?",
    name: "user",
    component: UserView,
    props: true,
    meta: { requiresAuth: true, role: "WH_OPERATOR" },
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); //untuk mendapatkan state autentikasi pengguna dari store
  const isAuthenticated = !!authStore.token; //merubah sumber dari localstorage ke state pinia authStore
  const userRole = authStore.role; //merubah sumber dari localstorage ke state pinia authStore
  
  
  /*if (to.meta.requiresAuth && !isAuthenticated) {
    alert("Anda harus login dulu untuk mengakses halaman ini.");
    next({ name: "login" });
  } else if (
    to.meta.requiresAuth &&
    isAuthenticated &&
    to.meta.role !== userRole
  ){
    alert("Anda tidak memiliki izin untuk mengakses halaman ini.");
    next(false);
  } else {
    next();
  }*/
 

 //merubah menggunakan autentikasi untuk  memeriksa keberadaan token (isAuthenticated)
    if (to.meta.requiresAuth) {
      if (isAuthenticated) {
        if (userRole === to.meta.role || to.meta.role === undefined) {
        next();
        } else {
          // alert("Anda tidak memiliki izin untuk mengakses halaman ini.");
          next({ name: "home" });
          }
      } else {
        // alert("Anda tidak memiliki izin untuk mengakses halaman ini.");
        next({ name: "home" });
        }
      } else {
        next();
        }
});

export default router
