// 客户端

let http = require('http');
let config = {
    host:'localhost',
    port:3000,
    method:'get',
    headers:{
        'a':1
    }
}
let client = http.request(config,function(res){
    res.on('data',function(data){
        console.log(data.toString())
    })
});
client.end(); // 发请求

// 爬虫 