let { resolve } = require('path');
module.exports = function(texture,name){
    return {
        mode:'development',
        context: __dirname,
        entry: `./${texture}`,// ./example.txt
        output: {
            path: resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    test: /\.txt$/,
                    use: [
                        { loader: resolve(__dirname, '../src/loaders/text-loader'),
                        options:{
                            name
                        }}
                    ]
                }
            ]
        }
    }
}