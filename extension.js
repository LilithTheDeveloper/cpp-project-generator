const vscode = require('vscode');
const fs = require('fs');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	var workspacePath = vscode.workspace.workspaceFolders[0].uri.fsPath;

	var templateDir = "\\templates";
	var templatesPath = __dirname + templateDir;

	var vscodeDir = '\\.vscode';
	var generationPath = workspacePath + vscodeDir;

	context.subscriptions.push(vscode.commands.registerCommand('cpp-project-generator.generateProject', function () {
		vscode.window.showInformationMessage('Generating C++ project...');
		if(vscode.workspace.workspaceFolders !== undefined){
			if(!fs.existsSync(generationPath)){
				fs.mkdirSync(generationPath);
				fs.copyFileSync(`${templatesPath}\\c_cpp_properties.json`, `${generationPath}\\c_cpp_properties.json`)
				fs.copyFileSync(`${templatesPath}\\launch.json`, `${generationPath}\\launch.json`)
				fs.copyFileSync(`${templatesPath}\\settings.json`, `${generationPath}\\settings.json`)
				fs.copyFileSync(`${templatesPath}\\tasks.json`, `${generationPath}\\tasks.json`)
				fs.copyFileSync(`${templatesPath}\\main.txt`, `${workspacePath}\\main.cpp`);
			}
			else{
				vscode.window.showErrorMessage('.vscode Folder already exists. Please consider creating a new folder.')
			}
		}
	}));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
