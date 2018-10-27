//let { SyncWaterfallHook } = require('tapable');
//Bail 保险
class SyncWaterfallHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        //args = ['zfpx', 9]
        let [first, ...others] = this.tasks;
        return others.reduce((memo, task) => {
            return task(memo);
        }, first(...args));
    }
}
//创建一个SyncHook的实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let syncHook = new SyncWaterfallHook(['name', 'age']);
// xxx .addEventListener(listener);
//name运行的时候没有任何作用
syncHook.tap('1', function (name, age) {
    console.log(1, name, age);
    return 1;
});
syncHook.tap('2', function (data) {
    console.log(2, data);
    return '2';
});
syncHook.tap('3', function (data) {
    console.log(3, data);
    return 3;
});
//触发事件，让监听函数执行
syncHook.call('zfpx', 9);