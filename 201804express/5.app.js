let express = require('./express');
let app = express();
const path = require('path');
//指定模板引擎,其实就是模板文件的后缀名
app.set('view engine', 'html');
//指定模板的存放根目录
app.set('views', path.resolve(__dirname, 'views'));
//如果要自定义模板后缀和函数的关系的话，需要在此配置一下
app.engine('.html', require('./ejs').__express);
//指定一个路由
app.get('/user', function (req, res) {
    //使用指定的模板引擎渲染user模板
    res.render('user', { title: '用户管理' });
});
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});