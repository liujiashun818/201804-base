const fs=require('fs');
//fd file descriptor 文件描述符 是一个数字或者说索引
fs.open('./5.txt','r',(err,fd) => {
	console.log(fd);
	fs.open('./4.txt','r',(err,fd) => {
		console.log(fd);
	});
});