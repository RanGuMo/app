import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import typeNav from '@/components/TypeNav';
import Carousel from '@/components/Carousel';
import Pagination from '@/components/Pagination'
//第一个参数是全局组件的名字 ，第二个参数：哪一个组件
Vue.component(typeNav.name, typeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
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
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线$bus配置
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  //注册路由
  router,
  //注册仓库：组件实例身上会多一个属性$store属性
  store
}).$mount('#app')
