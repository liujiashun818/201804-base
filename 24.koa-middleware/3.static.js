let fs = require('fs');
let path = require('path');
let ejs = require('ejs');
let renderObj = { name: 'zfpx', age: 9, arr: [1, 2, 3] }

let result = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
function render(){
    let head = "let templ; \r\n";
    head += "with (renderObj) { \r\n templ =`";
    let content = result.replace(/<%=([\s\S]*?)%>/g,function(){
        return '${'+arguments[1]+"}";
    })
    content = content.replace(/<%([\s\S]*?)%>/g,function(){
        return "` \r\n " + arguments[1] + "\r\n templ+=`" ;
    });
    let tail = '`} \r\n return templ'
    return head + content + tail;
}
let fn = new Function('renderObj',render());
console.log(fn(renderObj));