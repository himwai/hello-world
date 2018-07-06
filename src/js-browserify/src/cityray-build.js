const fs = require('fs-extra');
const path = require('path');
const rimraf = require('rimraf');
const babel = require('babel-core');
const browserify = require('browserify');
const uglifyjs = require('uglify-js');

module.exports = {
	cleanFolder(folderName) {
		return new Promise((resolve, reject) => {
			rimraf(folderName, err => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});	
	},
	
	ensureFolder(folderName) {
		return fs.ensureDir(folderName);
	},
	
	exists(filename) {
		return new Promise((resolve, reject) => {
			try {
				fs.exists(filename, () => {
					resolve(filename);
				});
			} catch(err) {
				reject (err);
			}
		});
	},

	recreateFolder(folderName) {
		return this.cleanFolder(folderName)
			.then(() => {
				return this.ensureFolder(folderName)
			}).catch(err => {
				throw err;
			});
	},
	
	readPackage(packagefile) {
		return fs.readJson('./package.json'); // return json
	},
	
	jsxToJs(file, config) {
		return new Promise((resolve, reject) => {
			babel.transformFile(file, config, (err, result) => {
				if (err) { 
					reject(err);
				} else {
					resolve(result);
				}
			})
		});
	},

	jsxToJsFile(fileSource, fileDestination, config) {
		return new Promise((resolve, reject) => {
			babel.transformFile(file, config, (err, result) => {
				if (err) { 
					reject(err);
				} else {
					resolve(result);
				}
			})
		});
	},

	jsxToJsDir(folderSource, folderDestination, config) {
		return new Promise((resolve, reject) => {
			fs.readdir(folderSource, (err, files) => {
				Promise.all(files.map(file => {
					return this.jsxToJs(
						`${folderSource}/${file}`, 
						config
					).then(result => {
						return new Promise((resolve, reject) => {
							try {
								let jsFile = path.basename(file, '.jsx') + '.js';
								let writeStream = fs.createWriteStream(`${folderDestination}/${jsFile}`);
								writeStream.write(result.code);
								writeStream.end(() => {
									console.log(`converted ${folderSource}/${file} to ${folderDestination}/${jsFile}`);
									resolve(`${folderDestination}/${jsFile}`);
								});
							} catch(err) {
								reject(err);
							}
						});
					}).catch(err => {
						throw err;
					});
				})).then(() => {
					console.log("jsx to js done");
					resolve();
				}).catch(err => {
					reject(err);
				});
			});
		});
	},
	
	bundle(mainJs, bundleJs) {
		return new Promise((resolve, reject) => {
			return this.exists(mainJs).then(() => {
				try {
					let bundleFileStream = fs.createWriteStream(bundleJs);
					
					browserify(mainJs)
						.bundle().pipe(bundleFileStream);
					
					bundleFileStream.on('finish', () =>{
						console.log(`converted ${mainJs} to ${bundleJs}`);
						resolve(bundleJs);
					});
					
//					bundleFileStream.end(() =>{
//						console.log(`end ${mainJs} to ${bundleJs}`);
//						resolve(bundleJs);
//					});

				} catch(err) {
					reject(err);
				}
			});
				
		});
	},
	
	testBundle(testMainJs, testBundleJs) {
		return new Promise((resolve, reject) => {
			return this.exists(testMainJs).then(() => {
				try {
					let testBundleFileStream = fs.createWriteStream(testBundleJs);
					
					browserify(testMainJs)
						.bundle().pipe(testBundleFileStream);
					
					testBundleFileStream.on('finish', () =>{
						console.log(`converted ${testMainJs} to ${testBundleJs}`);
						resolve(testBundleJs);
					});
				} catch(err) {
					reject(err);
				}
			});
				
		});
	},
	
	minilify(srcFile, destFile) {
		return new Promise((resolve,reject) => {
			fs.readFile(srcFile, 'utf8', (err, data) => {
				  if (err) throw err;
				  
				  let result = uglifyjs.minify(data);

				  if (result.error) {
				  		console.log(result.error); // runtime error, or `undefined` if no error
				  		reject(result.error);
				  } else if (result.code) {
				  		let bundleFileStream = fs.createWriteStream(destFile, 'utf8');
				  		bundleFileStream.write(result.code);
				  		bundleFileStream.end(() => {
				  			resolve(destFile);
				  		});	
				  }	  
			});
		});

	},
	
	testMinilify(srcFile, testDestFile) {
		return new Promise((resolve,reject) => {
			fs.readFile(srcFile, 'utf8', (err, data) => {
				  if (err) throw err;
				  
				  let result = uglifyjs.minify(data);

				  if (result.error) {
				  		console.log(result.error); // runtime error, or `undefined` if no error
				  		reject(result.error);
				  } else if (result.code) {
				  		let testBundleFileStream = fs.createWriteStream(testDestFile, 'utf8');
				  		testBundleFileStream.write(result.code);
				  		testBundleFileStream.end(() => {
				  			resolve(testDestFile);
				  		});	
				  }	  
			});
		});

	}

	
};




