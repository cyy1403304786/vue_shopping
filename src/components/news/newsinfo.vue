<template>
    <div>
        <div class="newsinfo-container">
            <!-- 大标题 -->
            <h3 class="title">{{ newsinfo.title }}</h3>
            <!-- 子标题 -->
            <p class="subtitle">
                <span>发表时间：{{ newsinfo.add_time | dataFormat('YYYY-MM-DD HH:mm:ss') }}</span>
                <span>点击：{{ newsinfo.click }}次</span>
            </p>
            <hr>
            <!-- 内容区域 -->
            <div class="content" v-html="newsinfo.content"></div>
        </div>
        <!-- 评论的子组件 -->
        <comment-box :id="this.id"></comment-box>
    </div>

  
</template>
<script>
import Toast from 'mint-ui'
import comment from '../subcomponents/component.vue'


export default {
    data() {
        return {
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    created() {
        this.getNewsinfo()

    },
    methods: {
        getNewsinfo() {
            this.$axios.get(`http://www.lovegf.cn:8899/api/getnew/${this.id}`).then((result) => {
                console.log(result)
                if (result.status === 200) {
                    this.newsinfo = result.data.message[0]
                } else {
                    Toast('数据传输失败')
                }
            })
        }
    },
    // 注册子组件
    components:{
        "comment-box":comment
    }
}
</script>
<style lang="scss" >
    .newsinfo-container {
        padding: 0 4px;
    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 13px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }
    .content {
        img {
            width: 100%;
        }
    }
    }
</style>

