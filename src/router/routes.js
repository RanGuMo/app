//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
//路由配置信息
export default [
    {
        path: "/detail/:skuid",
        component: Detail,
        meta:{show:true}
    },
    {
        path: "/home",
        component: Home,
        meta:{show:true}
    },
    {
        path: "/search/:keyword?",
        component:Search,
        meta: { show: true },
        name:"search"
    },
    {
        path: "/login",
        component:Login,
        meta:{show:false}
    },
    {
        path: "/register",
        component:Register,
        meta:{show:false}
    },
    //重定向，当项目运行时，立马让其访问首页
    {
        path: '*',
        redirect:'/home'

    }
]