// 7是10进制的转化成2进制是多少?
// 把任意进制转化成任意进制
let r = (7).toString(2); // 字符串
console.log(r);
// 11111111 =255
// 讲任意进制转化成10进制
console.log(parseInt('11111111', 2));
console.log(0x16); 

// Unicode符号范围 | UTF - 8编码方式
//   (十六进制) |              （二进制）
// ----------------------+ ---------------------------------------------
// 0000 0000 - 0000 007F | 0xxxxxxx
// 0000 0080 - 0000 07FF | 110xxxxx 10xxxxxx
// 0000 0800 - 0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
// 0001 0000 - 0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

// unicode 0x73E0
console.log(0x73E0.toString(2));
// 11100111  10001111   10100000
let s = Buffer.from([0b11100111, 0b10001111, 0b10100000]).toString();
console.log(0b11100111, 0b10001111, 0b10100000);

console.log(parseInt('11111111', 2));

// base64 图片转化成base64 小图标->base64
// base64会比本身图片大很多

// 一个汉字转化成base64
// base64转化汉字时 会把 原有的3*8 = 4*6
// [11100111, 11100111, 10100000]
//   111001     111110             00011110 00100000
// 00111001 00111110   00011110    00100000
console.log(0b00111001);
console.log(0b00111110);
console.log(0b00011110);
console.log(0b00100000);
let str ='abcdefghijklmnopqrstuvwxyz'.toUpperCase();
str+="abcdefghijklmnopqrstuvwxyz";
str+='0123456789';
str+='+/';
console.log(str.length)
console.log(str);

console.log(str[57]+str[62]+str[30]+str[32]);