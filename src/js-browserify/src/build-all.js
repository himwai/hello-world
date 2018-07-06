const buildJs = require('./cityray-build');
const path = require('path');

const packageFile = "./package.json";
const srcRootPath = "./src/main/webapp/resources";
const cacheRootPath = "./target/temp";
const bundleRootPath = "./src/main/webapp/bundle";
/////////////////////////////////////////////////////////////////////

const jsxSourcePath = `${srcRootPath}/jsx`;
const jsCachePath = `${cacheRootPath}/js`;
const jsBundleCachePath = `${cacheRootPath}`;
const jsBundlePath = `${bundleRootPath}`;

let p1 = 	
	buildJs.cleanFolder(jsBundleCachePath)
	.then(() => {
		return buildJs.ensureFolder(jsCachePath)
		.then(() => console.log(`re-created folder ${jsCachePath}`))
		.catch(err => {
			throw err;
		});
	}).then(() => {
		return buildJs.readPackage(packageFile);
	}).then(packageJson => {
		return buildJs.jsxToJsDir(jsxSourcePath, jsCachePath, packageJson.babel)
			.then(() => packageJson);
	}).catch(err => {
		throw err;
	});

let p2 = 
	buildJs.ensureFolder(jsBundlePath)
	.then(() => {
		console.log(`ensure folder ${jsBundlePath} exist`);
		return jsBundlePath;
	}).catch(err => console.log(`Error catched ${err}`));

Promise.all([p1, p2])
	.then(resultset => {
		let config = resultset[0];
//		let outputPath = resultset[1];
		
		let bundleFile = path.basename(config.browser, '.js') + '-bundle.js';
		let mainJs = `${jsCachePath}/${config.browser}`;
		let bundleJs = `${jsBundleCachePath}/${bundleFile}`;
		
		console.log(`converting ${mainJs} to ${bundleJs}`);
		return buildJs.exists(mainJs).then(() => {
			return buildJs.bundle(mainJs, bundleJs);
		});
	}).then(file => {
		let baseFile = path.basename(file);
		let destFile = `${jsBundlePath}/${baseFile}`;
		return buildJs.minilify(file,destFile);
	}).then((file) => {
		console.log('===========================================');
		console.log(`${file} created and done`);
	}).catch(err => console.log(`Error catched ${err}`));

Promise.all([p1, p2])
	.then(test_resultset => {
		let config = test_resultset[0];
	//	let outputPath = resultset[1];
		
		let testBundleFile = path.basename(config.browser_test, '.js') + '-bundle.js';
		let testMainJs = `${jsCachePath}/${config.browser_test}`;
		let testBundleJs = `${jsBundleCachePath}/${testBundleFile}`;
		
		console.log(`converting ${testMainJs} to ${testBundleJs}`);
		return buildJs.exists(testMainJs).then(() => {
			return buildJs.testBundle(testMainJs, testBundleJs);
		});
	
	}).then(file => {
		let testBaseFile = path.basename(file);
		let testDestFile = `${jsBundlePath}/${testBaseFile}`;
		return buildJs.testMinilify(file,testDestFile);
	}).then((file) => {
		console.log('===========================================');
		console.log(`${file} created and done`);
	}).catch(err => console.log(`Error catched ${err}`));