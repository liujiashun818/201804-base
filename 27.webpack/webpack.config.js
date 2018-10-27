const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack')
module.exports = {
    optimization: {
        minimizer: [
            new UglifyJsWebpackPlugin({
                cache: true,//是否启动缓存
                sourceMap: true,//是否可以生成sourcemap文件
                parallel: true //是否可以并行压缩
            }),
            //压缩CSS文件
            new optimizeCssAssetsWebpackPlugin()
        ]
    },
    //当服务启动后会监听源文件的变化，当源文件发生变化后重新启动编译
    watch: true,//111111111111111111111111111
    watchOptions: {
        poll: 1000,//每秒询问文件1000次。
        aggregateTimeout: 500, //这其实就是防抖，防止反复重新编译
        ignored: /node_modules/ //指定不需要询问的文件
    },
    devtool: 'eval-source-map',
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    devServer: {
        port: 8080,
        ///配置静态文件根目录
        contentBase: path.resolve('dist'),
        compress: true
    },
    //告诉webpack此变量是我通过其它方式外部引入的，不需要打包到bundle.js文件中
    externals: {
        "jquery": "jQuery"//window.jQuery
    },
    module: {
        rules: [
            // {
            //     test: /jquery/,
            //     use: {
            //         loader: 'expose-loader?jQuery'
            //     }
            // },
            {
                test: /\.jsx?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["env", "stage-0", "react"],
                            plugins: ['transform-decorators-legacy']
                        }
                    }
                ]

            },
            {
                test: /\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader
                    , {
                        loader: 'css-loader'
                    }, 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [
                    MiniCSSExtractPlugin.loader
                    , 'css-loader', 'less-loader', 'postcss-loader']
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader
                    , 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'image'
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-withimg-loader'
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: path.resolve('src'),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].css',//提取保存后的文件名
            chunkFilename: '[id].css'//代码块
        }),
        //key就是在模块中使用的变量名，值就是模块名字
        new webpack.ProvidePlugin({
            "$": 'jquery'
        }),
        new webpack.BannerPlugin('珠峰培训')
    ]

}