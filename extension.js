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
		
		if(vscode.workspace.workspaceFolders !== undefined){
			if(!fs.existsSync(generationPath)){
				fs.mkdirSync(generationPath);
				try{
					fs.copyFileSync(`${templatesPath}\\c_cpp_properties.json`, `${generationPath}\\c_cpp_properties.json`)
					fs.copyFileSync(`${templatesPath}\\launch.json`, `${generationPath}\\launch.json`)
					fs.copyFileSync(`${templatesPath}\\settings.json`, `${generationPath}\\settings.json`)
					fs.copyFileSync(`${templatesPath}\\tasks.json`, `${generationPath}\\tasks.json`)
					fs.copyFileSync(`${templatesPath}\\main.txt`, `${workspacePath}\\main.cpp`);
					vscode.window.showInformationMessage("Generated new C++ Project within workspace folder.")
				}catch(e){
					vscode.window.showErrorMessage('There has been an issue copying files from templates. You can report this issue to the repository.\n' + e)
				}
				
			}
			else{
				vscode.window.showErrorMessage('.vscode Folder already exists. Please consider using a fresh workspace.')
			}
		}
	}));
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
