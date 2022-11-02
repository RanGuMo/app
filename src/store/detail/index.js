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
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //state.goodInfo 的初始状态是空对象，空对象的categoryView 为undefined
        //所以必须写成这样state.goodInfo.categoryView ||{}
        //当前计算出来的categoryView至少是一个空对象
        return state.goodInfo.categoryView || {};
    },
    //产品信息简化的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo|| {};
    },
    //产品售卖属性简化的数据
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
};

//对外暴露Store类的一个实例
export default{
    state,
    mutations,
    actions,
    getters
};