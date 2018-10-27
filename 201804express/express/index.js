let http = require('http');
const methods = require('methods');
const mime = require('mime');
let util = require('util');
let path = require('path');
const querystring = require('./querystring');
const fs = require('fs');
function createApplication() {
    //这是一个监听函数,它是一个总管理，领班
    let app = function (req, res) {
        //req.url包括完整的路径名和查询字符串 ?
        // http://localhost:8080/user?id=1
        //url=/user?id=1&order=desc  
        //pathname=/user   query=   id=1&order=desc
        let [reqPath, query = ''] = req.url.split('?');
        req.path = reqPath;//把路径名赋给req.path
        req.query = querystring.parse(query);
        req.host = req.headers.host.split(':')[0];
        let method = req.method.toLowerCase();
        //params可以是对象 数组 字符串 BUFFER 数字
        res.send = function (params) {
            res.setHeader('Content-Type', 'text/html;charset=utf8');
            switch (typeof params) {
                case 'object':
                    res.setHeader('Content-Type', 'application/json;charset=utf8');
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
        //给response对象增加一个render方法   user/add.html
        // 1.html 2.html  2.html
        res.render = function (filename, data) {
            // xx.html extname=.html   xxx.ejs extname = .ejs
            let extname = path.extname(filename.split(path.sep).pop());
            if (!extname) {
                extname = '.' + app.get('view engine');
                filename += extname;
            }
            let filepath = path.join(app.get('views'), filename);
            let renderFile = app.engines[extname];
            renderFile(filepath, data, (err, html) => {
                res.send(html);
            });
        }
        res.redirect = function (status, target) {
            if (typeof status == 'string') {
                target = status;
                status = 302;
            }
            res.statusCode = status;
            res.setHeader('Location', target);
            res.end();
        }
        let index = 0;//记录当前路由或中间件的索引
        function next(err) {
            let layer = app.routes[index++];//先取得当前层
            if (layer) {
                let { method, pathname, handler } = layer;
                //如果有错误的话只会找错误处理中间件
                if (err) {
                    if (method == 'middle' && (pathname == '/' || pathname == req.path || req.path.startsWith(pathname)) && handler.length == 4) {
                        handler(err, req, res, next);
                    } else {
                        next(err);
                    }
                } else {
                    if (method == 'middle') {//这一层放的就是中间件
                        if (pathname == '/' || pathname == req.path || req.path.startsWith(pathname)) {
                            handler(req, res, next);
                        } else {
                            next();
                        }
                    } else {//这一层放的就是路由
                        if (layer.regexp) {
                            let result = req.path.match(layer.regexp);
                            if (result && (method == layer.method || layer.method == 'all')) {
                                req.params = layer.paramNames.reduce((memo, key, index) => (memo[key] = result[index + 1], memo), {});
                                return layer.handler(req, res);
                            } else {
                                next();
                            }
                        } else {
                            //如果说路径名和方法名都能匹配上，则认为路由是匹配上，则交给这个路径层中的函数来进行处理
                            if ((req.path == layer.pathname || layer.pathname == "*") && (method == layer.method || layer.method == 'all')) {
                                return layer.handler(req, res);
                            } else {
                                next();
                            }
                        }
                    }
                }

            } else {
                res.end(`CANNOT ${req.method} ${req.path}`);
            }
        }
        next();
    }
    //这是一个数组，里面放着所有的层(方法、路径和回调)
    app.routes = [];
    methods.forEach(method => {
        app[method] = function (pathname, handler) {
            if (method == 'get' && arguments.length == 1) {
                return app.settings[pathname];
            }
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
    });
    //这里放的是一些变量
    app.settings = {};
    // app.get = function (key) {
    //     return app.settings[key];
    // }
    app.set = function (key, value) {
        app.settings[key] = value;
    }
    //这里放的是引擎 一个对应关系 模板的文件后缀 值 渲染方法
    app.engines = {};
    app.engine = function (extname, renderFile) {
        app.engines[extname] = renderFile;
    }
    //给app增加一个use方法
    app.use = function (pathname, handler) {
        if (typeof handler != 'function') {
            handler = pathname;
            pathname = '/';
        }
        let layer = {
            method: 'middle',//表示这一层是中间件
            pathname,//路径
            handler//处理函数
        }
        app.routes.push(layer);//把这一层放在路由层数组中
    }
    app.all = function (pathname, handler) {
        let layer = {
            method: 'all',//方法
            pathname,//路径
            handler//处理函数
        }
        app.routes.push(layer);//把这一层放在路由层数组中
    }

    app.listen = function () {
        let server = http.createServer(app);
        server.listen(...arguments);
    }
    return app;
}
module.exports = createApplication;
createApplication.static = function (staticRoot) {
    return function (req, res, next) {
        let filename = path.join(staticRoot, req.path);
        //如果有权限访问不不报错，如果没有权限就报错
        fs.access(filename, (err) => {
            if (err) {
                next();
            } else {
                const contentType = mime.lookup(filename);
                res.setHeader('Content-Type', contentType);
                fs.createReadStream(filename).pipe(res);
            }
        });
    }
}
