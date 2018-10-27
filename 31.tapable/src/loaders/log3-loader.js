
//source代表此资源的内容字符串

function loader(source) {
    console.log('loader3');
    return source;
}
loader.pitch = function (request) {
    console.log('p3-pitch');
}
module.exports = loader;