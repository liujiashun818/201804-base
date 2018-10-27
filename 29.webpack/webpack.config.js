const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
module.exports = {
    //webpack优化的配置
    optimization: {
        splitChunks: {
            //使用缓存提高效率
            cacheGroups: {
                //第三方把公共的第三方的模块都打包单独的文件中去 vendor.js
                vender: {
                    test: /node_modules/, // 如果模块的路径匹配这个规则
                    chunks: "initial",//代码块是直接引用
                    name: "vendor",//给打包出的文件起一个名字 vendor.js
                    priority: 10,
                    enforce: true
                },
                //把多个页面之间的公共的模块提取出来
                commons: {
                    chunks: "initial",//代码块是直接引用
                    minChunks: 2,//使用次数必须大于等2次才会提取出来，
                    maxInitialRequests: 5,
                    minSize: 0 // 单独提取的文件的最上字节数
                }
            }
        }
    },
    devServer:{
       hot:true
    },
    /*  entry: {
         pageA: './src/pageA.js',
         pageB: './src/pageB.js',
         pageC: './src/pageC.js'
     }, */
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/'
        //在html中引用打包出来的资源的时候加什么前缀
        //publicPath: 'http://img.zhufengpeixun.cn'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: path.resolve('./src'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "stage-0", "react"]
                    }
                }]

                //use: ["happypack/loader?id=babel"],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                //use: ["happypack/loader?id=css"],

            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new ModuleConcatenationPlugin(),
        new webpack.HotModuleReplacementPlugin()
        /* new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageA.html',
            chunks: ['pageA']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageB.html',
            chunks: ['pageB']
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'pageC.html',
            chunks: ['pageC']
        }), */
        /*  new HappyPack({
             id: 'babel',
             use: [
                 {
                     loader: 'babel-loader',
                     options: {
                         presets: []
                     }
                 }
             ],
             threads: 2//默认是当前CPU的核心数-1
         }),
         new HappyPack({
             id: 'css',
             use: ['style-loader', 'css-loader'],
             threads: 2
         }) */
    ]
}