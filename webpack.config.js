"use strict";
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
    node: {
        fs: "empty"
    },
    entry: './app/src/index.js',

    output: {path: __dirname + '/build', filename: "reco.js", publicPath: "/"},

    module: {
        loaders: []
    },

    devServer: {
        disableHostCheck: true
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'WebContent/index.html'
        })
        ,
        new CopyWebpackPlugin([
            {from: 'WebContent/NORAUTO-INDEX_COPIE_files', to: "NORAUTO-INDEX_COPIE_files"},
            {from: 'app/css', to: "css"},
            {from: 'app/fonts', to: "fonts"},
            {from: 'app/img', to: "img"}
        ])
    ]
};
webpackConfig.module.loaders.push({test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/});

if (process.env.DEBUG === 'yes') {
    webpackConfig.devtool = 'source-map';
}
else {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
}

module.exports = webpackConfig;
