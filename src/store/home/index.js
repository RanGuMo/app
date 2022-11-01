//home模块小仓库
import {reqCategoryList, reqGetBannerList, reqGetFloorList} from '@/api'

//state：仓库存储数据的地方
const state = {
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor组件的数据
    floorList:[],
};
//mutations 修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    //提交floor数据
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
//actions:处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
   //通过api 里的接口调用，向服务器发请求，获取数据
    //定义派发方法
    async categoryList({ commit}) {
        let result = await reqCategoryList();
        // console.log(result)
        if (result.code == 200) {
            commit("CATEGORYLIST",result.data)
        }
    },

    //获取首页轮播图的数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST',result.data)
        }
    },
    //获取Floor数据
    async getFloorList({ commit }) {
        let result = await reqGetFloorList();
        if (result.code == 200) {
            commit('GETFLOORLIST',result.data)
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