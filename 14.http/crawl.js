let http = require('http');
http.createServer(function (req, res) {
    let client = http.request({
        host: 'news.baidu.com',
        method: 'get',
        port: 80
    }, function (r) {
        let arr = [];
        r.on('data',function(data){
            arr.push(data);
        })
        r.on('end',function(){
           let result = Buffer.concat(arr).toString();
           let matches = result.match(/<li class="bold-item"([\s\S]*?)<\/li>/gm);
           res.setHeader('Content-Type','text/html;charset=utf8');
           res.end(matches.join(''));
        });
    });
    client.end();
}).listen(3000);