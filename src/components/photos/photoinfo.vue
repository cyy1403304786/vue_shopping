<template>
    <div>
        <h5 class="title">我有一所房子，面朝大海，春暖花开</h5>
        <p class="detail">
            <span class="time">发表时间：2019-3-12</span>
            <span class="count">点击：0次</span>
        </p>
        <hr>
        <!-- 缩略图 -->
        <div class="thumbs">
            <!-- <img class="preview-img" v-for="(item, index) in pholist" :src="item.src" height="100" :key="index"> -->
            <vue-preview :slides="pholist" @close="handleClose"> </vue-preview>
        </div>
        <p>
            从明天起，做一个幸福的人，喂马，劈柴，周游世界。从明天起，关心粮食和蔬菜，我有一所房子， 面朝大海，春暖花开。从明天起和每一个亲人通信，告诉他们我的幸福，那幸福的闪电告诉我的，我将 告诉每一个人
        </p>
        <cmt-box :id="id"></cmt-box>
    </div>
</template>
 <script>
import comment from '../subcomponents/component.vue'
export default {

    data() {
        return {
            id: this.$route.params.id,
            pholist: []
        }
    },
    created() {
        this.getPhotoInfo(),
            this.getThumbs()
    },
    methods: {
        getPhotoInfo() {
            // 获取图片的详情
            this.$axios.get('http://www.lovegf.cn:8899/api/getimageInfo/' + this.id).then(result => {
                // console.log(result)
            })
        },
        getThumbs() {
            // 获取缩略图
            this.$axios.get('http://www.lovegf.cn:8899/api/getthumimages/' + this.id).then(result => {
                if (result.status === 200) {
                    result.data.message.forEach(function(item) {
                        item.msrc = item.src
                        item.w = 600
                        item.h = 400
                    })
                    this.pholist = result.data.message
                }
                console.log(result)
            })
        },
        handleClose() {
            console.log('close event')
        }
    },
    // 注册子组件
    components: {
        "cmt-box": comment
    }
}
</script>
 <style lang='scss'>
.title {
    text-align: center;
    font-size: 15px;
    color: #26a2ff;
    font-weight: 700;
    margin: 15px auto;
}

.detail {
    display: flex;
    justify-content: space-between;
}

.thumbs {
    // padding: 0 20px;
   /deep/.my-gallery {
        display: flex;
        flex-wrap: wrap;
        // justify-content: flex-start;
        justify-content: space-between;
        img{
            width: 200px;
            height: 150px;
        }
    }
}

</style>