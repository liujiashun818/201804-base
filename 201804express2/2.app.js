let express = require('./express');
let app = express();

//每当调用get的时候，其实是向路由数组添加了一个层
app.get('/user', function (req, res) {
    console.log(req.method);//方法名
    console.log(req.url);//包括路径名+查询字符串
    console.log(req.path);//路径名
    console.log(req.query);//这是查询字符串对象
    console.log(req.headers);
    console.log(req.host);
    res.end('get /user');
});
app.post('/add/:id/:name', function (req, res) {
    res.end(`id=${req.params.id} name=${req.params.name}`);
});
//pathname路径 url,pathname只包括？前面那个一部分
app.post('/user', function (req, res) {
    res.end('post /user');
});
app.all('/about', function (req, res) {
    res.end('about');
});
app.all('*', function (req, res) {
    res.end('Not Found');
});
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});