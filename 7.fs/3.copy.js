const fs=require('fs');
function copy(src,dest,cb) {
	fs.readFile(src,(err,data) => {
		fs.writeFile(dest,data,cb);
	});
}
copy('3.txt','4.txt',() => {
	console.log('拷贝完成');
});