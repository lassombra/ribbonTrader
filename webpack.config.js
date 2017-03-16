const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
//noinspection JSUnresolvedFunction
module.exports = {
    context: path.resolve(__dirname),
    target: 'node',
	externals: [nodeExternals()],
    entry: {
        app: ['isomorphic-fetch','./src/main.js'],
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
				test: /\.(css|scss|sass)$/,
				loader: 'null-loader'
			},
			{
				test: /\.graphql$/,
				loaders: ['graphql-tag/loader']
			},
        ]
    },
	recordsPath: path.resolve(__dirname, './.build/server.json'),
    plugins: [
		new webpack.BannerPlugin({banner:'require("source-map-support").install();', raw: true,  entryOnly: false}),
		new webpack.DefinePlugin({
			SERVER: JSON.stringify(true),
			CLIENT: JSON.stringify(false),
		}),
		new webpack.NamedModulesPlugin(),
    ]
};