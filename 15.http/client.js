let http = require('http');

let config = {
    host: 'localhost',
    port: 3000,
    path: '/?a=b&c=d',
    method: 'post',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    }
}
let client = http.request(config, (res) => {
    let buffers = [];
    res.on('data', function (data) {
        buffers.push(data)
    })
    res.on('end', function () {
        let r = Buffer.concat(buffers);
        console.log(r.toString())
    })
})
client.end('name=zfpx&age=9')

// 不能发送请求体
// http.get(config,(res)=>{
//     let buffers = [];
//     res.on('data',function(data){
//         buffers.push(data)
//     })
//     res.on('end',function(){
//        let r =  Buffer.concat(buffers);
//        console.log(r.toString())
//     })
// })


// ajax 

// 提交的格式有哪些?
// form格式 a=b&c=d&q=f 实现 通过这种方式传递数据
// application/x-www-form-urlencoded

// 字符串
// JSON 格式 '{"name":"zfpx"}'
// applcation/json
// text
// text/plain;

// 二进制 FormData 上传文件

// 服务端返回
// JSON  application/json

