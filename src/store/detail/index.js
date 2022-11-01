//detail模块小仓库
import { reqGoodsInfo } from "@/api";

//state：仓库存储数据的地方
const state = {
    goodInfo:{}
    
};
//mutations 修改state的唯一手段
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取产品信息 的action
    async getGoodInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit("GETGOODINFO",result.data)
        }
    }
  
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};

//对外暴露Store类的一个实例
export default{
    state,
    mutations,
    actions,
    getters
};