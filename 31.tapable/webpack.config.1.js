const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
/**
 * 1. 直接写成绝对路径
 * 2. 可以在resolveLoader里面配别名
 * 3. 可以直接放在node_modules
 * 4. 可以配置resolveLoader的modules
 * 5  通过npm link 引入
 */
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist')
    },
    /* resolve: {
        alias: {
            "babel-loader": resolve(__dirname, 'src/loaders/babel-loader.js')
        }
    },
     */
    //watch: true,
    resolveLoader: {
        modules: [
            resolve(__dirname, 'src/loaders'),
            resolve(__dirname, 'node_modules')
        ]
        /*alias: {
             "babel-loader": resolve(__dirname, 'src/loaders/babel-loader.js')
         } */
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|gif|bmp)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader',
                            limit: 80000,
                            filename: '[name]_[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                include: resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['style-loader', 'less-loader']
            },
            {
                test: /\.js$/,
                include: resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: []
                /* use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["@babel/env", {
                                targets: {
                                    edge: "17",
                                    firefox: "60",
                                    chrome: "67",
                                    safari: "11.1"
                                },
                                useBuiltIns: "usage"
                            }]
                        ]
                    }
                }] */
                //use: [resolve(__dirname, 'src/loaders/babel-loader.js')]
                /* use: [{
                    loader: 'log1-loader',
                    options: {
                        replacement: 'let a=1'
                    }
                },
                    'log2-loader',
                    'log3-loader'] */
            }
            , {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-layout-loader',
                        options: {
                            layout: resolve(__dirname, 'src/layout.html'),
                            placeholder: '{{__content__}}'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/page1.html',
            filename: 'page1.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/page2.html',
            filename: 'page2.html'
        }),
        new HtmlWebpackPlugin({
            template: './src/page.html',
            filename: 'page.html'
        })
    ]
}