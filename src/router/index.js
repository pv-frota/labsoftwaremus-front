import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ClassificacaoView from '../views/ClassificacaoView.vue'
import TaxonomiaView from '../views/TaxonomiaView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/taxonomia',
    name: 'taxonomia',
    component: TaxonomiaView
  },
  {
    path: '/classificacao',
    name: 'classificacao',
    component: ClassificacaoView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
