import './index.less';
//console.log('css');
/**
 * cnpm i babel-loader babel-core babel-preset-env babel-preset-stage-0 babel-preset-react babel-plugin-decorators-legacy -D
 */
/**
 * {
    enumerable: true,//是否可枚举  for(let key in obj)
    writable: true,//是否可修改
    configurable: true, 是否可配置 delete obj[key]
    value(){    }
    get(){}
    set(){}
}
 */
function readonly(target, key, descriptor) {
    descriptor.writable = false;
}
function log(target, key, descriptor) {
    console.log(arguments);
    let oldValue = descriptor.value;
    descriptor.value = function (...args) {
        console.log('计算周长');
        return oldValue.call(this, ...args);
    }
}
class Circle {
    @readonly PI = 3.14;
    constructor(radius) {
        this.radius = radius;
    }
    //获取周长
    @log
    getRound() {
        return this.PI * 2 * this.radius;
    }
}
let circle = new Circle(10);
console.log(circle.PI);
console.log(circle.getRound());

