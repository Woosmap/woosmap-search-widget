"use strict";
// const fs = require('fs');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var loaders = [];

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
        new CopyWebpackPlugin([{
            from: 'WebContent/NORAUTO-INDEX_COPIE_files', to: "NORAUTO-INDEX_COPIE_files"
        }
            , {
                from: 'app/css', to: "css"
            },
            {
                from: 'app/fonts', to: "fonts"
            }, {
                from: 'app/img', to: "img"
            }])
        //     from: 'app/src/assets', to: "assets"
        // },
        //     {
        //         from: 'app/src/utils/promise.min.js', to: "promise.min.js"
        //     }])
        // ,
        // // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'console-libs',
        //     filename: "[chunkhash].console-libs.js",
        //     minChunks: function (module) {
        //         return isExternal(module);
        //     }
        // })
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
