let { resolve } = require('path');
const webpack = require('webpack');
const createOptions = require('./options');
const FS = require('memory-fs');
function compile(texture,name) {
    let options = createOptions(texture,name);
    let compiler = webpack(options);
    compiler.outputFileSystem = new FS();//fs
    return new Promise(function (resolve, reject) {
        compiler.run(function(err,Stats){
            //console.log('arguments',arguments);
            if (err) reject(err);
            else resolve(Stats)
        });
    });
}
module.exports = compile;