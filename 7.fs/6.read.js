const fs=require('fs');
//1.文件太大，不能整个放到内存里边
//2.文件大小未知
fs.open('./6.txt','r',0666,(err,fd) => {
	let buffer=Buffer.alloc(6);//[0,1,2,3,4,5]
	fs.read(fd,buffer,0,3,3,(err,bytesRead) => {
		fs.read(fd,buffer,3,3,6,(err,byteRead) => {
			console.log(buffer.toString());
		});
	});
});