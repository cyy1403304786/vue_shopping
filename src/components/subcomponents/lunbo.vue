<template>
    <div id="home">
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(item,index) in lunbotu" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
 <script>
export default {
    // 用于接收父组件传过来的参数
    props: ['lunbotu']
}
</script>
 <style lang='scss'>
// 轮播图
#home {
    .mint-swipe {
        height: 200px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>