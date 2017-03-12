const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractMainCSS = new ExtractTextPlugin({filename: '[name].[hash].css'});
const extractHeadCSS = new ExtractTextPlugin({filename: '[name].head.css'});
module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: ['isomorphic-fetch','./framework/bootstrap.js'],
    },
	devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, './.build/.client'),
        filename: '[name].[hash].js',
        publicPath: `${process.env.ROOT_URL || ''}/webapp/`,
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
				test: /server[\\\/].*$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'null-loader',
			},
			{
				test: /\.properties$/,
				exclude: /(node_modules|bower_components)/,
				loaders: ['json-loader', 'java-properties-loader']
			},
			{
				test: /^((?!important\.(scss|sass)).)*\.(scss|sass)$/,
				use: extractMainCSS.extract([{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					}
				},{
					loader:'sass-loader',
					options: {
						sourceMap: true,
					}
				}])
			},
			{
				test: /\.important\.(scss|sass)$/,
				use: extractHeadCSS.extract(
					[
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: true,
								importLoaders: 1
							}
						}, {
							loader: 'sass-loader',
							options: {
								sourceMap: true,
								outputStyle: 'expanded',
								sourceMapContents: true
							}
						}
					]
				),
			},
	        {
	        	test: /\.(eot|ttf|woff|woff2|svg)$/,
		        loader: 'file-loader'
	        },
			{
				test: /\.graphql$/,
				loaders: ['graphql-tag/loader']
			},
        ]
    },
	recordsPath: path.resolve(__dirname, './.build/client.json'),
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			SERVER: JSON.stringify(false),
			CLIENT: JSON.stringify(true),
		}),
		new webpack.NamedModulesPlugin(),
		new ManifestPlugin(),
		extractHeadCSS,
		extractMainCSS,
    ]
};