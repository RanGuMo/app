//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from 'nprogress'
//引入进度条的样式
import 'nprogress/nprogress.css';
import store from '@/store'; //引入stroe 是为了获取store.state.detail.uuid_token,给请求头携带过去

//axios.create方法执行,其实返回一个axios和request一样的
let requests = axios.create({
    //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
    baseURL: "/api",
    //超时的设置
    timeout: 5000
});

//请求拦截器:将来项目中【N个请求】，只要发请求,会触发请求拦截器!!!
requests.interceptors.request.use(config => {
    //请求拦截器:请求头【header】,请求头能否给服务器携带参数
    //请求拦截器：其实项目中还有一个重要的作用,给服务器携带请求们的公共的参数
    //进度条开始
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段（userTempId），和后端商量好的，供我传值，后端读值
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    nprogress.start();
    return config;
});


//响应拦截器：请求数据返回会执行
requests.interceptors.response.use((res) => {
    //res:实质就是项目中发请求、服务器返回的数据
    //进度条结束
    nprogress.done();
    return res.data;
}, (err) => {
    //终止Promise链
    return new Promise();
});

//最后需要暴露:暴露的是添加新的功能的axios,即为requests
export default requests;
