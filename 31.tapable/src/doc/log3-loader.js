
//source代表此资源的内容字符串
//source = let a = 1;
//  let a = 1;//3
let flag= false;
function loader(source) {
    console.log('~~~~~~log3~~~~~~');
    flag = true;
    //return source + '//3';
    return 'a{}'
    //this.callback(null, source);
}
module.exports = loader;