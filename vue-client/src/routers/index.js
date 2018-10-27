import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'

import store from '../store'
import helper from '../libs/helper'
import Login from '../views/Login.vue'
import Index from '../views/Index.vue'
import home from './home'
import content from './content'
import user from './user'
import statistics from './statistics'
import tool from './tool'
import setting from './setting'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Index,
    children: [
      ...home,
      ...content,
      ...user,
      ...statistics,
      ...tool,
      ...setting
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    redirect: '/home/summary'
  }
  ]
})

router.beforeEach(async (to, from, next) => {
  iView.LoadingBar.start()
  try {
    // 检测登录状态
    let adminToken = ''
    adminToken = await helper.getStorage('admin_token')
    if (to.name !== 'login' && !adminToken) {
      return router.push({
        name: 'login'
      })
    }

    // 检测菜单
    if (to.name !== 'login' && (!Array.isArray(store.state.menus) || store.state.menus.length <= 0)) {
      const localMenus = await helper.getStorage('menus') || []
      if (localMenus.length <= 0) {
        return router.push({
          name: 'login'
        })
      }
      store.commit('setMenus', localMenus)
    }
    // 根据路由改变菜单导航状态
    store.commit('changeMenuActive', to)
    next()
  } catch (err) {
    return router.push({
      name: 'login'
    })
  }
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

export default router
