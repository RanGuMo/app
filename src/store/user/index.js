import { reqGetCode, reqUserLogin, reqUserRegister, reqUserInfo,reqLoginOut } from '@/api';
import { setToken,getToken ,removeToken} from '@/utils/token';
//登录与注册模块
const state = {
    code: '',
    token:getToken(),
    userInfo:{},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code;
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    // 清除本地数据
    CLEAR(state) {
        // 把仓库中相关用户信息清空
        state.token = "";
        state.userInfo = {};
        // 把本地存储数据清空
        removeToken();
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
        //   用户已经登录成功 且获取到token
          commit("USERLOGIN", result.data.token);
        //   持久化存储token
        //   localStorage.setItem("TOKEN", result.data.token);
          setToken(result.data.token);
          return "ok";
      } else {
          return Promise.reject(new Error('fail'));
      }
    },
   // 获取用户信息
   async getUserInfo({ commit }) {
      let result = await reqUserInfo();
       //    console.log(result); 
       if (result.code == 200) {
          // 提交用户信息
           commit("GETUSERINFO", result.data);
           return "ok";
       } else {
           return Promise.reject(new Error("fail"));
    }
    },
   //退出登录
   async userLoginOut({commit}) {
    // 只是向服务发起一次请求，通知服务器清除token
       let result = await reqLoginOut();
    //    在actions 里面 不能操作state ，需要提交mutation 来修改state
       if (result.code == 200) {
           commit("CLEAR");
           return "ok";
       } else {
           return Promise.reject(new Error("fail"));
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