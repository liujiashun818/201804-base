let express = require('express');
let app = express();
const path = require('path');
const fs = require('fs');
app.use('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    console.log('req.path', req.path);
    console.log('middleware1');
    next('名字不合法');
})
app.use('/', function (req, res, next) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    console.log('middleware2');
    next();
})
app.get('/name', (req, res) => {
    res.end('中文');
});
app.get('/age', (req, res) => {
    res.end('9');
});
app.use(function (err, req, res, next) {
    console.log('err1', err);
    next(err);
});
app.use(function (err, req, res, next) {
    console.log('err2', err);
    res.statusCode = 500;
    res.end(err.toString());
});
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});