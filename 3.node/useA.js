let path = require('path');
let fs = require('fs');
let vm = require('vm');
function Module(filename) {
  this.loaded = false;
  this.filename = filename; // 文件的绝对路径
  this.exports = {} // 模块对应的导出结果
}
Module._extensions = ['.js','.json'];

Module._resolveFilename = function (p) {
  p = path.join(__dirname,p); // c://xx/a
  if(!/\.\w+$/.test(p)){
    // 尝试添加扩展名
    for(let i = 0;i<Module._extensions.length;i++){
      let filePath = p + Module._extensions[i];// 拼出一个路径
      // 判断文件是否存在
      try{
        fs.accessSync(filePath);
        return filePath;
      }catch(e){
        if (i >= Module._extensions.length){
          throw new Error('module not Found')
        }
      }
    }
  }else{
    return p
  }
}
Module._cache = {};
Module._extensions['.json'] = function (module) {
  let content = fs.readFileSync(module.filename,'utf8');
  module.exports = JSON.parse(content)
}

Module.wrapper = ['(function (exports,require,module){','\r\n})'];
Module.wrap = function (content) {
  return Module.wrapper[0] + content + Module.wrapper[1];
}
Module._extensions['.js'] = function (module) {
  let content = fs.readFileSync(module.filename, 'utf8');
  let script = Module.wrap(content);
  let fn = vm.runInThisContext(script);
  // module.exports = exports = {}
  // exports.a = 'hello world'
  fn.call(module.exports, module.exports, req, module);
}
Module.prototype.load = function () {
  // 加载模块本身 js按照js加载 json按照json加载
  let extname = path.extname(this.filename);
  Module._extensions[extname](this);
}
function req(path) { // 自己实现的require方法 可以加载模块
  // 先要根据路径 变出一个绝对路径
  let filename = Module._resolveFilename(path);
  // 文件路径 (绝对路径) 唯一
  if (Module._cache[filename]){
    // 如果加载过直接把加载的结果返回即可
    // 有缓存把exports属性导出即可
    return Module._cache[filename].exports;
  }
  // 通过这个文件名创建一个模块
  let module = new Module(filename);
  module.load(); // 让这个模块进行加载 根据不同的后缀加载不同的内容
  Module._cache[filename] = module; // 进行模块的缓存
  // 返回最后的结果
  return module.exports;
}
// module.exports exports 有什么关系
let str = req('./b.js');
str = req('./b.js');
console.log(str);

// 多次require只会执行一次 cache

//1.写一个自己的require方法
//2.Moudle是一个类
//3.要实现一个Module._load方法实现模块的加载
//4.Module._resolveFilename 解析路径的
//5.Module._cache加载的缓存
//6.创建一个模块
//7.放到缓存中
//8.Module._extensions

