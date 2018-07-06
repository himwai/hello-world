const buildJs = require('./cityray-build');
const path = require('path');
const fs = require('fs-extra');
const UglifyJS = require('uglify-js');

const packageFile = "./package.json";
const jsxSourcePath = "./src/main/resources/jsx";
const jsCachePath = "./target/temp/js";
const jsBundleCachePath = "./target/temp";
const jsBundlePath = "./src/main/webapp/bundle"

	fs.readFile("./target/temp/index-bundle.js", 'utf8', (err, data) => {
		  if (err) throw err;
		  
		  console.log(data);
		  let result = UglifyJS.minify(data);

		  if (result.error) {
		  	console.log(result.error); // runtime error, or `undefined` if no error
		  } else if (result.code) {
		  	let bundleFileStream = fs.createWriteStream("./src/main/webapp/bundle/index-bundle.js", 'utf8');
		  	bundleFileStream.write(result.code);
		  	bundleFileStream.end(() => {
		  		console.log(result.code); 
		  	});	
		  }	  
	});

