const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
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
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist/react.manifest.json')
        })
    ]
}