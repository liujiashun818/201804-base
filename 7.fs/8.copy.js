const fs=require('fs');
const BUFFER_SIZE=3;
//src 5
function copy(src,dest) {
	fs.open(src,'r',(err,readFd)=> {
		fs.open(dest,'w',(err,writeFd) => {
			let buffer=Buffer.alloc(BUFFER_SIZE);
			let readed=0;
			let writed=0;
			function next() {
				fs.read(readFd,buffer,0,BUFFER_SIZE,readed,(err,bytesRead) => {
					readed+=bytesRead;
					bytesRead&&fs.write(writeFd,buffer,0,bytesRead,writed,(err,bytesWritten) => {
						writed+=bytesWritten;
						next();
					});
				});
			};
			next();
		});
	});
}
copy('./6.txt','7.txt');