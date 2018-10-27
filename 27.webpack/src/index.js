//$是模块内的一个局部变量，并非全局变量
// !就是指定用哪个loader来加载这个模块 ?是查询参数
//let $ = require('expose-loader?jQuery!jquery');
//console.log($);
let $ = require('jquery');
//let $ = window.jQuery;
mobx
console.log($, 1);

