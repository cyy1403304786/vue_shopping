// 注册vuex
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
// 从本地存储中读取数据
var car = JSON.parse(localStorage.getItem('car')|| '[]')
const store = new Vuex.Store({
    state:{
        //获取商品的id  price  count status
        car:car
    },
    mutations:{
        addCar(state,goods){
            //分析：如果购物车中已经有商品了，那么只需要更新数量
            //如果没有，则直接把商品数据 push 到car 中即可
            //假设在购物车中，没有对应的商品
            var flag = false
            state.car.some(item => {
                if(item.id == goods.id){
                    item.count += parseInt(goods.count)
                    flag = true
                    return true
                }
            })
            if(!flag){
                state.car.push(goods)
            }
            // 进行数据的本地存储
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        // 删除商品的方法
        removeCar(state,id){
            // 根据id 从state 中的购物车中删除对应的商品数据
            state.car.some((item,i) => {
                if(item.id = id){
                    state.car.splice(i,1)
                    return true
                }
            })
            // 将删除完毕的，最新的购物车数据，同步到本地存储中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        // 相当于计算属性
        getallCount(state){
            var c = 0
            state.car.forEach(item => {
                c += item.count
            })
                return c
        },
        // 获取购物车页面的商品数量，通过建立一个空对象的形式来实现
        getgoodsCount(state){
            var obj = {}
            state.car.forEach(item => {
                obj[item.id] = item.count
            })
            return obj
        }
    }
  })

  export default store