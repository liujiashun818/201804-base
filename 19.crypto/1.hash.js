// base64 编码的转化
// md5 摘要算法 (不可逆)
// 加密算法

let crypto = require('crypto');
console.log(crypto.getHashes());

// 缓存 Etag ctime 默认情况不支持 秒以内的 cdn
// 对一个文件声明一个字段 字段是唯一的 ，如果文件变了 就会更改

// md5 特点 
// 1.摘要的内容不一样 出来的结果就不一样
// 2.文件的一样 出来的结果就一样
// 3.md5结果是定长的 
// 4.不可逆

// 密码保存 不能使用明文 (拖库)
let str = 'hello';
let r = crypto.createHash('md5').update(str).digest('hex');
console.log(r);

//大文件的加密 可以多次调用update方法更新
let r1 = crypto.createHash('md5').update('h').update('ell').update('o').digest('hex');
console.log(r1);

// hmac算法  加盐算法 (秘钥) (不能丢失秘钥);

let fs = require('fs');
let key = fs.readFileSync(__dirname+'/rsa_private.key');
let mac = crypto.createHmac('sha256',key);
mac.update('hello');
let r2 = mac.digest('base64');
console.log(r2);

// hmac 我们后面会摘要cookie

