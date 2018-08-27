var path = require("path");

const srcPath = "./src";
const buildPath = "../main/webapp/resources";

module.exports = {
  entry: srcPath+"/index.js",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, buildPath),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, srcPath),
        loader: "babel-loader",
        query: {
          presets: ["env", "react", "stage-2"]
        }
      }
    ]
  }
}

