import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'
import './plugins/iview.js'
import './plugins/axios'
import './scss/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
