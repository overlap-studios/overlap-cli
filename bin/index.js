#!/usr/bin/env node

const program = require("commander");
const shell = require("shelljs");
const fs = require("fs");
const path = require("path");

program
	.version("0.0.1")
	.option("-r, --readme", "Add readme")
	.option("-e, --eslint", "Add eslint config")
	.parse(process.argv);


/**
 * todo: add webpack analyser
 * todo: add .gitignore
 */



if (program.readme) {
	console.log("Adding the SHD default readme template");
	const readmePath = path.resolve(__dirname, "README.md");

	fs.copyFile(readmePath, "./README.md", (err) => {
		if (err) {
			throw err;
		}
		console.log("successfully added README.md template");

    /**
     * todo -> find / replace things like authors, project name, npm scripts....
     */
	});
}

if (program.eslint) {
	console.log("Adding the SHD default ESLINT configuration");

	shell.exec("npm i --save-dev eslint @studiohyperdrive/eslint-config");
	const eslintPath = path.resolve(__dirname, "ESLINT.js");

	fs.copyFile(eslintPath, "./.eslintrc.js", (err) => {
		if (err) {
			throw err;
		}
		console.log("successfully installed & added eslint configuration");
	});
}
