import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import './style.css'

Vue.config.productionTip = false

import http from './http.js'
Vue.prototype.$http=http

Vue.mixin({
  methods: {
    getAuthHeaders(){
      return {
        Authorization:`Bearer ${localStorage.token||''}`
      }
    }
  },
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
