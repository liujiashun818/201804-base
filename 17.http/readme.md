## 范围请求
- 客户端请求：range: bytes=0-5
- 服务端响应:
    - Accept-Ranges: bytes
    - Content-Range: bytes 0-3/7877

## 多语言
- 客户端发的请求：Accept-Language: zh-CN,zh;q=0.9
- 服务端的响应:content-language: zh-CN

## referer refererred
- 判断当前内容饮用的来源

## 缓存
- 强制缓存 cache-control:'max-age=10' Expires:绝对时间
- 对比缓存 服务端设置的：Etag 客户端自带的 if-none-match
- Last-modified if-modified-since

## host虚拟主机
-  每次请求时都会带一个host 主机 ，通过不同的主机来判断访问的服务

## 请求体的内容类型
- content-type:'x-www-form-urlencoded'
- content-type:'application/json'
- content-type:'multiple/form-part'

## compress服务端压缩
转换流
- Accept-Encoding: gzip, deflate, br
- content-encoding: gzip

> zlib模块

## 命令行工具
- 要判断当前我们的请求的路径是文件夹还是文件
- 如果是文件就打开文件，如果是文件夹就列出文件夹的内容
- http-server 

