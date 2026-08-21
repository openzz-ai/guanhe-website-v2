import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { titleKey: '首页' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue'),
    meta: { titleKey: '公司简介' }
  },
  {
    path: '/products/:type',
    name: 'products',
    component: () => import('@/views/Products.vue'),
    meta: { titleKey: '产品中心' }
  },
  {
    path: '/find-products',
    name: 'product-finder',
    component: () => import('@/views/ProductFinder.vue'),
    meta: { titleKey: 'Product Finder' }
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@/views/Catalog.vue'),
    meta: { titleKey: '电子样本' }
  },
  {
    path: '/products',
    redirect: '/products/steel'
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/views/Contact.vue'),
    meta: { titleKey: '联系我们' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  }
})

router.afterEach((to) => {
  document.title = `大连管和件管道有限公司 - ${to.meta.titleKey || '官网'}`
})

export default router
