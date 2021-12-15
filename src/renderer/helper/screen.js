const ipcRenderer = window.electron.ipcRenderer;

export const getDeviceDisplays = async () => {
  let displays = await ipcRenderer.invoke('application:get_displays');
  return displays;
};

export const refreshWallpapers = () => {
  ipcRenderer.send('application:refresh_wallpaper');
};
