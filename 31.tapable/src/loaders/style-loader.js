let less = require('less');
const loaderUtils = require('loader-utils');
//source就是css代码了
function loader(source) {
  let script = `
      let style = document.createElement('style');
      style.innerHTML = ${JSON.stringify(source)};
      document.head.appendChild(style);
    `;
  return script;
}

loader.pitch = function (remainingRequest) {
  //request loader1!loader2!loader3!module
  //D:\vipcode\project\201804\31.tapable\src\loaders\style-loader.js|D:\vipcode\project\201804\31.tapable\src\loaders\less-loader.js!D:\vipcode\project\201804\31.tapable\src\base.less
  //D:\vipcode\project\201804\31.tapable\src\loaders\less-loader.js!D:\vipcode\project\201804\31.tapable\src\base.less
  console.log('request', remainingRequest);
  //stringifyRequest 把绝对路径变成相对路径
  //"!!两个感叹号表示忽略 loader的配置
  //webpack得到这个模块后，会把这它转成一个AST语法树
  //得到一个AST之后，我们分分析里面的依赖 require
  let script = `
     let content = require(${loaderUtils.stringifyRequest(this, "!!" + remainingRequest)});
     let style = document.createElement('style');
     style.innerHTML = content;
     document.head.appendChild(style);
  `;
  console.log(script);
  return script;
}
/*
function loader(source) {
    let options = loaderUtils.getOptions(this) || {};
    let filename = loaderUtils.interpolateName(this, options.filename || '[name].css', source);
    //这个方法可以产出一个新的文件，第一个参数是文件名，第二个参数是文件的内容
    this.emitFile(filename, source);
    let script = `
      let link = document.createElement('link');
      link.setAttribute('rel','stylesheet');
      link.setAttribute('href',${JSON.stringify(filename)});
      document.head.appendChild(link);
    `;
    return script;
}
*/
module.exports = loader;