import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../views/login/Login')
  },
  {
    path: '/layout',
    component: () => import('../views/layout/Layout'),
    children: [
      {
        path: '/home', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/Home.vue')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/Qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/Video.vue')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/My.vue')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search/index')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/index'),
    props: true // 开启props传参
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('@/views/user-profile/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
