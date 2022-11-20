<template>
  <div>
    <!-- <h1 v-upper="msg"></h1> -->
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home 和Search显示，登录和注册隐藏 -->
    <!-- <Footer
      v-show="$route.path == '/home' || $route.path == '/search'"
    ></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      msg:'abc',
    }
  },
  components: {
    Header,
    Footer,
  },
  mounted() {
    //通知Vuex 发请求，获取数据，并存储于仓库中
    //派发categoryList方法
    this.$store.dispatch("categoryList");
    
  },
};
</script>

<style scoped>
</style>
