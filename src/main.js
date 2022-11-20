import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import typeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'

import { Button,MessageBox } from 'element-ui';
//第一个参数是全局组件的名字 ，第二个参数：哪一个组件
Vue.component(typeNav.name, typeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);

// elementUI 第一种：注册全局组件
Vue.component(Button.name, Button);
// elementUI 第二种：挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


//引入仓库
import store from './store';

//测试
// import { reqCategoryList } from '@/api';
// reqCategoryList();


//引入路由
import router from '@/router'
//引入mockServe.js 来模拟数据
import '@/mock/mockServe';
//引入swiper样式
import "swiper/css/swiper.css";
// 统一接收 api 文件夹里面的所有请求函数
import * as API from "@/api";
// console.log(API);

// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
import atm from '@/assets/1.gif';
// 注册插件
Vue.use(VueLazyload, {
  loading:atm
})


// 引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
    name:'upper'
})
// 引入表单验证插件
import "@/plugins/validate";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册路由
  router,
  //注册仓库：组件实例身上会多一个属性$store属性
  store
}).$mount('#app')
