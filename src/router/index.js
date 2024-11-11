import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'
import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/phOperator/:component',
    name: 'phOperator',
    component: AdminView,
    props: true,
    meta: { requiresAuth: true, role: "phOperator"},
  },
  {
    path: '/whOperator/:component',
    name: 'whOperator',
    component: UserView,
    props: true,
    meta: { requiresAuth: true, role: "whOperator"},
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/',
    redirect: { 'name': 'phOperator', params: {component: 'items'}}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = Boolean(localStorage.getItem("auth"));
  const userRole = localStorage.getItem("role");
  if (to.meta.requiresAuth && !isAuthenticated) {
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
  }
});

export default router
