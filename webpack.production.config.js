/* global module */
var path = require('path');
var webpack = require('webpack');
var WebpackStrip = require('strip-loader');

module.exports = {
	entry: [
			'babel-polyfill',
	    path.resolve(__dirname, 'app/index.js')
    ],
	output: {
		path: path.resolve(__dirname, 'public/assets'),
		publicPath: '/assets/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.DefinePlugin({
    	ENVIRONMENT: JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.optimize.DedupePlugin(),
	  new webpack.optimize.UglifyJsPlugin({
	    minimize: true,
	    compress: {
	      warnings: false
	    }
	  })
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


      { test: /\.js$/, loader: 'strip-loader?strip[]=debug,strip[]=console.log' },

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
			//
			// {
			// 	test: /\.(svg)(\?[a-z0-9]+)?$/,
      // 	loader: 'file-loader'
			// }
		]
	}
};
