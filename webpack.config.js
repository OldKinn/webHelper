var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './dist/views/app.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },
    resolve: {
        root: [path.join(__dirname, './')],
        alias: {
            jquery: 'statics/libs/jquery/jquery.min.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery'
        })
    ]
};