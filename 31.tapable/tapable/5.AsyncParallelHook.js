//let { AsyncParallelHook } = require('tapable');
class AsyncParallelHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let i = 0;
        let done = () => {
            if (++i == this.tasks.length) {
                finalCallback();
            }
        }
        this.tasks.forEach(task => task(...args, done));
    }
}
let hook = new AsyncParallelHook(['name']);
console.time('cost');
// Async类型的Hook注册监听的方式有三种tap tapAsync tapPromise
hook.tapAsync('1', function (name, done) {
    setTimeout(function () {
        console.log(1, name);
        done();
    }, 1000)
});
hook.tapAsync('2', function (name, done) {
    setTimeout(function () {
        console.log(2, name);
        done();
    }, 2000)
});
hook.tapAsync('3', function (name, done) {
    setTimeout(function () {
        console.log(3, name);
        done();
    }, 3000)
});
hook.callAsync('zfpx', () => {
    console.log('Well Done');
    console.timeEnd('cost');
});