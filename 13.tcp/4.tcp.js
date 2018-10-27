

let net = require('net');
let server = net.createServer();
let client = {};
server.on('connection', (socket) => { // ip+端口号 作为唯一的标识
    let key = socket.remoteAddress + socket.remotePort;
    // 当前用户
    client[key] = { username: '匿名', socket }
    // 有一个唯一的标识 {'xxx':{username:'匿名',socket:xxx}}

    server.getConnections(function (err, count) {
        socket.write(`欢迎：目前有${count}人 \r\n`);
    });

    // 监听用户的输入
    socket.setEncoding('utf8');
    socket.on('data', function (data) {
        data = data.replace(/\r\n/, '');
        // 实现 私聊
        // s:zfpx:内容    私聊
        // b:内容         广播
        // r:zfpx         改名
        // l:             显示当前的在线用户
        let arr = data.split(':');
        switch(arr[0]){
            case 's':
                private(arr[1],arr[2],key);
                break;
            case 'b':
                broadcast(key,arr[1]);
                break;
            case 'r':
                rename(socket,arr[1],key);
                break;
            case 'l':
                list(socket);
                break;
            default:
                socket.write('命令有误\r\n')
        }
    });

    socket.on('end',()=>{ //客户端关闭后 销毁
        socket.destroy();
        delete client[key];
    })
});
function private(username,content,key){
    // 通过名字找到socket
    Object.keys(client).forEach(c=>{
        if(client[c].username == username){
            client[c].socket.write(`${client[key].username}:${content}`);
        }
    })
}

function broadcast(key,content){
    Object.keys(client).forEach(c=>{
        if(key != c){ // 不是自己
            client[c].socket.write(`${client[key].username}:${content}\r\n`)
        }
    })
}

// 更改名字 
function rename(socket,newName,key){
    client[key].username = newName;
    socket.write(`新用户名是:${newName}\r\n`);
}

// 列表
function list(socket){
    // {'xxx':{username:'匿名',socket:xxx}}
    socket.write('当前的用户列表:\r\n');
    Object.values(client).forEach(p => {
        socket.write(`${p.username+'\r\n'}`);
    });
}
const port = 3000;
server.listen(port, () => {
    console.log(`server start ${port}`);
});