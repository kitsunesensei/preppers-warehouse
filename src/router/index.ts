import { createRouter, createWebHistory } from 'vue-router'
import ProductsView from '../views/ProductsView.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      alias: '/',
      name: 'products-view',
      component: ProductsView,
    },
    {
      path: '/product/:productId',
      name: 'product-view',
      component: ProductView,
      props: true,
    },
  ],
})

export default router
