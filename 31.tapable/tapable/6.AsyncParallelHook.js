//let { AsyncParallelHook } = require('tapable');
class AsyncParallelHook {
    constructor(args) {
        this.args = args;
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(...args) {
        return Promise.all(this.tasks.map(task => task(...args)));
    }
}
let hook = new AsyncParallelHook(['name']);
console.time('cost');
// Async类型的Hook注册监听的方式有三种tap tapAsync tapPromise
hook.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1, name);
            resolve(1);
        }, 1000)
    });
});
hook.tapPromise('2', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2, name);
            resolve(2);
        }, 2000)
    });
});
hook.tapPromise('3', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3, name);
            resolve(3);
        }, 3000)
    });
});
//ret=[1,2,3]
hook.promise('zfpx').then(ret => console.log(ret));