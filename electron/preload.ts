import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronApi', {
  renderDone: () => ipcRenderer.invoke('renderDone'),
  showNext: () => ipcRenderer.invoke('showNext')
})

