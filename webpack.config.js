/* global module */
var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
require('es6-promise').polyfill();
require('babel-polyfill');


module.exports = {
    //devtool: 'source-map',
    entry: [
        'babel-polyfill',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://10.0.0.181:3005',
        path.resolve(__dirname, 'app/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'public/'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public/'),
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        stats: { colors: true },
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(process.env.NODE_ENV)
        }),
        new HtmlWebpackPlugin({
            inject: true,
            alwaysWriteToDisk: true,
            template: path.resolve(__dirname, 'public/index.ejs'),

        }),
        new HtmlWebpackHarddiskPlugin({
            outputPath: path.resolve(__dirname, 'public/'),
        }),
    ],
    resolve: {
        alias: {
            config: path.resolve('./app/config'),
            actions: path.resolve('./app/actions'),
            reducers: path.resolve('./app/views'),
            components: path.resolve('./app/components'),
            containers: path.resolve('./app/containers'),
            styles: path.resolve('./app/styles')
        }

    },
    module: {
        loaders: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel'],
                include: path.join(__dirname, 'app')
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap']
            },

            { test: /\.eot(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject' },
            { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' },
            { test: /\.woff(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' },
            { test: /\.ttf(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' },
            { test: /\.svg\?(\S*)?$/, loader: 'url-loader?limit=100000&mimetype=image/svg+xml' },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    }
};
