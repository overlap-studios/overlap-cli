#!/usr/bin/env node

const program = require("commander");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

program
	.version("0.0.2")
	.option("-c, --convert [input]", "Convert model to dae")
	.option("-f --format [format]", "Specify the output format [format]", "dae")
	.option("-e, --eslint", "Add eslint config")
	.parse(process.argv);


if (program.convert) {
	const input = program.convert;
	const inputWithoutExtension = input.split(".")[0];
	const assimpPath = path.resolve(__dirname, "../assimp/assimp-overlap");
	// make a temp directory
	shell.exec("mkdir overlap-temp");

	console.log(`converting your input model to a ${program.format} file`);
	// convert the model to DAE so we can fix paths
	shell.exec(`${assimpPath} export ${input} overlap-temp/overlap-temp-model.dae`);

	// if the model was created on windows, swap out all the backslashes with foreward slashes for unix use
	const script = `sed -i "" 's.\\\\./.g' overlap-temp/overlap-temp-model.dae`;
	shell.exec(script);

	// export the model to specified format
	shell.exec(`${assimpPath} export overlap-temp/overlap-temp-model.dae ${inputWithoutExtension}.${program.format}`);

	// remove the temp folder
	shell.exec(`rm -rf overlap-temp`);
}

if (program.eslint) {
	console.log("Adding our ESLINT configuration");

	shell.exec("npm i --save-dev eslint @studiohyperdrive/eslint-config");
	const eslintPath = path.resolve(__dirname, "ESLINT.js");

	fs.copyFile(eslintPath, "./.eslintrc.js", (err) => {
		if (err) {
			throw err;
		}
		console.log("successfully installed & added eslint configuration");
	});
}
