<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item,idex) in carinfo" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :count="$store.getters.getgoodsCount[item.id]"></numbox>
                <a href="#" @click.prevent="remove(item.id,idex)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品
              <span class="red"></span> 件， 总价
              <span class="red"></span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from '../subcomponents/shopcar'

// console.log(allCount)
export default {
  components: {
    numbox
  },
  data() {
    return {
      carinfo: [],
      allCount: 0
    }
  },
  created() {
    this.getlist()
    var data = JSON.parse(localStorage.getItem('car'))
    // console.log(this.allCount)
    // data.forEach((item) => {
    //   this.allCount += item.count
    // })
  },
  methods: {
    getlist() {
      var carID = []
      this.$store.state.car.forEach(item => {
        carID.push(item.id)
      })
      if (carID.length <= 0) {
        return
      }
      this.$axios.get("http://www.lovegf.cn:8899/api/goods/getshopcarlist/" + carID.join(',')).then(result => {
        console.log(result)
        if (result.status == 200) {
          this.carinfo = result.data.message
        }
      })
    },
    // 删除商品的功能
    remove(id, idex) {
      // 把组件中对应的那个商品删除
      this.carinfo.splice(idex, 1)
      // 把state 中存储的数据商品进行删除
      this.$store.commit('removeCar', id)
    }
  }

}
</script>
<style lang="scss">
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>