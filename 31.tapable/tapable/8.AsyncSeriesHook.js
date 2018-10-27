//let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }
    tapPromise(name, task) {
        this.tasks.push(task);
    }
    promise(args) {
        //redux compose

        // let [first, ...others] = this.tasks;
        // return others.reduce((promise, task) => {
        //     return promise.then(() => task(...args));
        // }, first(...args));

        //compose从右往后算 
        //return funcs.reduce((a, b) => (...args) => a(b(...args)));
        //reduceRight从右往左算 a b c d,  
        //this.tasks = ['a','b','c']
        return this.tasks.reduce((current, task) => {
            return Promise.resolve(current).then(() => task(args));
        }, args);
        //return this.tasks.reduceRight((a, b) => (...args) => a(b(...args)));
        //return this.tasks[0](...args).then(() => this.tasks[1](...args)).then(() => this.tasks[2](...args))
    }
}
let hook = new AsyncSeriesHook(['name']);
console.time('cost');
hook.tapPromise('1', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(1, name);
            resolve();
        }, 1000);
    });
});
hook.tapPromise('2', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(2, name);
            resolve();
        }, 2000);
    });
});
hook.tapPromise('3', function (name) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log(3, name);
            resolve();
        }, 3000);
    });
});
hook.promise('zfpx').then(ret => {
    console.log('All Done', ret);
    console.timeEnd('cost');
});