import Vue from 'vue'
import Router from 'vue-router'
import home from './components/tabbar/home.vue'
import member from './components/tabbar/member.vue'
import search from './components/tabbar/search.vue'
import shopcar from './components/tabbar/shopcar.vue'
import newList from './components/news/newList.vue'
import newsinfo from './components/news/newsinfo.vue'
import photolist from './components/photos/photolist.vue'
import photoinfo from './components/photos/photoinfo.vue'
import goodslist from './components/goods/goodslist.vue'
import goodsinfo from './components/goods/goodsinfo.vue'
import goodsDesc from './components/goods/goodsDesc.vue'
import goodscomment from './components/goods/goodscomment.vue'
Vue.use(Router)

export default new Router({
  linkActiveClass:'mui-active',
  routes: [
    {path:'/home',component:home},
    {path:'/member',component:member},
    {path:'/search',component:search},
    {path:'/shopcar',component:shopcar},
    {path:'/newList.vue',component:newList},
    {path:'/newsinfo/:id',component:newsinfo},
    {path:'/photolist.vue',component:photolist},
    {path:'/photoinfo/:id',component:photoinfo},
    {path:'/goodslist',component:goodslist},
    {path:'/goodsinfo/:id',component:goodsinfo},
    {path:'/goodsDesc/:id',component:goodsDesc},
    {path:'/goodscomment/:id',component:goodscomment},
  ]
})
