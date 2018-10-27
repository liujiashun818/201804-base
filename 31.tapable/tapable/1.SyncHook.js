//let { SyncHook } = require('tapable');
class SyncHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        if (args.length < this.args.length)
            throw new Error('参数个数不足');
        args = args.slice(0, this.args.length);
        this.tasks.forEach(task => task(...args));
    }
}
//创建一个SyncHook的实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let syncHook = new SyncHook(['name', 'age']);
// xxx .addEventListener(listener);
//name运行的时候没有任何作用
syncHook.tap('1', function (name, age, last) {
    console.log(1, name, age, last);
});
syncHook.tap('2', function (name, age, last) {
    console.log(2, name, age, last);
});
syncHook.tap('3', function (name, age, last) {
    console.log(3, name, age, last);
});
//触发事件，让监听函数执行
syncHook.call('zfpx');