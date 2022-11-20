module.exports = {
  // 打包文件时。不生成map文件，减少打包后的体积（map文件可以告诉你，运行时。报错是在哪一行）
    productionSourceMap:false,
    //关闭eslint
    lintOnSave: false,
     //配置代理跨域
    devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    },
  },
}