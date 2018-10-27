const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackDonePlugin = require('./src/plugins/webpack-done-plugin');
const WebpackDone2Plugin = require('./src/plugins/webpack-done2-plugin');
const WebpackModulePlugin = require('./src/plugins/webpack-module-plugin');
const FileListPlugin = require('./src/plugins/filelist-plugin');
const UploadCDNPlugin = require('./src/plugins/upload-cdn-plugin');
const WebpackInlinePlugin = require('./src/plugins/webpack-inline-plugin');
const AutoExternalPlugin = require('./src/plugins/auto-external-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: resolve(__dirname, 'dist'),
        filename:'[name]_[hash:8].js'
    },
    //key是模块名 值是一个变量名 可能来自于window this
    /* externals:{
        'jquery':'jQuery'
    }, */
    plugins: [
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html'
        }),
        new AutoExternalPlugin({
            'jquery':{
                var:'jQuery',
                url:'https://cdn.bootcss.com/jquery/3.3.0/jquery.js'
            },
            'lodash':{
                var:'_',
                url:'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.10/lodash.core.min.js'
            }
        })
       /*  new WebpackInlinePlugin({

        }), */
       
       /*  new WebpackDone2Plugin({
            name:'zfpx2'
        }),
       new WebpackDonePlugin({
           name:'zfpx1'
       }),
       new WebpackModulePlugin(), */
       /* new UploadCDNPlugin({
           
       }), */
       /* new FileListPlugin({
           filename:'manifest.md'
       }) */
    ]
}