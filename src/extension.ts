// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "react-webview-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.viewconfig', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		//vscode.window.showInformationMessage('Hello World!');
		let openDialogOptions: vscode.OpenDialogOptions = {
			canSelectFiles: true,
			canSelectFolders: false,
			canSelectMany: false,
			filters: {
			  Json: ["json"]
			}
		  };
		
		  vscode.window
			.showOpenDialog(openDialogOptions)
			.then(async (uri: vscode.Uri[] | undefined) => {
			  if (uri && uri.length > 0) {
				vscode.window.showInformationMessage(uri[0].fsPath);
			  } else {
				vscode.window.showErrorMessage("No valid file selected!");
				return;
			  }
			});
	});

	context.subscriptions.push(disposable);
}
	
export default class ViewLoader {
	private readonly _panel: vscode.WebviewPanel | undefined;
  
	constructor(fileUri: vscode.Uri) {
	  this._panel = vscode.window.createWebviewPanel(
		"configView",
		"Config View",
		vscode.ViewColumn.One,
		{}
	  );
  
	  this._panel.webview.html = this.getWebviewContent(fileUri.fsPath);
	}
  
	private getWebviewContent(filepath: string): string {
	  return `<!DOCTYPE html>
	  <html lang="en">
	  <head>
		  <meta charset="UTF-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1.0">
		  <title>Config View</title>
	  </head>
	  <body>
		  <img src="https://media.giphy.com/media/uoAn5ik8zAuqI/giphy.gif" width="300" /><br/>
		  <code>${filepath}</code>
	  </body>
	  </html>`;
	}
  }
	


// this method is called when your extension is deactivated
export function deactivate() {}
