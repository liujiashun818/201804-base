
//source代表此资源的内容字符串
//source  let a = 1;//3
// let a = 1;//3//2
/**
 * 1. 种是可以放在最左边的，一定要返回一个JS代码
 * 2. 种是不可能放在最左边的，返回是啥都行
 * @param {1} source 
 */
function loader(source) {
    console.log('loader2');
    return 'xxx ff';
}
loader.pitch = function (request) {
    console.log('p2-pitch');
    return 'let a = "p2"'
}
module.exports = loader;