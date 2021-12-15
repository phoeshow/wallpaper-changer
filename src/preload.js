import { contextBridge, ipcRenderer } from 'electron';
import got from 'got';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  got,
});
