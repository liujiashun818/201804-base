## npm 
- node package manager 模块的包管理器


## 第三方模块(两种)
- 全局模块 npm install http-server -g 只能在命令行页面
- 全局安装的内容 不会放到全局变量
- 本地模块 npm install xxx 

```
npm install nrm -g 切换源的
nrm use taobao
nrm ls 显示所有的源
```

## --save-dev(项目依赖)
- 加上后标识只在开发的时候使用
- 不加就是项目依赖 上线 开发都需要



## 1.写一篇文章
本周作业 promise node基础 模块实现cmd/amd/commononjs....
学下markdown语法，在本地写完后粘过去(一篇文章3000字内容 配个图) (马克飞象)
注册一个掘金账号 日期下周日之前
作业统一提交到homework(下课我会建好后发公告提示大家)
第一组(周一会进行分组)
 xxx.md   第一周作业 https://juejin.im/post/5b17cc7d5188257d9f24c430
 xxx.md   第一周作业 https://juejin.im/post/5b17cc7d5188257d9f24c430



## 文件模块的查找规范
- 包都有个pacakge.json npm init -y
- 先去找文件名(包)没有的话才会去找文件

## 怎么实现全局模块
- 先初始化包
```
"bin": {
   "zfpx": "./bin/www.js"
},
```
- #! /usr/bin/env node 按照node方式运行文件
- npm link 连接到全局的npm中

## 怎么发布一个包

## package.json的作用