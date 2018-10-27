
// 用异步不用同步

// 要删除目录 需要先把这个目录中的内容先读出来
// 判断当前目录下 是文件还是文件夹
// 删除目录 fs.rmdirSync 删除文件就用fs.unlinkSync
// fs.rmdirSync('a/b');
// let files = fs.readdirSync('a');
// files = files.map(file => path.join('a',file));
// files.forEach(file=>{
//   let statObj = fs.statSync(file);
//   if(statObj.isDirectory()){
//     fs.rmdirSync(file);
//   }else{
//     fs.unlinkSync(file);
//   }
// })

// 5) 先序广度优先
let fs = require('fs');
let path = require('path');
function removeDir(p) {
  let arr = [p];
  let index = 0;
  let current;
  while (current = arr[index++]) {
    let statObj = fs.statSync(current);
    if (statObj.isDirectory()) {
      let dirs = fs.readdirSync(current);
      arr = [...arr, ...dirs.map(dir => path.join(current, dir))];
    }
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    let statObj = fs.statSync(arr[i]);
    if (statObj.isDirectory()) {
      fs.rmdirSync(arr[i])
    }else{
      fs.unlinkSync(arr[i])
    }
  }
}
removeDir('a');
// 写一个广度异步删除文件夹

// 4) 先序深度优先
// let fs = require('fs');
// let path = require('path');
// function removeDir(p,callback) {
//   fs.stat(p,(err,statObj)=>{
//     if(statObj.isDirectory()){
//       fs.readdir(p,function (err,dirs) {
//         // 异步怎么递归？
//         // next函数用来递归的
//         dirs = dirs.map(dir => path.join(p, dir));
//         // 标识先删除第一个
//         function next(index) {
//           if (index === dirs.length) return fs.rmdir(p, callback)
//           let file = dirs[index];
//           // 删除目录后将下一次的删除继续传递
//           removeDir(file, ()=>next(index+1));
//         }
//         next(0);
//       })
//     }else{ // 文件删除执行callback即可
//       fs.unlink(p,callback);
//     }
//   });
// }
// removeDir('a',function () {
//   console.log('删除成功了')
// });

// 3) async + await  先序深度优先
// let fs = require('fs');
// let path = require('path');
// let util = require('util');
// let stat = util.promisify(fs.stat);
// let readdir = util.promisify(fs.readdir);
// let rmdir = util.promisify(fs.rmdir);
// let unlink = util.promisify(fs.unlink);
// async function removeDir(p) {
//     let statObj = await stat(p);
//     if(statObj.isDirectory()){
//       let dirs = await readdir(p);
//       dirs = dirs.map(dir=>path.join(p,dir));
//       dirs = dirs.map(dir => removeDir(dir));
//       await Promise.all(dirs);
//       await rmdir(p);
//     }else{
//       // 要等待文件删除后 才让promise执行完 所以需要await
//       await unlink(p);
//     } 
// }
// removeDir('a').then(()=>{
//   console.log('删除成功');
// })


// 2) promise 先序深度优先
// let fs = require('fs');
// let path = require('path');
// function removeDir(p) {
//   return new Promise((resolve,reject)=>{
//     fs.stat(p,(err,statObj)=>{ // 判断文件类型 是目录 递归 否则就删除即可
//       if(statObj.isDirectory()){
//         fs.readdir(p, function (err, dirs) {
//           // 映射路径
//           dirs = dirs.map(dir => path.join(p, dir));
//           // 映射promise
//           dirs = dirs.map(dir => removeDir(dir));
//             // 删除完儿子后 删除自己
//           Promise.all(dirs).then(() => {
//             fs.rmdir(p, resolve);
//           });
//         });
//       }else{
//         fs.unlink(p,resolve);
//       }
//     });
//   });
// }
// removeDir('a').then(data=>{
//   console.log('删除成功');
// })


// 考虑递归 只考虑两层
// 1)先序深度优先
// let fs = require('fs');
// let path = require('path');
// function removeDir(p) {
//   let statObj = fs.statSync(p);
//   if(statObj.isDirectory()){
//     let dirs = fs.readdirSync(p);
//     dirs = dirs.map(dir => path.join(p,dir));
//     for(let i = 0; i<dirs.length;i++){
//       // 深度 先将儿子移除掉 再删除掉自己
//       removeDir(dirs[i]);
//     }
//     fs.rmdirSync(p);
//   }else{
//     fs.unlinkSync(p);
//   }
// }
// removeDir('a');



// function name(params) {
//   return new Promise((resolve,reject)=>{
//     setTimeout(() => {
//       reject(1000);
//     }, 1000);
//   })
// }
// async function a() {
//   try{
//     let result = await name();
//     console.log(result)
//   }catch(e){
//     console.log('error',e);
//   }
// }
// a().catch(e=>{
//   console.log(e);
// })