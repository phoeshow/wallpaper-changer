import { app, BrowserWindow } from 'electron';
import path from 'path';
import ipc from './ipc';
import createTray from './tray';
import is from 'electron-is';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const additionalData = { appKey: 'wallpaper changer' };
const gotTheLock = app.requestSingleInstanceLock(additionalData);

let mainWindow = null;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    frame: false,
    show: false,
    title: 'Wallpaper Changer',
    backgroundColor: '#ffffff',
    icon: is.windows()
      ? path.resolve(__dirname, '..', 'icons/icon.ico')
      : path.resolve(__dirname, '..', 'icons/icon.icns'),
    show: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  // Open the DevTools.
  if (is.dev()) {
    mainWindow.webContents.openDevTools();
  }
};

if (!gotTheLock) {
  app.quit();
} else {
  app.on(
    'second-instance',
    (event, commandLine, workingDirectory, additionalData) => {
      // Print out data received from the second instance.
      console.log(additionalData);

      // Someone tried to run a second instance, we should focus our window.
      if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore();
        if (!mainWindow.isVisible()) mainWindow.show();
        mainWindow.focus();
      }
    }
  );

  app
    .whenReady()
    .then(() => {
      if (is.macOS()) {
        app.dock.hide();
      }
    })
    .then(() => {
      ipc();
      // 注册系统托盘
      const tray = createTray();
      tray.on('click', () => {
        mainWindow.show();
      });
      createWindow();
    });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
