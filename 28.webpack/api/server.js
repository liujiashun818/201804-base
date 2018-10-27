const express = require('express');
const logger = require('morgan');
const app = express();
app.use(logger(':method :url :status :res[content-length] - :response-time ms'));
app.get('/user', function (req, res) {
    res.json({ id: 1, name: 'zfpx1' });
});
app.get('/api/user', function (req, res) {
    res.json({ id: 1, name: 'api-zfpx1' });
});
app.listen(3000);