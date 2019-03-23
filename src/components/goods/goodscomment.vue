<template>
    <comment-box :id="this.id"></comment-box>
</template>
 <script>
 import comments from '../../components/subcomponents/component.vue'
export default{
    components:{
        "comment-box":comments
    },
    data(){
        return {
            id:this.$route.params.id
        }
    }
}
 </script>
 <style lang='scss'>
 </style>