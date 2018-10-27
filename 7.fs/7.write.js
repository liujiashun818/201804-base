const fs=require('fs');
fs.open('./6.txt','r+',0666,(err,fd) => {
	let buffer=Buffer.from('珠峰培训');//[0,1,2,3,4,5,6,7,8,9,10,11]
	//fd buffer offset
	fs.write(fd,buffer,3,6,3,(err,bytesWritten) => {
		console.log(err);
		fs.fsync(fd,(err) => {
			fs.close(fd,(err) => {
				console.log('关闭文件');
			});
		});
	});
	
});
//

let a=10;
let b=0x10;//16
let c=011;
let d=0b11;
// 0666 - 4+2 4+2 4+2
//        r+w r+w r+w
console.log(c);
console.log(d);
