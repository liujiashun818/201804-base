let express = require('./express');
let app = express();
const path = require('path');
//中间件属于中间环节，它执行完成后可以执行后续的中间件或路由
// /name  /name/2  /name/3  /name/s
app.use('/name', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    //next();
    console.log('中间件1', req.path);
    //调用next的时候，如果没有传参就表示正常，如果传了一个不为null的参数就表示出错
    //如果出错了，则express会跳过后面所有的路由和正常的中间件，交给错误处理中中间件来处理处理 
    next('name错误');
});
app.use('/age', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    //next();
    console.log('中间件2', req.path);
    next();
});
app.get('/name', function (req, res) {
    res.end('珠峰培训');
});
app.get('/age', function (req, res) {
    res.end('今年10周岁');
});

app.use(function (err, req, res, next) {
    console.log('err1', err);
    next(err);
})
app.use(function (err, req, res, next) {
    console.log('err2', err);
    res.statusCode = 500;
    res.end('Server Error')
})
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});