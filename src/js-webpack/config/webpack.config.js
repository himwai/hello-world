const path = require("path");
const fs = require('fs');

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
// console.log("appDirectory:", appDirectory);

const appSrcPath = path.resolve(appDirectory, "./src");
const appSrcIndexFile = path.resolve(appSrcPath, "index.js");
const appBuildPath = path.resolve(appDirectory, "../main/webapp/resources");

module.exports = {
	entry : {
		index : appSrcIndexFile
	},
	devtool : "inline-source-map",
	output : {
		path : appBuildPath,
		filename : "bundle-[name].js"
	},

	module : {
		rules : [ {
			test : /\.(js|jsx)$/,
			exclude : /node_modules/,
			use : [ {
				loader : "babel-loader"
			} ]
		}, {
			test : /\.css$/,
			// exclude : /node_modules/,
			use : [ {
				loader : "style-loader" // creates style nodes from JS strings
			}, {
				loader : "css-loader" // translates CSS into CommonJS
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
