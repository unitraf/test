const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require("path")

autoUpdater.autoDownload=false
autoUpdater.autoInstallOnAppQuit=true
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL( `file://${path.join(__dirname,"src", "index.html")}`)
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
mainWindow.webContents.openDevTools()

  mainWindow.once('ready-to-show', () => {
    autoUpdater.checkForUpdatesAndNotify();
    });
}



app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});


autoUpdater.on('update-available', () => {
  console.log("available");
	mainWindow.webContents.send('update_available');
  });
  autoUpdater.on('update-downloaded', () => {
    console.log("available");
	mainWindow.webContents.send('update_downloaded');
  });


  ipcMain.on('restart_app', () => {
	autoUpdater.quitAndInstall();
  });