//let { SyncHook } = require('tapable');
//Bail 保险
class SyncHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        //串行执行，如果有一个返回值不为null就停止执行
        let i = 0, ret;
        do {
            ret = this.tasks[i++](...args);
        } while (!ret);
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
    return '2';
});
syncHook.tap('3', function (name, age, last) {
    console.log(3, name, age, last);
});
//触发事件，让监听函数执行
syncHook.call('zfpx');