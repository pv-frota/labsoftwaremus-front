import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ClassificacaoView from '../views/ClassificacaoView.vue'
import TaxonomiaView from '../views/TaxonomiaView.vue'
import HomeView from '../views/HomeView.vue'
import store from '@/store'

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
    component: TaxonomiaView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/classificacao',
    name: 'classificacao',
    component: ClassificacaoView,
    meta: {
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.isLogado) {
    next("/login")
  } else {
    next()
  }
})

export default router
