let apis = {
    "development":"http://localhost:3000",//本机开发的用的接口
    "production":"http://www.baidu.com"//服务器的线上接口
}
module.exports =  apis[process.env.NODE];
//module.exports =  apis["development"];
//module.exports =  apis["production"];