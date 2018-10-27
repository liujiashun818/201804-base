const path = require('path');
const webpack = require('webpack');
const base = require('./webpack.base');
const { smart } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let entry = {
    login:'./src/login.js',
    main:'./src/index.js'
};
let htmlWebpackPlugins = Object.keys(entry).map(key=>new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: `${key}.html`,
    chunks:[key],
    minify:{
        removeAttributeQuotes:true,
        removeComments:true
    }
}));
module.exports = smart(base,{
    mode:'production',
    entry,
    output:{
        filename:'[name].js'
    },
    plugins:[
      ...htmlWebpackPlugins
    ]
});