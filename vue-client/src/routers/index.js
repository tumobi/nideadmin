import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import helper from '../libs/helper'

// 加载菜单配置，在后台加载
import menus from '../config/menu'

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
  // 检测登录状态
  let adminToken = ''
  try {
    adminToken = await helper.getStorage('admin_token')
  } catch (err) {
    adminToken = ''
  }
  if (to.name !== 'login' && !adminToken) {
    return router.push({
      name: 'login'
    })
  }

  iView.LoadingBar.start()
  // 设置导航选中状态
  const currentRouteName = to.name
  // 处理直接输入网址时为空
  if (!currentRouteName) {
    next()
    return false
  }
  const [topName] = currentRouteName.split('_')
  // 防止实时改动 this.menus 重复执行
  for (const item of menus) {
    // 头部导航状态
    item.active = item.route.startsWith(topName)
    for (const childItem of item.children) {
      childItem.active = childItem.route.startsWith(currentRouteName)
    }
  }
  next()
})

router.afterEach(route => {
  iView.LoadingBar.finish()
})

export default router
