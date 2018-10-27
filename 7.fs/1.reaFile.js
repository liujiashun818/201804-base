let fs=require('fs');
//是把整个文件作为一个整体
fs.readFile('./1.txt',{encoding:'utf8'},function (err,data) {
	console.log(err);
	console.log(data);
});
//同步方法是没有回调函数的
let result=fs.readFileSync('./1.txt',{encoding: 'utf8'});
console.log(result);
