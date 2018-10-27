// url 完整的路径 
// http://username:password@www.zhufeng.cn:8080/src/index.html?a=1&b=2#hash


// hash在服务器是获取不到的
let url = require('url');
let str = 'http://username:password@www.zhufeng.cn:8080/src/index.html?a=1&b=2#hash'
let {pathname,query} = url.parse(str,true);

let str1 = 'a=1&b=2&c=3';

let obj = {}
str1.replace(/([^=&]+)=([^=&]+)/g,function(){
    obj[arguments[1]] = arguments[2];
})
console.log(obj);

// {
//     protocol: 'http:',
//     slashes: true,
//     auth: 'username:password',
//     host: 'www.zhufeng.cn:8080', //主机
//     port: '8080',
//     hostname: 'www.zhufeng.cn', //主机名
//     hash: '#hash',
//     search: '?a=1&b=2',
//     query: 'a=1&b=2',   // 问号后面的
//     pathname: '/src/index.html', // 路径 根据不同的路径返回不同的资源
//     path: '/src/index.html?a=1&b=2',
//     href: 'http://username:password@www.zhufeng.cn:8080/src/index.html?a=1&b=2#hash' }

// 请求方法
// GET PUT DELETE POST (restful API )风格

