/* global module */
var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: [
			'webpack/hot/dev-server',
			'webpack-dev-server/client?http://localhost:8080',
      path.resolve(__dirname, 'app/App.js')
    ],
	output: {
		path: path.resolve(__dirname, 'public'),
		publicPath: '/assets/',
		filename: 'bundle.js'
	},
	devServer: {
	contentBase: 'public',
	//
	historyApiFallback: true,
  hot: true,
  inline: true,
  progress: true,
		watchOptions: {
	  	aggregateTimeout: 300,
	  	poll: 1000
	  },
	// 	filename: "bundle.js",
  //   // display only errors to reduce the amount of output
    stats: { colors: true },
	//
  //   // parse host and port from env so this is easy
  //   // to customize
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.(jsx|js)?$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['react-hot', 'babel'],
				include: path.join(__dirname, 'app')
			}
		]
	}
};
