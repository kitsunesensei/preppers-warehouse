import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '../views/ProductsList.vue'
import ProductView from '../views/ProductView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/products',
      alias: '/',
      name: 'products-list',
      component: ProductsList,
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
