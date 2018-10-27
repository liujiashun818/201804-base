#! /usr/bin/env node

// args
// commander

let commander = require('commander');

// 解析当前进程执行时的参数
commander.on('--help',()=>{
    console.log('\r\n  how to use:')
    console.log('    zf-server --port <val>');
    console.log('    zf-server --host <val>');
    console.log('    zf-server --dir <val>');
})
commander
    .version('1.0.0')
    .usage('[options]')
    .option('-p,--port <n>','server port')
    .option('-o,--host <n>','server host')
    .option('-d,--dir <n>','server dir')
    .parse(process.argv);


let Server = require('../index');
let server = new Server(commander);
server.start();

let {exec} = require('child_process');
if(process.platform === 'win32'){
    exec('start http://localhost:3000');
}else{
    exec('open http://localhost:3000');
}