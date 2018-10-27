let express = require('./express');
let app = express();
const path = require('path');
const fs = require('fs');
// 修改模板文件的后缀名为html
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
// 运行ejs模块
app.engine('.html', require('ejs').__express); //__express是ejs模块的一个公共属性，表示要渲染的文件扩展名

app.get('/signup', function (req, res) {
    res.render('signup.html', { title: '注册' });
});

app.listen(8080, () => {
    console.log(`server started at port 8080`);
});