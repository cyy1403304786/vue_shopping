<template>
  <div id="list">
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="(item,index) in datalist" :key="index">
            <router-link :to="'/newsinfo/'+ item.id">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h5 class="title">{{item.title}}</h5>
                    <p class='mui-ellipsis'>
                      <span>发表时间:{{item.add_time |dataFormat('YYYY-MM-DD HH:mm:ss')}}</span>
                      <span>点击:{{item.click}}次</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
  </div>
</template>
<script>
import Toast from 'mint-ui' 
export default {
    data(){
        return {
            datalist:[]
        }
    },
    created(){
        this.getdata()
    },
    methods:{
        getdata(){
            this.$axios.get('http://www.lovegf.cn:8899/api/getnewslist').then((result) => {
                // console.log(result)
                if(result.status === 200){
                  this.datalist = result.data.message
                //   console.log(this.datalist)
                }else{
                    Tost('数据加载失败')
                }
            })
            
        }
    }
   
}
</script>
<style lang="scss">
    #list{
      .mui-media-body{
          .title{
              color:#000; 
              font-weight: 700; 
          }
      }  
      .mui-ellipsis{
        font-size: 12px;
        color: #0094ff;
        display: flex;
        justify-content: space-between;
      }
    }

</style>

