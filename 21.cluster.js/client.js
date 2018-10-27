let http = require('http');

for(let i = 0;i<10000;i++){
    http.get({
        host:'localhost',
        port:3000,
    },function(res){
        res.on('data',function(data){
            console.log(data.toString());
        })
    })
}