import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '@/views/AdminView.vue'
import UserView from '@/views/UserView.vue'

const routes = [
  {
    path: '/phOperator/:component',
    name: 'phOperator',
    component: AdminView,
    props: true,
  },
  {
    path: '/whOperator/:component',
    name: 'whOperator',
    component: UserView,
    props: true,
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

export default router
