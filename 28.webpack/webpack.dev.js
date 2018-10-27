const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { smart } = require('webpack-merge');
//有些项目需要多入口 {}
module.exports = smart(base,{
    mode:'development',
    entry:{
        login:'./src/login.js',
        main:'./src/index.js'
    },
    output:{
        filename:'[name].js'
    }
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: '[name].html'
        })
    ]
});