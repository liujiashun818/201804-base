// 定时发起请求 把请求到的结果 写入到download.txt中

let http = require('http');
let config = {
    host: 'localhost',
    port: 3000
}
let pause = false
process.stdin.on('data',(data)=>{
    if(data.toString().includes('p')){
        pause = true;
    }else if(data.toString().includes('r')){
        pause = false;
        downLoad();
    }
})
let fs = require('fs');
let ws = fs.createWriteStream(__dirname + '/download.txt');
let start = 0;
function downLoad() {
    config.headers = {
        'Range': `bytes=${start}-${start + 4}`
    }
    start += 5;
    let clinet = http.request(config, (res => {
        let total = res.headers['content-range'].split('/')[1];
        let buffers = [];
        res.on('data', (data) => {
            buffers.push(data);
        });
        // 一定会触发 on('data')是不一定触发(没有请求体就不会触发了)
        res.on('end', function () {
            let buf = Buffer.concat(buffers);
            ws.write(buf);
            setTimeout(() => {
                if (!pause && start < total) {
                    downLoad();
                }
            }, 1000)
        })
    }));
    clinet.end(); // 必须调用end 否则请求不会发送
}
downLoad();