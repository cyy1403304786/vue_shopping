<template>
  <div id="home">
    <!-- 轮播图 -->
    <swiper :lunbotu ='imgList'></swiper>
    <!-- 九宫格 -->
    <div class="mui-content">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/newList.vue">
            <img src="../../images/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/photolist.vue">
            <img src="../../images/menu2.png" alt="">
            <div class="mui-media-body">图片分享</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/goodslist">
            <img src="../../images/menu3.png" alt="">
            <div class="mui-media-body">商品购买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/menu4.png" alt="">
            <div class="mui-media-body">留言反馈</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
            <img src="../../images/menu5.png" alt="">
            <div class="mui-media-body">视频专区</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="#">
             <img src="../../images/menu6.png" alt="">
            <div class="mui-media-body">联系我们</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Toast from 'mint-ui'  
import swiper from '../subcomponents/lunbo.vue' 
export default {
  data() {
    return {
      imgList: []
    }
  },
  components:{
    swiper
  },
  created() {
    // 发起轮播图的数据请求
    this.getLunbo()
  },
  methods: {
    getLunbo() {
      // 使用vue-resource的get请求方式发送数据请求
      this.$http.get("http://www.lovegf.cn:8899/api/getlunbo").then(result => {
        if (result.body.status === 0) {
          // 将请求回来的数据赋值给存放图片的数组
          this.imgList = result.body.message
          console.log(this.imgList)
        } else {
          Toast("数据加载失败") 
        }
      })
    }
  }
}
</script>
<style lang="scss">
#home {
  // 九宫格
  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 13px;
    }
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
}
</style>

