// 模块化 (AMD CMD )规范
// 模块化(私有化，互相调用，方便代码维护);
// 1、写法都是统一的
// 单例模式 , 闭包
// 函数执行后返回一个引用空间这个空间被外部引用，此空间无法销毁。这就叫闭包 函数执行的时候也会产生一个闭包
// requiresjs(依赖解析) seajs(不在维护) eval / new Function
// esModule es6规范的 （node里不支持 ）babel进行转义
// mjs(没人用)
// commonjs 规范
// 1.模块实现(一个js文件就是一个模块)为了实现模块化的功能每个文件外面都包含一个闭包
// 2.规定如何导出一个模块 module.exports 
// 3.如果导入一个模块  require

// node中有三种模块
// 核心模块。内置模块 fs http  net url util .... node提供的 不需要下载的
// 第三方模块 别人写的 我只需要安装一下 用法和核心模块一样
// 文件模块 我自己写的

// umd 