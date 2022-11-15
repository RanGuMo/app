//shopcart模块小仓库

import { reqCarList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

//state：仓库存储数据的地方
const state = {
    cartList:[],
  
};
//mutations 修改state的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取购物车列表数据
    async getCartList({commit}) {
        let result = await reqCarList();
        console.log(result);
        if (result.code == 200) {
            commit("GETCARTLIST",result.data)
        }
    },
    //删除购物车某一个产品
   async deleteCartListBySkuId({commit},skuId) {
       let result = await reqDeleteCartById(skuId);
       if (result.code == 200) {
           return 'ok';
       } else {
           return Promise.reject(new Error('fail'));
       }

    },
   //修改购物车某一个产品的选中状态 (注意，这里要这样写（踩坑了。。。）  { skuId, isChecked })
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        //console.log(skuId, isChecked,result);
        if (result.code == 200) {
            return 'ok';
        } else {
             return Promise.reject(new Error('fail'));
        }
    },
    //删除勾选的商品
    deleteAllCheckedCart({ dispatch, getters }) {
        //contex：就是当前的小仓库，commit【提交mutation修改state】 getters【计算属性】 dispatch【派发action】 state【当前仓库的数据】
        let PromiseAll = [];
        //console.log(getters);
        getters.cartList.cartInfoList.forEach(item => {
           let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : '';
           //将每一次返回的result 添加到数组中
            PromiseAll.push(result);
            
        });
        // 只要所有的 result 都成功，返回结果即为成功
        // 如果有一个失败，返回即为失败
        //console.log(PromiseAll);
        return Promise.all(PromiseAll);
    },
    // 修改全部产品的状态
    updateAllCartIsChecked({dispatch,state},isChecked) {
        //console.log(state, isChecked);
        // 定义一个数组
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked });
            promiseAll.push(promise);
        });
        //最终返回的结果
        return Promise.all(promiseAll);

    }
       
  
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
  },

};

//对外暴露Store类的一个实例
export default{
    state,
    mutations,
    actions,
    getters
};