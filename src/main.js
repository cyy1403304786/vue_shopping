import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 注册mintUi
import MintUi from 'mint-ui'
Vue.use(MintUi)
import { Swipe, SwipeItem } from 'mint-ui';
import Axios from 'axios'
// 导入缩略图
import Vuepreview  from 'vue-preview'
Vue.use(Vuepreview)
Vue.prototype.$axios = Axios
import Moment from 'moment'
Vue.filter('dataFormat',function(dataStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return Moment(dataStr).format(pattern)
})
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
import 'mint-ui/lib/style.css'
import '@/lib/mui/css/mui.css'
import '@/lib/mui/css/icons-extra.css'


// 导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.config.productionTip = false

//导入vuex
import  store from '@/store/index.js'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
