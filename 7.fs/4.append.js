const fs=require('fs');
//writeFile flags=w 写入，如果文件已经存在，则删除掉文件后再写入
//fs.writeFile('./4.txt','789',{flag:'a'});

fs.appendFile('./4.txt','789');