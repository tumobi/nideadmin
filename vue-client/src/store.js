import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menus: [],
    currentMenu: {}
  },
  mutations: {
    changeMenuActive (state, route) {
      if (!route || !route.name) {
        return false
      }
      const currentRouteName = route.name
      if (!currentRouteName.includes('_')) {
        return false
      }
      const [topNavName] = currentRouteName.split('_')
      for (const item of state.menus) {
        // 头部导航状态
        item.active = item.route.startsWith(topNavName)
        if (item.active) {
          state.currentMenu = item
        }
        for (const childItem of item.children) {
          // 左侧导航状态
          childItem.active = childItem.route.startsWith(currentRouteName)
        }
      }
    },
    setMenus (state, menus) {
      state.menus = menus
    }
  }
})
