import { contextBridge, ipcRenderer } from 'electron';
import got from 'got';

// console.log(window.process.argv);
const argv = window.process.argv;

const displayId = argv
  .find((item) => /^--displayid=?/.test(item))
  .split('=')[1];
console.log(displayId);

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
  got,
  displayId: Number(displayId),
});
