<template>
  <div id="app">
    <div id="nav">
      <!-- 头部 -->
      <mt-header fixed title="被窝是青春的坟墓"></mt-header>
      <!-- 中间路由的坑 -->
      <transition>
        <router-view></router-view>
      </transition>
      <!-- footer 部分 -->
      <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item " to="/home">
          <span class="mui-icon mui-icon-home"></span>
          <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item" to="/member">
          <span class="mui-icon mui-icon-email"></span>
          <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item" to="/shopcar">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
            <span class="mui-badge" id="badge">{{$store.getters.getallCount}}</span>
          </span>
          <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item" to="search">
          <span class="mui-icon mui-icon-gear"></span>
          <span class="mui-tab-label">搜索</span>
        </router-link>
      </nav>
      <!-- 用git 做一个实验 -->
    </div>
  </div>
</template>
<script>
import mui from "@/lib/mui/js/mui.js"
export default {
  mounted() {
    mui('.mui-bar').on('tap', 'a', function() {
      window.top.location.href = this.href
    })
  }
}
</script>
<style lang="scss" scoped>
#app {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
  .mui-tab-item {
    #badge {
      z-index: 99999;
    }
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
    /*进入起点在屏幕100%部分,即屏幕最右*/
  }
  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    /*离开的终点在屏幕-100%部分*/
    position: absolute;
  }
  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }
}
</style>
