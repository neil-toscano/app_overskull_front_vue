import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: 'products',
          component: () => import('@/views/products/ProductList.vue'),
        },
        {
          path: 'products/create',
          component: () => import('@/views/products/ProductCreate.vue'),
        },
        { path: 'categories', component: () => import('@/views/categories/CategoryList.vue') },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
