import { screen, IpcMain, BrowserWindow, ipcMain } from 'electron';

export default function () {
  ipcMain.on('show-new-window', () => {
    console.log('new window');
  });
}
