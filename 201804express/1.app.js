let express = require('./express');
let app = express();
//每当调用get的时候，其实是向路由数组添加了一个层
app.get('/user', function (req, res) {
    res.end('get /user');
});
//pathname路径 url,pathname只包括？前面那个一部分
app.post('/user', function (req, res) {
    res.end('post /user');
});
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});