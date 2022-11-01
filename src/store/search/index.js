//search模块小仓库

import { reqGetSearchInfo } from "@/api";

//state：仓库存储数据的地方
const state = {
    searchList:{},
};
//mutations 修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data);
        }
    }
};
//getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {
    //当前形参state，是当前仓库中的state，并非大仓库中的那个state
    goodsList(state) {
        //state.searchList.goodsList 如果服务器数据回来了，没问题，的确是一个数组
        //假如网络不给力或者没有网  state.searchList.goodsList 应该返回的是undefined
        //计算新的属性的属性值，至少给人家来一个数组
        return state.searchList.goodsList ||[]  
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }

};

//对外暴露Store类的一个实例
export default{
    state,
    mutations,
    actions,
    getters
};