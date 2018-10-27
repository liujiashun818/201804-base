const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');
module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].dll.js',
        library: '_dll_[name]'//全局变量名 var _dll_react=(function(){})
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve('src'),
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "stage-0", "react"]
                    }
                }
            }
        ]
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}