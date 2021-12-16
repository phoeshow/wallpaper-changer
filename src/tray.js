import { Tray, Menu, BrowserWindow } from 'electron';
import is from 'electron-is';

let tray;

const iconFilePath = is.windows()
  ? 'src/icons/win/icon.ico'
  : 'src/png/64x64.png';

export default function createTray() {
  tray = new Tray(iconFilePath);

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
