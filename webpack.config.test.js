const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV='coverage';

//noinspection JSUnresolvedFunction
module.exports = {
	context: path.resolve(__dirname),
	target: 'node',
	externals: [nodeExternals()],
	resolve: {
		modules: [
			'node_modules',
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
				loader: 'null-loader'
			},
			{
				test: /\.css$/,
				loader: 'null-loader'
			},
			{
				test: /\.graphql$/,
				loaders: ['graphql-tag/loader']
			}
        ],
		noParse: [
			/sinon/,
			/iconv-loader/,
			/enzyme/
		],
		// enable sourcemaps support
		output: {
			devtoolModuleFilenameTemplate: '[absolute-resource-path]',
			devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
		}
    },
	recordsPath: path.resolve(__dirname, './.build/server.json'),
    plugins: [
		new webpack.DefinePlugin({
			SERVER: JSON.stringify(true),
			CLIENT: JSON.stringify(false),
		}),
		new webpack.NamedModulesPlugin()
    ]
};