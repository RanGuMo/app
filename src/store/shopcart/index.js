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