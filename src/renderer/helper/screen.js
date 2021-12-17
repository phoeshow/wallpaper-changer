const ipcRenderer = window.electron.ipcRenderer;

export const getDeviceDisplays = async () => {
  let displays = await ipcRenderer.invoke('application:get_displays');
  return displays;
};

export const starthWallpapersWindow = () => {
  ipcRenderer.send('application:start_wallpapers_window');
};

export const refreshWallpapersWindow = () => {
  ipcRenderer.send('application:refresh_wallpapers_window');
};
