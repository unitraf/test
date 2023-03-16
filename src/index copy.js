const electron = require('electron')
// Importing BrowserWindow from Main
const BrowserWindow = electron.remote.BrowserWindow;

var url = document.getElementById('url');
var options = {
	silent: false,
	printBackground: true,
	color: false,
	margin: {
		marginType: 'printableArea'
	},
	landscape: false,
	pagesPerSheet: 1,
	collate: false,
	copies: 1,
	header: 'Header of the Page',
	footer: 'Footer of the Page'
}

url.addEventListener('click', (event) => {
	// Defining a new BrowserWindow Instance
	let win = new BrowserWindow({
		show: true,
		webPreferences: {
			nodeIntegration: true
		}
	});
	win.loadURL(`http://localhost:3000/`);

	win.webContents.on('did-finish-load', () => {
		win.webContents.print(options, (success, failureReason) => {
			if (!success) console.log(failureReason);
			console.log('Print Initiated');
		});
	});
});


var current = document.getElementById('current');
var lorem = document.getElementById('lorem');

var options = {
	silent: false,
	printBackground: true,
	color: true,
	margin: {
		marginType: 'printableArea'
	},
	landscape: false,
	pagesPerSheet: 1,
	collate: false,
	copies: 1,
	header: 'Header of the Pag',
	footer: 'Footer of the Page'
}

current.addEventListener('click', (event) => {
  
	let win = BrowserWindow.getFocusedWindow();
	// let win = BrowserWindow.getAllWindows()[0];

	win.webContents.print(options, (success, failureReason) => {
		if (!success) console.log(failureReason);

		console.log('Print Initiated');
	});
});
