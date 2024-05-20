// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  startServer: () => ipcRenderer.send('start-server'),
  stopServer: () => ipcRenderer.send('stop-server'),
  onServerStatus: (callback:any) => ipcRenderer.on('server-status', callback),
  onLog: (callback:any) => ipcRenderer.on('log', callback),
  runGcloudCommand: (command:string) => ipcRenderer.invoke('run-gcloud-command', command),
  runGcloudAuth: () => ipcRenderer.invoke('run-gcloud-auth'),
  checkGcloudAuth: () => ipcRenderer.invoke('check-gcloud-auth'),
  revokeGcloudAuth: () => ipcRenderer.invoke('revoke-gcloud-auth'),
  getServerStatus: () => ipcRenderer.invoke('get-server-status'),
  runGcloudAuthDefaultApp: () => ipcRenderer.invoke('run-gcloud-auth-default-app'),
  checkGcloudAuthDefaultApp: () => ipcRenderer.invoke('check-gcloud-auth-default-app'),
  revokeGcloudAuthDefaultApp: () => ipcRenderer.invoke('revoke-gcloud-auth-default-app'),
});