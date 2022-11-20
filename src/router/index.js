//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
// 引入store 
import store from '@/store';

//使用插件
Vue.use(VueRouter);


//把人家原型对象的push方法进行保存
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//VueRouter.prototype原型对象添加一个方法
//location:路由跳转相关的信息
VueRouter.prototype.push = function (location, resolve, reject) {
    //当前函数this：即为VueRouter类的实例
    //相当于push方法里面this，是windows【完犊子了】
    //利用人家push方法实现路由跳转，保证push里面this,应该vueRouter类的实例

    //面试:函数apply与call区别?
    //相同的地方:都可以篡改函数里面this
    //不同的地方:apply传递参数 数组  call传递参数 逗号分割

    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}


VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //代表真:代表着两个形参接受参数【箭头函数】
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}



//配置路由
let router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的这个y=0.表示切换路由后，滚动条在最顶部
        return { y: 0 }
      }
})

//全局守卫： 前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // to:可以获取到你要跳转到哪里的那个路由信息
    // from:可以获取 从哪个路由来的信息
    // next：放行函数  next() 放行 next(path) 放行到指定的路由     next(false)
    // console.log(to);
    // 用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户已经登录 就不能再去login页面了[停留在首页]
        if (to.path == "/login") {
            next("/home");
        } else {
            // 登录了，但是去的不是login页面
            if (name) {
                next();
            } else {
                // 没有用户信息，派发action 让仓库存储用户信息再跳转
                try {
                    // 获取用户信息成功，放行
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // token 失效了 获取不到用户信息
                    // 清除token
                    await store.dispatch("userLoginOut");
                    next("/login");
                }
              
           }
            
        }
    } else {
        // 未登录，不能去交易相关的页面[trade],不能去支付相关【pay|paysuccess】，不能去个人中心【center】
        // 而是要跳转到登录页面
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录的时候 想去而没有去成的信息。保存到地址栏中【路由】
            next('/login?redirect='+toPath);
        } else {
            // 去的不是上面的路由 而是（home，search，shopcart。。。） 放行
            next();
        }
         
        
    }

})

export default router;