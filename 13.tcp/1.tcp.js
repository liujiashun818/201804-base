// 传输层  http websocket (应用起来基本一样)
let net = require('net');

// 套接字
let server = net.createServer();
// 链接时会执行此方法，每次链接都会产产生一个socket对象
// http规定的头 设置一些头
// socket是一个可读可写的流 Duplex
server.on('connection',function(socket){
    // socket 没有规则 我们可以用tcp 模拟http
    socket.setEncoding('utf8');
    socket.on('data',function(data){
        console.log(data);
    });
    socket.write(`
HTTP/1.1 200 ok
Content-Length: 5

hello
    `);
});
server.listen(3000);