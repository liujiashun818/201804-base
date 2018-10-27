(function (modules) { // webpackBootstrap webpack的启动文件
  // install a JSONP callback for chunk loading
  //安装 一个JSONP的回调为了动态加载代码块
  //(window["webpackJsonp"] = window["webpackJsonp"] || []).push
  // data  = [[0],{}]
  function webpackJsonpCallback(data) {
    var chunkIds = data[0];//chunkIds代码块ID数组
    var moreModules = data[1];//这些模块ID对应的模块代码

    // add "moreModules" to the modules object,
    // 把这些额外的模块添加到模块对象中
    //循环moreModules的每一个属性,把moreModules的属性和值赋给modules
    for (moduleId in moreModules) {
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }

    // then flag all "chunkIds" as loaded and fire callback
    //然后把所有的模块ID作为已加载，并且触发回调函数执行
    var moduleId, chunkId, i = 0, resolves = [];
    for (; i < chunkIds.length; i++) {//chunkIds=[0]
      chunkId = chunkIds[i];//0
      if (installedChunks[chunkId]) {//installedChunks[chunkId]=[resolve,reject,promise]
        //把所有resolve方法放到了resolves数组中
        resolves.push(installedChunks[chunkId][0]);
      }
      //把它置为0，0表示加载完成
      installedChunks[chunkId] = 0;
    }
    //parentJsonpFunction 把data放到了window["webpackJsonp"]数组里去了
    if (parentJsonpFunction) parentJsonpFunction(data);
    //循环resolve数组，从左往后执行，让所有的promise都成功
    while (resolves.length) {
      resolves.shift()();
    }

  };


  // The module cache 模块的缓存
  var installedModules = {};

  // object to store loaded and loading chunks 是一个对象，存放已经加载或者加载中的代码块
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // chunk等于undefined就表示未加载,chunk=null表示预加载或者以预获取
  // Promise = chunk loading, 0 = chunk loaded
  // Promise表示代码加载中,0加载完成
  // 转换过程 未加载-预加载-加载中-加载完成 undefined -> null -> Promise -> 0
  var installedChunks = {
    "main": 0
  };



  // script path function 参数是代码块的ID，返回值是代码块的加载路径
  function jsonpScriptSrc(chunkId) {
    //return  /0.js
    return __webpack_require__.p + "" + ({}[chunkId] || chunkId) + ".js"
  }

  // The require function 加载函数 参数是模块的ID，
  function __webpack_require__(moduleId) {

    // Check if module is in cache 检查缓存里有没有，如果有直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    //创建一个新的模块，并且放置到缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,//identify 模块的标识符 模块ID
      l: false,//loaded 是否已经加载
      exports: {}//导出对象
    };

    // Execute the module function
    //执行模块的函数
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块的加载状态设置为true
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;
  }

  // This file contains only the entry chunk.
  // 这个文件只包含入口的代码块
  // The chunk loading function for additional chunks
  //这个代码块加载函数是为了动态加载额外的代码块的
  //e  ensure 加载 确保
  __webpack_require__.e = function requireEnsure(chunkId) {//0
    //声明一个 promise的空数组
    var promises = [];

    // JSONP chunk loading for javascript
    // 通过JSONP来加载JS
    /**
     * var installedChunks = {
        "main": 0
      };
     */
    // undefined
    var installedChunkData = installedChunks[chunkId];

    if (installedChunkData !== 0) { // 0 means "already installed".0意味着已经安装完成

      // a Promise means "currently loading". 如果是一个promise的话表示正在加载
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache 在chunk的缓存中创建一个Promise
        var promise = new Promise(function (resolve, reject) {
          //resovle reject放到一个数组中赋给 installedChunks[0] = [resolve, reject,promise]
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        promises.push(installedChunkData[2] = promise);

        // start chunk loading 开始加载代码块
        //取得head标签
        var head = document.getElementsByTagName('head')[0];
        //创建script标签
        var script = document.createElement('script');
        //当脚本加载完成后
        var onScriptComplete;
        //指定脚本的编码
        script.charset = 'utf-8';
        //指定超时时间是2分钟
        script.timeout = 120;
        //nonce是用来防重放攻击 防csrf
        if (__webpack_require__.nc) {
          script.setAttribute("nonce", __webpack_require__.nc);
        }
        //拼出一个请求路径 /0.js
        script.src = jsonpScriptSrc(chunkId);

        onScriptComplete = function (event) {
          // avoid mem leaks in IE.
          script.onerror = script.onload = null;
          clearTimeout(timeout);
          //取得当前chunkId的chunk [resolve,reject,promise]
          var chunk = installedChunks[chunkId];
          //如果说chunk不等0表示加载失败了,等于0表示加载成功
          if (chunk !== 0) {
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
              error.type = errorType;
              error.request = realSrc;
              //chunk[1] reject(error) 让promise失败
              chunk[1](error);
            }
            //重置 为undefined
            installedChunks[chunkId] = undefined;
          }
        };
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  //暴露模块的对象 m=modules
  __webpack_require__.m = modules;

  // expose the module cache 模块的缓存 cache=installedModules
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  //定义getter函数为了输出
  __webpack_require__.d = function (exports, name, getter) {
    //如果说exports对象不拥有name属性
    if (!__webpack_require__.o(exports, name)) {//own
      //defineProperty(obj,attr,discriptor)
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  //在导出对象上定义__esModule属性
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      // exports[Symbol.toStringTag] = "Module";
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    //给导出对象定义__esModule属性  exports.__esModule = true;  
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object 创建一个命名空间对象
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  //__webpack_require__.t.bind(null,  \"./src/click.js\", 7)
  //__webpack_require__.t(\"./src/click.js\", 7);
  __webpack_require__.t = function (value, mode) {
    //第一步就是加载value的模块
    if (mode & 1) value = __webpack_require__(value);
    //如果与8为true的话直接返回
    if (mode & 8) return value;
    //value='click'
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule)
      return value;
    //创建了一个空对象
    var ns = Object.create(null);
    __webpack_require__.r(ns);//ns.__esModule=true
    //ns.default = value
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    //把value上的所有属性全部拷贝到ns上
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // __webpack_public_path__
  __webpack_require__.p = "";

  // on error function for async loading
  __webpack_require__.oe = function (err) { console.error(err); throw err; };
  //jsonArray= window["webpackJsonp"]=[]
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  //取到jsonpArray.push,把this绑定为jsonArray.oldJsonpFunction= [].push
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  ///给 jsonpArray.push重新赋值 webpackJsonpCallback
  //(window["webpackJsonp"] = window["webpackJsonp"] || []).push
  jsonpArray.push = webpackJsonpCallback;
  //构建了一个新的数组
  jsonpArray = jsonpArray.slice();
  //循环新数组中的所有元素,执行回调
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  //把老的oldJsonpFunction赋给了parentJsonpFunction jsonpArray.push
  var parentJsonpFunction = oldJsonpFunction;


  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({

/***/ "./src/index.js":
/*! no static exports found */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function (module, exports, __webpack_require__) {

        "use strict";
        eval("document.getElementById('container').addEventListener('click', function () {\n    __webpack_require__.e(0).then(__webpack_require__.t.bind(null,  \"./src/click.js\", 7)).then(function (mod) {\n        console.log(mod, mod.default);\n        var name = mod.default();\n        alert(name);\n    });\n});\n\n//# sourceURL=webpack:///./src/index.js?");

        /***/
      })

  });