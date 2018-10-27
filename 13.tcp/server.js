let net = require('net');

let server = net.createServer(function(socket){
    socket.setEncoding('utf8')
    socket.on('data',function(data){
        console.log(data);
    });
    socket.write('你好')
});

server.listen(3000)