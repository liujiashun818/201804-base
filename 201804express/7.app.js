let express = require('express');
let app = express();
const path = require('path');
const bodyParser = require('./body-parser');
//如果客户端发过来的请求体是表单的话，会由这个中间件来处理，把请求体接收并转成对象赋给req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//当客户端以post方式发出/signup请求的时候
app.post('/signup', function (req, res) {
    console.log(req.body);
    res.send(req.body);
});
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});