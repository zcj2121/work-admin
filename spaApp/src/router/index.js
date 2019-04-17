import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: Layout,
    redirect: 'home/home',
    meta: { title: '系统首页', icon: 'home' },
    hidden: false,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: { title: '系统首页', icon: 'home'}
      }
    ]
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/work',
    component: Layout,
    redirect: 'work/all',
    alwaysShow: true, // will always show the root menu
    meta: { title: '任务管理', icon: 'clipboard', roles: ['admin', 'editor', 'other'] },
    children: [
      {
        path: 'all',
        name: 'all',
        component: () => import('@/views/work/all/index'),
        meta: { title: '全部任务', icon: 'clipboard', roles: ['admin', 'editor'] }
      },
      {
        path: 'me',
        name: 'me',
        component: () => import('@/views/work/me/index'),
        meta: { title: '我的任务', icon: 'clipboard', roles: ['admin', 'editor', 'other'] }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: 'user/user',
    meta: { title: '权限管理', icon: 'cog', roles: ['admin'] },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '权限管理', icon: 'cog', roles: ['admin']}
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
