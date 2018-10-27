let http = require('http');
const methods = require('methods');
let util = require('util');
const querystring = require('./querystring');
const fs = require('fs');
const path = require('path');
function createApplication() {
    //这是一个监听函数,它是一个总管理，领班
    let app = function (req, res) {
        //req.url包括完整的路径名和查询字符串 ?
        // http://localhost:8080/user?id=1
        //url=/user?id=1&order=desc  
        //pathname=/user   query=   id=1&order=desc

        let i = 0;
        function next(err) {
            let layer = app.routes[i++];
            if (layer) {
                if (err) {
                    if (method == 'middle' && handler.length == 4) {
                        returnhandler(err, req, res, next);
                    } else {
                        next();
                    }
                } else {
                    let { method, pathname, handler } = layer;
                    if (method == 'middle') {
                        if (pathname == '/' || pathname == req.path || req.path.startsWith(pathname)) {
                            return handler(req, res, next);
                        } else {
                            next();
                        }
                    } else {
                        if (layer.regexp) {
                            let result = pathname.match(layer.regexp);
                            if (result && (method == layer.method || layer.method == 'all')) {
                                req.params = layer.paramNames.reduce((memo, key, index) => (memo[key] = result[index + 1], memo), {});
                                return layer.handler(req, res);
                            } else {
                                next();
                            }
                        } else {
                            //如果说路径名和方法名都能匹配上，则认为路由是匹配上，则交给这个路径层中的函数来进行处理
                            if ((pathname == layer.pathname || layer.pathname == "*") && (method == layer.method || layer.method == 'all')) {
                                return layer.handler(req, res);
                            } else {
                                next();
                            }
                        }
                    }
                }
            } {
                res.end(`CANNOT ${req.method} ${req.path}`);
            }
        }
        next();

    }
    function init() {
        return function (req, res, next) {
            let [pathname, query = ''] = req.url.split('?');
            req.path = pathname;//把路径名赋给req.path
            req.query = querystring.parse(query);
            req.host = req.headers.host.split(':')[0];
            let method = req.method.toLowerCase();
            //params可以是对象 数组 字符串 BUFFER 数字
            res.send = function (params) {
                switch (typeof params) {
                    case 'object':
                        params = util.inspect(params);
                        break;
                    case 'number':
                        res.statusCode = params;
                        params = require('_http_server').STATUS_CODES[params];
                        break;
                    default:
                        break;
                }
                res.end(params);
            }
            //filename必须是一个绝对路径
            res.sendFile = function (filename) {
                fs.createReadStream(filename).pipe(res);
            }
            res.render = function (filename, data) {
                let filepath = path.join(app.get('views'), filename);
                let ext = path.extname(filepath.split(path.sep).pop());

                if (!ext) {
                    ext = "." + app.get('view engine');
                    filepath += ext;
                }
                let renderFile = app.engines[ext];
                renderFile(filepath, data, (err, html) => {
                    res.setHeader('Content-Type', 'text/html');
                    res.end(html);
                });

                /**
                    fs.readFile(filepath, 'utf8', (err, tmpl) => {
                        let html = tmpl.replace(/<%=(\w+)%>/g, function (matched, attr) {
                            return data[attr];
                        });
                        console.log('filepath', html);
                        console.log('res.headersSent', res.headersSent);
                        //res.setHeader('Content-Type', 'text/html');
                        res.end(html);
                    });
                 */
            }
            next();
        }
    }
    //这是一个数组，里面放着所有的层(方法、路径和回调)
    app.routes = [];

    methods.forEach(method => {
        app[method] = function (pathname, handler) {
            if (method == 'get' && arguments.length == 1) {
                return app.settings[pathname];
            } else {
                let layer = {
                    method,//方法
                    pathname,//路径
                    handler//处理函数
                }
                //如果说路径里有冒号的话，就表示有路径参数
                if (pathname.indexOf(':') != -1) {
                    let paramNames = [];// 参数的名字
                    let regStr = pathname.replace(/:(\w+)/g, function (matched, attr) {
                        paramNames.push(attr);
                        return "(\\w+)";
                    });
                    let regexp = new RegExp(regStr);
                    layer.regexp = regexp;//一个是正则
                    layer.paramNames = paramNames;//一个是路径参数的名称数组
                }
                app.routes.push(layer);//把这一层放在路由层数组中
            }
        }
    });
    app.all = function (pathname, handler) {
        let layer = {
            method: 'all',//方法
            pathname,//路径
            handler//处理函数
        }
        app.routes.push(layer);//把这一层放在路由层数组中
    }
    app.use = function (pathname, handler) {
        if (typeof handler != 'function') {
            handler = pathname;
            pathname = '/';
        }
        let layer = {
            method: 'middle',//方法
            pathname,//路径
            handler//处理函数
        }
        app.routes.push(layer);//把这一层放在路由层数组中
    }
    app.use(init());
    app.listen = function () {
        let server = http.createServer(app);
        server.listen(...arguments);
    }
    app.settings = {};
    app.set = function (key, val) {
        app.settings[key] = val;
    }
    app.engines = {};
    app.engine = function (ext, renderFile) {
        app.engines[ext] = renderFile;
    }
    return app;
}
module.exports = createApplication;

