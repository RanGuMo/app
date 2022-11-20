// vue 插件一定对外暴露一个对象
let myPlugins = {};


myPlugins.install = function (Vue, options) {
    Vue.directive(options.name, (element, binding) => {
        // 将value 值变为大写
        element.innerHTML = binding.value.toUpperCase();
    })
    
}

export default myPlugins;