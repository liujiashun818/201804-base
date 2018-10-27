let net = require('net');


let client = net.createConnection({port:3000});

client.write('hello');
client.setEncoding('UTF8');
client.on('data',function(data){
    console.log(data);
});