## 可读流文件 (fs.read)
- 文件操作 on('open')
- on('close')
- on('data') 流动模式
- on('end') 读取完毕后
- rs.pause()
- rs.resume()


## 可写流 （fs.write)
- 第一次写入 就是真的写入 之后的写入就放到了(缓存区)中 数组 （链表）
- highWaterMark <= 缓存区的长度
- write('content',encoding,clearBuffer);


##  pipe