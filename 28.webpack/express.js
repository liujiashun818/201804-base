const express = require('express');
const app = express();
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const options = require('./webpack.config');
let compiler = webpack(options);
app.use(webpackDevMiddleware(compiler));//index.html
app.get('/api/user', function (req, res) {// 1万个 
    res.json({ id: 1, name: 'zfpx1' });
});

app.listen(3000);