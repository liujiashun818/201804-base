let querystring = require('querystring')
let qs = require('qs')
function urlencoded({ extended }) {
    return function (req, res, next) {
        if (req.headers['content-type'] == 'application/x-www-form-urlencoded') {
            let buffers = [];
            req.on('data', function (data) {
                buffers.push(data);
            });
            req.on('end', function () {
                //name=zfpx&age=8
                let result = Buffer.concat(buffers).toString();
                req.body = extended ? qs.parse(result) : querystring.parse(result);
                next();
            });
            req.on('error', function (err) {
                next(err);
            });
        } else {
            next();
        }
    }
}
function json() {
    return function (req, res, next) {
        if (req.headers['content-type'] == 'application/json') {
            let buffers = [];
            req.on('data', function (data) {
                buffers.push(data);
            });
            req.on('end', function () {
                let result = Buffer.concat(buffers).toString();
                req.body = JSON.parse(result);
                next();
            });
            req.on('error', function (err) {
                next(err);
            });
        } else {
            next();
        }

    }
}
exports.json = json;
exports.urlencoded = urlencoded;