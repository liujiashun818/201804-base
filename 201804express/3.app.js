let express = require('./express');
let app = express();
const path = require('path');
const fs = require('fs');
app.get('/add/:id/:name/:age', function (req, res) {
    //res.send(`ID=${req.params.id} 名称=${req.params.name} 年龄=${req.params.age}`);
    //The first argument must be one of type string or Buffer
    //response的end方法只能是一个字符串或者buffer
    res.send(req.params);
});
app.get('/1.txt', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'files/1.txt'));
});

app.listen(8080, () => {
    console.log(`server started at port 8080`);
});