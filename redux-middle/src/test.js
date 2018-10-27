// let obj = {name:'zfpx'}
// function processData() {
//   obj.name = 'zhufeng'
// }
// // 深度克隆 消耗 内存 只有部分更改 其他还用以前的
// processData(obj);
// console.log(obj);
// 只能转一层
// let {Map,List} = require('immutable');
// let obj = Map({name:'zfpx',age:{age:9}});
// let obj1 = obj.set('name','jw');
// console.log(obj.get('age') === obj1.get('age'));
// let obj1 = obj.set('name','jw');

// 对象-----------
// let {fromJS} = require('immutable');
// let obj1 = fromJS({name:'zfpx',age:{age:9}});
// let obj2 = obj1.setIn(['age','age'],'jw');
// let obj3 = obj1.updateIn(['age','age'],(n)=>n+1);
// let obj4 = obj3.delete('age');
// console.log(obj4);


// let {fromJS} = require('immutable');
// let obj1 = fromJS({name:'zfpx'});
// let obj2 = obj1.set('age',fromJS({age:9}));
// console.log(obj2.getIn(['age','age']));
// 数组
let {fromJS} = require('immutable');
let obj1 = fromJS(['zfpx',['zfpx','age']]);
let obj2 = obj1.push(3);
obj2.push(4);
// obj2.pop();
// obj2.reduce((a,b)=>a+b)
let obj3 = obj2.setIn([1,1],1000)
console.log(obj3);

// 优化
