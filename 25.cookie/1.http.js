let http = require('http');
http.createServer(function(req,res){
    if(req.url === '/read'){
        console.log(req.headers.cookie); // name=zfpx; age=9
        res.end(req.headers.cookie)
    }else if(req.url === '/write'){
        res.setHeader('Set-Cookie',[
            'name=zfpx; Domain=zf1.cn; path=/; httpOnly=true',
            `age=9; Expires=${new Date(Date.now()+1000*10).toGMTString()}`,
            `address=${encodeURIComponent('回龙观')};`
        ]);
        res.end('write ok')
    }else{
        res.end('404');
    }
}).listen(3000);

