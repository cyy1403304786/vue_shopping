<template>
    <div>
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="(item,index) in cateList" :key="index">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>
        <!-- 图片加载区域 -->
        <ul class="imglist">
            <router-link v-for="item in list" :key="item.id" :to="'/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
            </router-link>
        </ul>
    </div>
</template>
 <script>
import mui from "@/lib/mui/js/mui.js"
export default {
    data() {
        return {
            cateList: [],  //所有分类的列表
            list: []
        }
    },
    created() {
        this.getPhoto(),
            this.getPhotoList(0)
    },
    methods: {
        // 获取所有的图片列表
        getPhoto() {
            this.$axios.get('http://www.lovegf.cn:8899/api/getimgcategory').then(result => {
                // console.log(result)
                if (result.data.status === 0) {
                    result.data.message.unshift({ title: "全部", id: 0 })
                    this.cateList = result.data.message
                }
            })
        },
        getPhotoList(cateId) {
            this.$axios.get(`http://www.lovegf.cn:8899/api/getimages/${cateId}`).then(result => {
                console.log(result)
                if (result.data.status === 0) {
                    this.list = result.data.message
                }
            })
        }
    },
    mounted() {
        mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
    }
}
</script>
 <style lang='scss'>
* {
    touch-action: pan-y;
}
.imglist{
    list-style: none;
    margin: 0;
    padding: 0;
    li{
        background-color: #999;
        padding: 0,10px;
        margin-bottom: 5px;
        img{
            width: 100%;
            vertical-align: middle;
        }
    }
}
img[lazy=loading] {
    width: 40px;
    height: 300px;
    margin: auto;
}
</style>