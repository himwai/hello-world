const path = require("path");
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const srcPath = "./src";
const buildPath = "../main/webapp/resources";

module.exports = {
	entry : srcPath + "/index.js",
	devtool : "inline-source-map",
	output : {
		path : path.join(__dirname, buildPath),
		filename : "bundle.js"
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
			exclude : /node_modules/,
			use : [ {
				loader : "style-loader" // creates style nodes from JS strings
			}, {
				loader : "css-loader" // translates CSS into CommonJS
			} ]
		} ]
	},

	optimization : {
		minimizer : [ new UglifyJsPlugin() ]
	}
};
