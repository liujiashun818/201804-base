let fs = require('fs');
let path = require('path');
let result = fs.readFileSync(path.join(__dirname,'index.html'),'utf8');
let ejs = require('ejs');
let renderObj = {name:'zfpx',age:9,arr:[1,2,3]}

// ?: ?= 最简单的模板引擎只支持 取值表达式
let str = result.replace(/<%=([\s\S]*?)%>/g,function(){
    return renderObj[arguments[1]];
});
console.log(str);

