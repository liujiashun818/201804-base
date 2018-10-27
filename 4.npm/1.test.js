let r = require('test');
console.log(r);

console.log(module.paths); // 第三方的模块查找
// 如果文件不是以./开头 就会去node_module查找
// 如果找不到会继续向上查找node_module 直到当前文件的根目录

// 全局的包
// 命令行工具