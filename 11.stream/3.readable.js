let fs = require('fs');

let rs = fs.createReadStream('./1.txt',{
    autoClose:true,
    start:0,
    flags:'r',
    encoding:'utf8',
    highWaterMark:3// 默认先在杯子里 填 3滴水
})
// 暂停模式先把水杯 给你填满，自己去喝 喝多少取决于你自己

// 1).readable 当杯子里的水 是空的时候 会触发readable事件（还会将杯子里的水在填入 highWaterMark个）
// 2).如果当前杯子里的水 小于hightWaterMark 会再次读取highWaterMark个
// 3) 行读取器
rs.on('readable',()=>{
    let r = rs.read(1);
    console.log(rs._readableState.length);
    setTimeout(()=>{
        console.log(rs._readableState.length);
    },5000)
});