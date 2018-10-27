//let { SyncLoopHook } = require('tapable');
//Bail 保险
class SyncLoopHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach((task) => {
            let ret;
            do {
                ret = task(...args);
            } while (ret);
        });
    }
}
//创建一个SyncHook的实例，参数是一个数组，数组里放置着将要传递给回调函数的参数列表
let hook = new SyncLoopHook(['name', 'age']);
// xxx .addEventListener(listener);
//name运行的时候没有任何作用
let total1 = 0;
let total2 = 0;
hook.tap('1', function (name, age) {
    console.log('total1', total1);
    return total1++ < 3 ? true : undefined;
});
hook.tap('2', function (name, age) {
    console.log('total2', total2);
    return total2++ < 3 ? true : undefined;
});

//触发事件，让监听函数执行
hook.call('zfpx', 9);