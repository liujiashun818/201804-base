//同步代码执行后 才会执行异步
// 根据时间排序 当时间到达后 把对应的回调 放到队列里

// 宏任务 微任务(vue $nextTick) 异步方法
// setImmedate只兼容ie 
setTimeout(() => {
  console.log(1);
  setTimeout(() => {
    console.log(4);
  }, 1000);
}, 1000);
setTimeout(() => {
  console.log(2);
}, 2000);
setTimeout(() => {
  console.log(3);
}, 3000);