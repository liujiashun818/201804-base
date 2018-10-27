const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const mock = require('./mock');
const bootstrap = path.resolve(__dirname, 'node_modules/_bootstrap@3.3.7@bootstrap/dist/css/bootstrap.css');
module.exports = {
    // process.env.NODE_ENV 
    //mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    //resole loader是用来配置如何找loader的
    resolveLoader: {
        modules: ['node_modules', path.resolve(__dirname, 'src/loaders')],
    },
    //resolve里配的是如何寻找普通模块
    resolve: {
        //extensions:['js','jsx','json'],
        //减少范围
        modules: ['node_modules'],
        mainFiles: ['index', 'mock'],
        mainFields: ['style', 'module', 'main'],
        alias: {
            'bootstrap': bootstrap
        }
    },
    /*  devServer: {
         port: 8080,
         contentBase: path.resolve(__dirname, 'dist'),
         compress: true,
         /* // http://localhost:8080/api/user http://localhost:8080/user
         // let newPath = "/api/user".replace("^\/api",""); 3000/newPath
         let realPath = '/api/user.json';//当向服务器请求此路径的时候 
         let reg = new Regexp("/api");
         if(reg.test(realPath)){
             //realPath = realPath.replace(new Regexp("^\/api"), "");
             realPath = realPath.replace(new Regexp("xxx"), "");
             再请求  target+realPath  http://localhost:3000/users
 
             http://localhost:8080/api/user.json => http://localhost:3000/user
         } 
          proxy: {
             "/api": {
                 target: "http://localhost:3000",
                 pathRewrite: {
                      "/api": "",
                     ".json": ""
                 }
             }
         } 
         //是在请求到静态资源之前配置路由 app=express();
         before(app) {
             mock(app);
         },
         after(app) {
             app.use(function (req, res, next) {
                 res.send('你请求的路径无法提供服务!');
             });
             app.use(function (err, req, res, next) {
                 res.send('你请求的路径无法提供服务!');
             });
         }
     }, */
    module: {
        noParse: /lodash|jquery/,
        rules: [
            {
                test: /\.css/,
                use: ['style-loader', 'zf-css-loader', 'css-loader']
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)/,
                use: 'url-loader'
            }
        ]
    },
    //把不需要解析 依赖的模块写在这

    plugins: [
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/assets'),
            to: path.resolve(__dirname, 'dist/assets'),
        }]),
        new CleanWebpackPlugin([
            path.resolve(__dirname, 'dist')
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(process.env.NODE_ENV),//"true"
            VERSION: "\"1.0.0\"",
            EXPRESSION: JSON.stringify("1+1+1"),
            COPYRIGHT: {
                AUTHOR: JSON.stringify('珠峰')
            }
        })
    ]
}