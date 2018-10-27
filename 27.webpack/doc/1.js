(function (modules) { // webpackBootstrap
    debugger;
    // The module cache 缓存的缓存
    var installedModules = {};

    // The require function 在浏览器里模拟了一个类似于node中require方法 commonjs 规范
    function __webpack_require__(moduleId) {

        // Check if module is in cache 检查模块是否在缓存中存在,如果有的话，说明已经加载过多，则直接返回导出对象
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)如果没有缓存过，则创建一个新的模块对象，并且放置到缓存中
        var module = installedModules[moduleId] = {
            i: moduleId, // indentify 模块标识符 其实就是模块ID
            l: false, // loaded 是否初始化或加载完成
            exports: {} //模块的导出对象
        };

        // Execute the module function 执行模块的函数
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded 把模块标记为已加载
        module.l = true;

        // Return the exports of the module 返回的是模块的导出对象
        return module.exports;
    }
    // Load entry module and return exports
    return __webpack_require__("./src/index.js");
})
    ({
        "./src/index.js":
            (function (module, exports) {
                eval("console.log('hello');");
            })
    });