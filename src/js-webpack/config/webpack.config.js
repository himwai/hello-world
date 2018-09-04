const path = require("path");
const fs = require('fs');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const appDirectory = fs.realpathSync(process.cwd());
// console.log("appDirectory:", appDirectory);

const appSrcPath = path.resolve(appDirectory, "./src");
const appSrcIndexFile = path.resolve(appSrcPath, "index.js");
const appBuildPath = path.resolve(appDirectory, "../main/webapp/resources");

module.exports = {
	mode : 'production',
	entry : {
		index : appSrcIndexFile
	},
	// devtool : "inline-source-map",
	output : {
		path : appBuildPath,
		filename : "bundle-[name].js"
	},

	plugins : [ new MiniCssExtractPlugin({
		filename : '[name].[hash].css',
		chunkFilename : '[id].[hash].css',
	}) ],

	module : {
		rules : [ {
			test : /\.(js|jsx)$/,
			exclude : /node_modules/,
			use : [ {
				loader : "babel-loader"
			} ]
		}, {
			test : /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use : [ {
				loader : 'file-loader',
				options : {
					name : '[name].[ext]',
					outputPath : 'static/media/'
				}
			} ]
		}, {
			test : /\.css$/,
			// exclude : /node_modules/,
			use : [ {
				loader : MiniCssExtractPlugin.loader
//			}, {
//				loader : "style-loader" 
			}, {
				loader : "css-loader" 
//			}, {
//				loader : "postcss-loader" 
//			}, {
//				loader : "sass-loader" 
			} ]
		} ]
	},

	optimization : {
		minimizer : [ new UglifyJsPlugin({
			uglifyOptions : {
				output : {
					comments : false,
					beautify : false,
				},
				ie8 : false,
				safari10 : false,
			}
		}) ]
	}
};
