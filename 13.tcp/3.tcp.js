let net = require('net');
let client = [];
let server = net.createServer(function(socket){
    client.push(socket);
    server.getConnections(function(err,count){
        socket.write(`当前聊天室有${count}人，总人数${server.maxConnections}\r\n`);
    });
    socket.setEncoding('utf8');
    socket.on('data',function(data){
        data = data.replace(/\r\n/,'');
        client.forEach(c=>{
            if(c!=socket){
                c.write(data+'\r\n');
            }
        })
    });
    socket.on('end',function(){
       client = client.filter(c=>c!=socket);
    })
});
// 服务器的最大链接数
server.maxConnections = 3;
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