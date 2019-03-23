<template>
    <div id="comment">
        <h3>发表评论</h3>
        <hr>
        <textarea name="" id="" placeholder="超级喜欢你" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComent">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,index) in comments" :key="index">
                <div class="cmt-title">
                    第{{index+1}}楼 用户：匿名用户 发表时间：{{item.add_time | dataFormat('YYYY-MM-DD HH:mm:ss')}}
                </div>
                <div class="cmt-body">
                    {{item.content}}
                </div>
            </div>
        </div>
        <mt-button class=" mint-button mint-button--danger is-plain " size="large" @click="loadMore">加载更多</mt-button>
    </div>
</template>
<script>
import Toast from "mint-ui"
export default {
    data() {
        return {
            pageIndex: 1,
            comments: [],
            msg: ''
        }
    },
    created() {
        this.getComponenet()
    },
    methods: {
        getComponenet() {
            this.$axios.get(`http://www.lovegf.cn:8899/api/getcomments/${this.id}?pageindex=${this.pageIndex}`).then((result) => {
                console.log(result)
                if (result.status == 200) {
                    this.comments = result.data.message
                } else {
                    Toast('加载失败')
                }
            })
        },
        loadMore() {
            this.pageIndex++
            this.$axios.get(`http://www.lovegf.cn:8899/api/getcomments/${this.id}?pageindex=${this.pageIndex}`).then((result) => {
                if (result.status == 200) {
                    this.comments = this.comments.concat(result.data.message)
                } else {
                    Toast('加载失败')
                }
            })

        },
        postComent() {
            this.$axios.post(`http://www.lovegf.cn:8899/api/postcomment/${this.id}`, { content: this.msg.trim() }).then((result) => {
                // console.log(result)
                // if (this.msg.trim().length === 0) {
                //     return Toast("评论内容不能为空！");
                // }
                if (result.status == 200) {
                    var cmt = {
                        user_name: "匿名用户",
                        add_time: Date.now(),
                        content: this.msg.trim()
                    }
                    this.comments.unshift(cmt)
                    this.msg=''
                }
            })
        }
    },
    props: ["id"]

}
</script>
<style lang="scss">
#comment {
    h3 {
        font-size: 17px;
    }
    textarea {
        font-size: 14px;
    }
    .cmt-list {
        margin-top: 5px;
        margin-bottom: 5px;
        .cmt-item {
            font-size: 13px;
            .cmt-title {
                line-height: 30px;
                background-color: #e7e5e5;
            }
            .cmt-body {
                line-height: 35px;
                text-align: center;
            }
        }
    }
}
</style>

