//let { AsyncSeriesHook } = require('tapable');
class AsyncSeriesHook {
    constructor() {
        this.tasks = [];
    }
    tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let i = 0;
        let next = () => {
            let task = this.tasks[i++];
            if (task)
                task(...args, next);
            else
                finalCallback();
        }
        next();
    }
}
let hook = new AsyncSeriesHook(['name']);
console.time('cost');
hook.tapAsync('1', function (name, next) {
    setTimeout(function () {
        console.log(1, name);
        next();
    }, 1000);
});
hook.tapAsync('2', function (name, next) {
    setTimeout(function () {
        console.log(2, name);
        next();
    }, 2000);
});
hook.tapAsync('3', function (name, next) {
    setTimeout(function () {
        console.log(3, name);
        next();
    }, 3000);
});
hook.callAsync('zfpx', () => {
    console.log('All Done');
    console.timeEnd('cost');
});