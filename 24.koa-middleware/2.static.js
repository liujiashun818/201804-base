let fs = require('fs');
let path = require('path');
let result = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
let ejs = require('ejs');
let renderObj = { name: 'zfpx', age: 9, arr: [1, 2, 3] }


function render(renderObj) {
    let templ;
    with (renderObj) {
        if (name == "zfpx") {
            templ = "zfpx"
        } else {
            templ = "jw"
        }
    }
    return templ
}
console.log(render(renderObj));

// => zfpx






// with 限制取值范围

// with(renderObj){
//     let str = name;
//     console.log(str);
// }

// new Function 把字符串 创建成一个函数
// let str = `console.log(obj)`;
// let fn = new Function('obj',str);
// fn(renderObj);
