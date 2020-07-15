import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Tinymce from 'tinymce'
import moment from 'moment'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$tinymce = Tinymce
Vue.prototype.$moment = moment

new Vue({
  render: (h) => h(App),
  router,
}).$mount('#app')
