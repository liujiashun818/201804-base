const fs=require('fs');
//fs.writeFile('./2.txt','123',{encoding: 'utf8'},(err) => {
//	console.log('write OK');
//})
fs.writeFileSync('./3.txt','456');

//代表文件类型和权限
//-rw-r--r--    1 zhangrenyang  staff     3241 Mar  6 09:34 .zshrc.pre-oh-my-zsh