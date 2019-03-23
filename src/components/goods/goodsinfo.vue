<template>
    <div class="goodsinfo-container">
        <!-- 小球动画 -->
        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>

        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunbotu='lunbotu'></swiper>
                </div>
            </div>
        </div>
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品名称</div>
            <div class="mui-card-content" v-for="(item,index) in goodsinfolist" :key="index">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：
                        <del>￥{{item.market_price}}</del>
                        销售价：
                        <span>￥{{item.sell_price}}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getselectCount" :maxcount="goodsinfolist.stock_quantity"></numbox> </P>

                    <br>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click="move()">加入购物车</mt-button>
                </div>
            </div>
        </div>
        <!-- 商品参数区域 -->
        <div class="mui-card" v-for="(item,index) in goodsinfolist" :key="index">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：SD9102356032</p>
                    <p>库存情况：{{item.stock_quantity}}件</p>
                    <p>上架时间：{{item.add_time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>
 <script>
import swiper from '../subcomponents/lunbo.vue'
import numbox from '../subcomponents/shopcar'
export default {

    data() {
        return {
            id: this.$route.params.id,
            lunbotu: [],
            ballFlag: false,
            goodsinfolist: [],
            selectedCount:1
        }
    },
    created() {
            this.getLunbotu(),
            this.goodsinfo()
    },
    methods: {
        getLunbotu() {
            this.$axios.get('http://www.lovegf.cn:8899/api/getthumimages/' + this.id).then(result => {
                // console.log(result)
                if (result.status === 200) {
                    result.data.message.forEach(item => {
                        item.img = item.src
                    })
                    this.lunbotu = result.data.message
                }
            })
        },
        goodsinfo() {
            this.$axios.get('http://www.lovegf.cn:8899/api/goods/getinfo/' + this.id).then(result => {
                console.log(result)
                if (result.status === 200) {
                    this.goodsinfolist = result.data.message
                }
            })
        },
        move() {
            // 加入购物车功能,拼装数据触发store 中改变数据的方法
            this.ballFlag = !this.ballFlag
            // 需要传递商品的 id  price  count selected 
            var goods = {
                id: this.id,
                count: this.selectedCount,
                price: this.goodsinfolist.sell_price,
                selected: true
            }
            this.$store.commit('addCar',goods)
            // ballFlag = false
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
        },
        enter(el, done) {
            el.offsetWidth;

            el.style.transform = "translate(93px,230px)";
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";

            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        countChanged() {
            // console.log(this.$refs.count.value)
        },
        goDesc(id) {
            this.$router.push('/goodsDesc/' + id)
        },
        goComment(id) {
            this.$router.push('/goodscomment/' + id)
        },
        getselectCount(count){
            this.selectedCount = count
            // console.log(this.selectedCount)
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>
 <style lang='scss'>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
}

.mui-card {
    .mui-card-footer {
        display: block;
        button {
            margin: 15px 0;
        }
    }
}

.ball {
    width: 16px;
    height: 16px;
    border-radius: 8px;
    position: absolute;
    z-index: 99;
    left: 150px;
    top: 390px;
    background-color: red;
}
</style>