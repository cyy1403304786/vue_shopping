<template>
    <mt-loadmore :autoFill='false' :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <div class="goods-list">
            <div class="goods-item" v-for="(item,index) in goodslist" :key="index" @click="getgoodsinfo(item.id)">
                <img :src="item.img_url" alt="">
                <h1 class="title">{{item.title}}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{item.sell_price}}</span>
                        <span class="old">￥{{item.market_price}}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩{{item.stock_quantity}}件</span>
                    </p>
                </div>
            </div>
        </div>
    </mt-loadmore>
</template>
 <script>
export default {
    data() {
        return {
            pageindex: 1,
            goodslist: []
        }
    },
    created() {
        this.getgoodslist()
    },
    methods: {
        getgoodslist() {
            this.$axios.get('http://www.lovegf.cn:8899/api/getgoods?pageindex=' + this.pageindex).then(result => {
                // console.log(result)
                if (result.status === 200) {
                    this.goodslist = result.data.message
                }
                if (this.pageindex == 1) {
                    // 重置下拉状态
                    this.goodslist = result.data.message
                } else {
                    // 重置上拉状态
                    this.goodslist = this.goodslist.concat(result.data.message);
                }
            })
        },
        // 下拉
        loadTop() {
            console.log("下拉");
            this.$refs.loadmore.onTopLoaded()
            this.getgoodslist();    
        },
        //上拉
        loadBottom() {
            console.log("上拉");
            this.pageindex++;
            this.allLoaded = true
            this.$refs.loadmore.onBottomLoaded();
            this.getgoodslist();
        },
        getgoodsinfo(id){
            this.$router.push('/goodsinfo/'+ id)
        }
    }
}
</script>
 <style lang='scss'>
.goods-list {
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        .title {
            font-size: 14px;
        }
        .info {
            background-color: #eee;
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                .now {
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 13px;
            }
        }
    }
}
</style>