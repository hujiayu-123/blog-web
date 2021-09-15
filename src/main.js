import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router/router'
import store from './store'
import serve from "@/service/api"
import Tinymce from 'tinymce'
import moment from 'moment'
import axios from 'axios'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$tinymce = Tinymce
Vue.prototype.$moment = moment
Vue.prototype.$serve = serve

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
