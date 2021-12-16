import { screen, IpcMain, BrowserWindow, ipcMain } from 'electron';
import electronWallpaper from 'electron-wallpaper-napi';

// 数组用来保存创建的窗口，防止被销毁
const screenWallpaperWindowContainer = [];

const wallpaperWindowProperties = {
  transparent: true,
  frame: false,
};

export default function () {
  ipcMain.handle('application:get_displays', async () => {
    const displays = screen.getAllDisplays();
    return displays;
  });

  ipcMain.on('application:hide', () => {
    const windows = BrowserWindow.getAllWindows();
    for (let window of windows) {
      if (window.title === 'Wallpaper Changer') {
        window.hide();
        break;
      }
    }
  });

  ipcMain.on('application:max', () => {
    const windows = BrowserWindow.getAllWindows();
    for (let window of windows) {
      if (window.title === 'Wallpaper Changer') {
        window.maximize();
        break;
      }
    }
  });

  ipcMain.on('application:min', () => {
    const windows = BrowserWindow.getAllWindows();
    for (let window of windows) {
      if (window.title === 'Wallpaper Changer') {
        window.minimize();
        break;
      }
    }
  });

  ipcMain.on('application:refresh_wallpaper', () => {
    screen.getAllDisplays().forEach((screenObj, idx) => {
      if (screenWallpaperWindowContainer[idx]) {
        screenWallpaperWindowContainer[idx].destroy();
      }
      screenWallpaperWindowContainer[idx] = new BrowserWindow({
        x: screenObj.bounds.x,
        y: screenObj.bounds.y,
        height: screenObj.bounds.height,
        width: screenObj.bounds.width,
        webPreferences: {
          additionalArguments: [`--displayid=${screenObj.id}`],
          preload: WALLPAPER_WINDOW_PRELOAD_WEBPACK_ENTRY,
        },
        ...wallpaperWindowProperties,
      });
    });

    screenWallpaperWindowContainer.forEach((wallpaperWindow) => {
      wallpaperWindow.loadURL(WALLPAPER_WINDOW_WEBPACK_ENTRY);
      // wallpaperWindow.webContents.openDevTools();

      electronWallpaper.attachWindow(wallpaperWindow);
    });
  });
}
