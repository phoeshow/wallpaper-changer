import { Tray, Menu, BrowserWindow, app } from 'electron';
import is from 'electron-is';
import path from 'path';

let tray;

export default function createTray() {
  tray = new Tray(
    is.windows()
      ? path.resolve(__dirname, '..', 'icons/icon.ico')
      : path.resolve(__dirname, '..', 'icons/24x24.png')
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
      click: () => {
        app.exit();
      },
    },
  ]);

  tray.on('right-click', () => {
    tray.popUpContextMenu(trayContextMenu);
  });

  return tray;
}
