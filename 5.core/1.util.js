// util工具 包  核心模块内置模块
let util = require('util');
let fs = require('fs');
// 可以将带回调的方法转化成promise的方法 async+await
let rd = util.promisify(fs.readFile)

// es7用法 async+await
async function read(url) {
  let r = await rd(url, 'utf8');
  console.log(r);
  // fs.readFile(url,'utf8',function (err,data) {
  //   console.log(data);
  // })
}
// read('test.js');

// util继承 类的继承
// 继承实例的属性和公有属性
function Parent() {
  this.name = 'parent'
}
Parent.prototype.eat = '吃'
function Child() {}
util.inherits(Child,Parent); // 是继承公有属性的
// Child.prototype.__proto__= Parent.prototype;
Object.setPrototypeOf(Child.prototype,Parent.prototype);
let child = new Child;
console.log(child.eat);

console.log(util.isArray([]))
console.log(util.isString(''))
console.log(util.inspect({name:{name:{name:1}}},{showHidden:true,depth:1}))

// extends