import './index.css';
let logo = require('./images/logo.png');
//1. 拷贝文件 2 返回一个新的相对于dist目录的绝对路径
console.log(logo);// b15c113aeddbeb606d938010b88cf8e6.png
let img = new Image();
img.style.width = '150px';
img.style.height = "50px";
img.src = logo;
document.querySelector('#logo1').appendChild(img);
let base = require('./base.ts');
console.log(base);