import { createRouter, createWebHistory } from 'vue-router'
// createRouter:创建路由实例
// createWebHistory: 创建history模式的路由，哈希
import Login from '@/views/login/index.vue'
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
        name: 'layout',
        children:[
          {
            path:'' , //默认页面就置空,或者使用重定向
            name: 'home',
            component:Home
          },
          {  // 商品类别
            path:'category/:id',
            component:Category
          },
          {  // 商品详情
            path:"commoditydetails/:id",
            name:"commoditydetails",
            component:()=>import("@/views/Home/components/CommodityDetails.vue")
          },
          {
            // 购物车
            path:"cart",
            name:"cart",
            component:()=>import("@/views/Home/components/cart.vue")
          },
          {
            // 用户个人设置
            path:"user",
            name:"user",
            component:()=>import("@/views/user/index.vue"),
            meta: {
              token: true
            }
          },{
            // 订单完成界面
            path:"ok/:id",
            name:"ok",
            component:()=>import("@/views/ok/index.vue")        
          }
       
        ]
      },
      {
        path:'/login',
        component:Login,
        name:"login",
        meta: {
          login: true
        }
      },{
        path:'/register',
        component:()=>import("@/views/register/index.vue"),
        name:"register",
        meta: {
          login: true
        }
      }
  ]
})

// 路由前卫
router.beforeEach((to, from) => {
  // 当去的界面要token的时候
  if (to.meta.token) {
    if (!localStorage.getItem('token') && to.name !== 'Login') {
      return ({ name: 'Login',      // 保存我们所在的位置，以便以后再来
      query: { redirect: to.fullPath }, })
    }
  }
  // 当去的界面为登录界面的时候
  if (to.meta.login) {
    if (localStorage.getItem('token')) {
      return {
        name: 'home'
      }
    }
  }
 return true
})

router.beforeEach((to, from, next) => {
  // 如果导航到新页面，则刷新页面
  if (to.path !== from.path) {
    to.meta.reload = true;
  }
  next();
});


export default router
