import { reqGetCode, reqUserLogin, reqUserRegister } from '@/api';
//登录与注册模块
const state = {
    code: '',
    token:'',
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    }
};
const actions = {
   //获取验证码
    async getCode({ commit }, phone) {
        //这个获取验证码的接口，是直接将验证码返回，【为了省钱】
        // 正常情况下，后台把验证码发到用户的手机上
        let result = await reqGetCode(phone);
        // console.log(result);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error('fail'));
        }
    },
    //用户注册
    async userRegister({ commit }, user) {
        let result = await reqUserRegister(user);  
        // console.log(result);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error("fail"));
        }
    },
    // 登录业务 【token】
  async  userLogin({ commit }, data) {
      let result = await reqUserLogin(data);
    //   console.log(result);
    //   服务器下发token：用户的唯一标识（类似uuid）
    //   将来经常通过携带token 来找服务器要用户信息 进行展示
      if (result.code == 200) {
          commit("USERLOGIN", result.data.token);
          return "ok";
      } else {
          return Promise.reject(new Error('fail'));
      }
    }

};
const getters = {};

export default{
    state,
    mutations,
    actions,
    getters
}