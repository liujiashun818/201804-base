let http = require('http'); 
let url = require('url');
// get参数通过url来取
let server = http.createServer(function(req,res){
    // 1).get请求 ------------
    // let {query} = url.parse(req.url,true);
    // console.log(query);
    // 2).post 表单
    let type = req.headers['content-type'];
    let buffers = [];
    req.on('data', function (data) {
        buffers.push(data)
    });
    req.on('end',function(){
        let str = Buffer.concat(buffers).toString();
        res.setHeader('Content-Type','application/json');
        if(type === 'application/x-www-form-urlencoded'){
            // a=b&c=d;
            let json = require('querystring').parse(str);
            res.end(JSON.stringify(json));
        }else if(type==="application/json"){
            let json = JSON.parse(str);
            res.end(JSON.stringify(json));
        }else{
            res.setHeader('Content-Type','text/plain');
            res.end('str');
        }
    });
    // fetch axios ajax 有啥区别？
    // axios
}).listen(3000);
// let querystring = require('querystring');
// // ab; c=d
// let obj = querystring.parse('a*b!&c*d!&d*e','!&','*');
// console.log(obj);