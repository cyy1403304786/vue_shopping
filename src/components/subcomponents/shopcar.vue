<template>
  <div class="mui-numbox" data-numbox-min='1'>
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input id="test" class="mui-input-numbox" type="number" :value="count" ref="numbox"  @change="countChanged"/>
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>
 <script>
 import  mui from  '../../lib/mui/js/mui.js'
    export default{
        mounted(){
            mui(".mui-numbox").numbox().setOption('step',1)
            // console.log(this.max)
            // mui(".mui-numbox").numbox().setOption('max',5)
        },
        methods:{
            countChanged(){
                this.$emit('getcount',parseInt(this.$refs.numbox.value))
            }
        },
        props:['maxcount','count'],
        watch:{
            // 进行属性监听
            maxcount:{
                function (newCount,oldCount){
                   mui(".mui-numbox").numbox().setOption('max',newCount) 
                }
    
            }   
        },
        
}
 </script>
 <style lang='scss'>
 </style>