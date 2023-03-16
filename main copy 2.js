const { app, BrowserWindow, ipcMain } = require('electron')
const os = require("os");
const fs = require("fs");
const path = require("path");

let win
let worker

function createWindow () {
// Create the browser window.
win = new BrowserWindow({
	width: 800,
	height: 600,
	webPreferences: {
	nodeIntegration: true
	}
})

worker = new BrowserWindow({
	width: 800,
	height: 600,
    show:false,
	webPreferences: {
	nodeIntegration: true
	}
})

// Load the index.html of the app.
win.loadFile('src/index.html')
worker.loadFile('src/worker.html')

// Open the DevTools.
win.webContents.openDevTools()
worker.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// This method is equivalent to 'app.on('ready', function())'
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
// On macOS it is common for applications and their menu bar
// to stay active until the user quits explicitly with Cmd + Q
if (process.platform !== 'darwin') {
	app.quit()
}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the
	// app when the dock icon is clicked and there are no
	// other windows open.
if (BrowserWindow.getAllWindows().length === 0) {
	createWindow()
}
})

// In this file, you can include the rest of your
// app's specific main process code. You can also
// put them in separate files and require them here.

// retransmit it to worker
ipcMain.on("printPDF", (event, content) => {
    console.log(content);
    worker.webContents.send("printPDF", content);
});
// when worker window is ready

let options = {
	silent: false,
	printBackground: true,
	color: false,
	margin: {
		marginType: 'printableArea'
	},
	landscape: true,
	pagesPerSheet: 1,
	collate: false,
	copies: 2,
    headerFooterInfo:{header: 'Header of the Page',
	footer: 'Footer of the Page'}
	
}
ipcMain.on("readyToPrintPDF", (event, content) => {
    console.log('====================================');
    console.log(content);
    console.log('====================================');
    // Print Worker
    // win = BrowserWindow.getFocusedWindow();
	// let win = BrowserWindow.getAllWindows()[0];

	worker.webContents.print({}, (success, failureReason) => {
		if (!success) console.log(failureReason);

		console.log('Print Initiate');
	});
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    // Use default printing options
    // worker.webContents.printToPDF({}).then((data) {
    //     fs.writeFile(pdfPath, data, function (error) {
    //         if (error) {
    //             throw error
    //         }
    //         shell.openItem(pdfPath)
    //         event.sender.send('wrote-pdf', pdfPath)
    //     })
    // }).catch((error) => {
    //    throw error;
    // })
});