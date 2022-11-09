//统一管理项目前端的接口
import requests from "./request";
import mockRequests from './mockAjax'

//封装函数:复用
//将来这个函数可以在别的地方使用,需要对外暴露【分别暴露】
//获取商品分类的数据
export const reqCategoryList = () => {
    //箭头函数可以在程序任意地方使用,箭头函数返回即为服务器的数据
    //下面箭头函数返回值：返回的是什么? promise,即为返回服务器的数据
    //return关键字，千万别忘记书写，如果忘记书写，你在任意地方获取的都是undeinfed
    return requests({ method: 'get', url: '/product/getBaseCategoryList' });
}
 
//获取首页轮播图数据的接口
export const reqGetBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('/floor');
 

//获取搜索模块数据 /api/list 请求方式：post  参数：需要带参数
// {
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   }
//当这个接口在获取搜索模块数据时，向服务器传递一个默认参数【至少是一个空对象】
export const reqGetSearchInfo = (params) => requests({ url: "/list", method: "post", data: params })

//获取产品详情信息的接口 URL:/api/item/{skuId} 请求方式：get
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中（或者更新某一个产品的个数）
//    /api/cart/addToCart/{skuId}/{skuNum}  post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" });

//获取购物车列表数据 的接口
// URL:/api/cart/cartList  method:get
export const reqCarList = () => requests({ url: '/cart/cartList', method: 'get' });

//删除购物车中产品的接口
//URL:/api/cart/deleteCart/{skuId}  method:delete
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' });

//修改商品的选中状态
//URL:/api/cart/checkCart/{skuId}/{isChecked} method:get
export const reqUpdateCheckedById = (skuId,isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' });

