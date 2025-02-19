// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router'
import ElementUI from 'element-ui'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import * as d3 from 'd3'

Vue.use(codemirror)
Vue.use(d3)
Vue.use(ElementUI)
Vue.use(BootstrapVue)
Vue.use(VueRouter)

Vue.config.productionTip = false

// const router = new VueRouter({
//   mode: 'history',
//   routes: routers
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
