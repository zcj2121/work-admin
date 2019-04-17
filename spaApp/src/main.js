// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.less' // global css

import App from './App'
import router from './router'
import store from './store'

// import './assets/js/Lib.js'

import 'font-awesome/css/font-awesome.css'

import '@/permission' // permission control

import * as filters from './filters' // global filters

Vue.use(ElementUI)
Vue.config.productionTip = false

// 添加全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      // baseUrl: 'http://localhost:3001/images/'
    }
  },
  store,
  router,
  components: { App },
  template: '<App/>'
})

// router.replace('/edit')
