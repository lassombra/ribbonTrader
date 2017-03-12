const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
//noinspection JSUnresolvedFunction
module.exports = {
    context: path.resolve(__dirname),
    target: 'node',
    entry: {
        app: ['isomorphic-fetch','./framework/bootstrap.js','./framework/webpackTools/poll'],
    },
	devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '.build/.server'),
        filename: '[name].bundle.js',
    },
	resolve: {
		modules: [
			'node_modules',
			path.resolve(__dirname, 'framework/api'),
			path.resolve(__dirname, 'src')
		]
	},
	module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                exclude: /(node_modules|bower_components)/,
                loader: {
                	loader:'babel-loader',
	                options: {
                		cacheDirectory: './.build/.cache'
	                }
                },
            },
			{
				test: /client[\\\/].*$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'null-loader',
			},
			{
				test: /\.properties$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['json-loader', 'java-properties-loader']
			},
			{
				test: /\.(scss|sass)$/,
				loaders: [{
					loader: 'css-loader/locals',
					options: {
						modules: false,
						sourceMap: true,
						camelCase: true
					}
				},'sass-loader']
			},
			{
				test: /\.css$/,
				loader: {
					loader: 'css-loader/locals',
					options: {
						modules: false,
						sourceMap: true,
						camelCase: true
					}
				}
			},
			{
				test: /\.graphql$/,
				loaders: ['graphql-tag/loader']
			},
        ]
    },
	recordsPath: path.resolve(__dirname, './.build/server.json'),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new webpack.BannerPlugin({banner:'require("source-map-support").install();', raw: true,  entryOnly: false}),
		new webpack.DefinePlugin({
			SERVER: JSON.stringify(true),
			CLIENT: JSON.stringify(false),
		}),
		new webpack.NamedModulesPlugin(),
		new ManifestPlugin()
    ]
};