import Vue from "vue";
import Router from "vue-router";
import Login from './views/login'
import Layout from '@/components/Layout.vue'
import Home from './views/home'
import Member from './views/member'
import Supplier from './views/supplier'
import Goods from './views/goods'
import Staff from './views/staff'

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login', //路由名称
      component:()=>import(Login)  //组件对象
    },
    {
      path: '/',
      name: 'layout', //路由名称
      component: Layout, //组件对象
      redirect: '/home',
      children: [
        {
          path: '/home',
          component:()=>import(Home),
          meta: {title: '首页'}
        },
      ]
    },
    {
      path: '/member',
      component: Layout,
      children: [
        {
          path: '/', 
          component:()=>import(Member),
          meta: {title: '会员管理'}
        }
      ]
    },
    {
      path: '/supplier',
      component: Layout,
      children: [
        {
          path: '/', 
          component:()=>import(Supplier),
          meta: {title: '供应商管理'}
        }
      ]
    },
    {
      path: '/goods',
      component:()=>import(Layout),
      children: [
        {
          path: '/', 
          component:()=>import(Goods),
          meta: {title: '商品管理'}
        }
      ]
    },
    {
      path: '/staff',
      component:()=>import(Layout),
      children: [
        {
          path: '/', 
          component:()=>import(Staff),
          meta: {title: '员工管理'}
        }
      ]
    }
  ]
})
