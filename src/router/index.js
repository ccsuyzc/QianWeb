import { createRouter, createWebHistory } from 'vue-router'
// createRouter:创建路由实例
// createWebHistory: 创建history模式的路由，哈希
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'

import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // 配置路径和组件对应关系的
  routes: [
      {
        path:'/',
        component:Layout,
        children:[
          {
            path:'' , //默认页面就置空
            component:Home
          },
          {
            path:'category',
            component:Category
          }
        ]
      },
      {
        path:'/login',
        component:Login
      }
  ]
})

export default router
