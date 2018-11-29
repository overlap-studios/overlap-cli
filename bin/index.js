#!/usr/bin/env node

const program = require("commander");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

program
	.version("0.0.1")
	.option("-c, --convert [input]", "Convert model to dae [model]", "model")
	.option("-e, --eslint", "Add eslint config")
	.parse(process.argv);


if (program.convert) {
	const input = program.convert;
	const inputWithoutExtension = input.split(".")[0];

	console.log("converting your input model to a .dae file");
	// convert the model to something we can work with
	shell.exec(`assimp export ${input} ${inputWithoutExtension}.dae`);

	// if the model was created on windows, swap out all the backslashes with foreward slashes for unix use
	const script = `sed -i "" 's.\\\\./.g' ${inputWithoutExtension}.dae`;
	shell.exec(script);
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
