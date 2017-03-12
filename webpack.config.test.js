var nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	// module: {
	// 	loaders: [
	// 		{
	// 			test: /\.js(x?)$/,
	// 			exclude: /(node_modules|bower_components)/,
	// 			loader: {
	// 				loader: 'babel-loader',
	// 				options: {
	// 					cacheDirectory: './.build/.cache'
	// 				}
	// 			},
	// 		},
	// 		{
	// 			test: /client[\\\/].*$/,
	// 			exclude: /(node_modules|bower_components)/,
	// 			loader: 'null-loader',
	// 		},
	// 		{
	// 			test: /\.properties$/,
	// 			exclude: /(node_modules|bower_components)/,
	// 			loaders: ['json-loader', 'java-properties-loader']
	// 		},
	// 		{
	// 			test: /\.(scss|sass)$/,
	// 			loader: 'null-loader'
	// 		},
	// 		{
	// 			test: /\.css$/,
	// 			loader: 'null-loader'
	// 		},
	// 		{
	// 			test: /\.graphql$/,
	// 			loaders: ['graphql-tag/loader']
	// 		}
	// 	],
	// }
}