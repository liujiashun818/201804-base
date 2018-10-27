## 多线程 单线程
- 主线程是单线程的 (node其实也是多线程的 setTimeout线程 ajax)


## 浏览器 (线程 进程)
- js线程
- ui线程

> 一般情况下 ui线程 渲染后 空闲下来 会执行js

> js线程和ui线程 是共享线程的( webworker 进程) 开一个工作者(归主线程来管理的，不能操作dom)
> 如果js是多线程的,不能同时两个线程 操作同一个DOM


## 异步 同步


## 阻塞和非阻塞



## NODE
非阻塞异步io + 事件驱动


## live-server / http-server/ zf-http-server
- 全局安装
```
npm install http-server -g
http-server
```



## queue stack
- queue队列 先进先出 push shift 
- stack栈  函数执行