let fs=require('fs');
let path=require('path');
//如何创建一个目录,创建目录的时候要求父目录必须存在
// fs.mkdir('a/b/c',err => {
// 	console.log(err);
// 	console.log('创建成功');
// });
//判断一个文件是否存在
// fs.access('b',(err) => {
// 	console.log(err);
// });
//同步
function mkpSync(dir) {
	let parts=dir.split(path.sep);//['a','b','c']
	for (let i=1;i<=parts.length;i++){
		// a a/b  a/b/c
		let current=parts.slice(0,i).join(path.sep);
		try {
			fs.accessSync(current);
		} catch (err) {
			fs.mkdirSync(current);
		}
	}
}

function mkpAsync(dir,callback) {
	let parts=dir.split(path.sep);//[a,b,c]
	let index=1;
	function next() {
		if (index>parts.length) return callback();
		let current=parts.slice(0,index).join(path.sep);//a
		index++;
		fs.access(current,(err) => {
			if (err) {
				fs.mkdir(current,next);
			} else {
				next();
			}
		});
	}
	next();
}
function promisify(fn) {
	return function (...args) {
		return new Promise((resolve,reject) => {
			fn.call(null,...args,err=>err? reject():resolve());
		});
	}
}

function access(dir) {
	return new Promise((resolve,reject) => {
		fs.access(dir,(err) => err? reject():resolve());
	});
}
function mkdir(dir) {
	return new Promise((resolve,reject) => {
		fs.mkdir(dir,(err) => err? reject():resolve());
	});
}
async function mkp(dir) {
	let parts=dir.split(path.sep);//['a','b','c']
	for (let i=1;i<=parts.length;i++){
		// a a/b  a/b/c
		let current=parts.slice(0,i).join(path.sep);
		try {
			await promisify(fs.access)(current);
		} catch (err) {
			await promisify(fs.mkdir)(current);
		}
	}
}

//window   \
//mac /
//linux
console.log(path.join('a','b','c'));
//mkpSync(path.join('a','b','c'));
mkpAsync(path.join('a','b','c'));



