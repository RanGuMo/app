//引入路由组件
// import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";

// 引入二级路由组件
import MyOrder from "@/pages/Center/myOrder";
import GroupOrder from "@/pages/Center/groupOrder";
//路由配置信息
export default [
    {
        path: "/center",
        component: ()=>import("@/pages/Center"),
        meta: { show: true },
        // 二级路由组件
        children: [
            {
                path: 'myorder', //无需带斜杠 /
                component:MyOrder,
            },
            {
                path: 'grouporder', //无需带斜杠 /
                component:GroupOrder,
            }, {
                path: '/center',  //路由重定向，如果访问 /center ,则跳转到/center/myorder
                redirect:'/center/myorder'
            }
        ]
    },
    {
        path: "/paysuccess",
        component: ()=>import("@/pages/PaySuccess"),
        meta:{show:true}
    },
    {
        path: "/pay",
        component: ()=>import("@/pages/Pay"),
        meta: { show: true },
           // 路由独享守卫
           beforeEnter: (to, from, next) => {
            // 只有从trade 过来的路由，才能进 /pay
            if (from.path == '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/trade",
        component: ()=>import("@/pages/Trade"),
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有从shopcart 过来的路由，才能进 /trade
            if (from.path == '/shopcart') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        path: "/shopcart",
        component: ()=>import("@/pages/ShopCart"),
        meta:{show:true}
    },
    {
        path: "/addcartsuccess",
        name:"addcartsuccess",
        component: ()=>import("@/pages/AddCartSuccess"),
        meta:{show:true}
    },
    {
        path: "/detail/:skuid",
        component: ()=>import("@/pages/Detail"),
        meta:{show:true}
    },
    {
        path: "/home",
        // component: Home,
        // 路由懒加载
        component: ()=>import("@/pages/Home"),

        meta:{show:true}
    },
    {
        path: "/search/:keyword?",
        component:()=>import("@/pages/Search"),
        meta: { show: true },
        name:"search"
    },
    {
        path: "/login",
        component:()=>import("@/pages/Login"),
        meta:{show:false}
    },
    {
        path: "/register",
        // 路由懒加载
        component:()=>import("@/pages/Register"),
        meta:{show:false}
    },
    //重定向，当项目运行时，立马让其访问首页
    {
        path: '*',
        redirect:'/home'

    }
]