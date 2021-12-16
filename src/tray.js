import { Tray, Menu, BrowserWindow } from 'electron';

let tray;

export default function createTray() {
  tray = new Tray('resources/icon.ico');

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
