import { Tray, Menu, BrowserWindow } from 'electron';
import is from 'electron-is';
import path from 'path';

let tray;

export default function createTray() {
  tray = new Tray(
    is.windows()
      ? path.resolve(__dirname, '..', 'icons/win/icon.ico')
      : path.resolve(__dirname, '..', 'icons/png/24x24.png')
  );

  const trayContextMenu = Menu.buildFromTemplate([
    {
      label: '显示窗口',
      click: () => {
        // ipcMain.send('SHOW_MAIN_WINDOW');
        const allWindows = BrowserWindow.getAllWindows();
        for (let window of allWindows) {
          if (window.title === 'Wallpaper Changer') {
            window.show();
            break;
          }
        }
      },
    },
    // 换行线
    {
      type: 'separator',
    },
    {
      label: '退出',
      role: 'quit',
    },
  ]);

  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu);
  });

  return tray;
}
