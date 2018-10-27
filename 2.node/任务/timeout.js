setTimeout(() => {
  console.log('setTimeout1')
  Promise.resolve().then(data => {
    console.log('微任务1')
  })
}, 0);
Promise.resolve().then(data=>{
  console.log('微任务2')
  setTimeout(() => {
    console.log('setTimeout2')
  }, 0);
});
//微任务2 setTimeout2 微任务1 setTimeout1

// 本周作业 就是 node概念 (单线程 多线程) ( 事件环 )