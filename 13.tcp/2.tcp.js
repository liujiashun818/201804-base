let net = require('net');
// localhost 3000 raw 访问服务
// 简易的聊天功能
let server = net.createServer(function(socket){
    // 链接服务端后 通知一下当前用户 一共可以容纳多少人,当前有几个
    server.getConnections(function(err,count){
        socket.write(`当前聊天室有${count}人，总人数${server.maxConnections}`);
    });
    socket.on('data',function(){ // 客户端输入内容
        // socket.end(); // 挂掉的是客户端
        // server.close();
        // 是让新用户不在链接了，但是老用户可以继续链接，等用户关掉后，就关闭服务器
        server.unref(); // 不会触发close,等待所有人退出后才会关闭服务
    });
});
// 服务器的最大链接数
server.maxConnections = 3;
server.on('close',function(){
    console.log('服务端关闭');
})
server.listen(3000,function(){
    console.log('server start '+ 3000);
});



// server.on('error',function(error){ // webpack
//     if(error.code == 'EADDRINUSE'){
//         server.listen(error.port+1,function(){
//             console.log(error.port+1)
//         });
//     }
// });