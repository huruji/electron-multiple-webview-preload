import path from "path"
import { BrowserWindow, app, ipcMain, BrowserView } from "electron"
import { main } from './dev-console'

let mainWindow: BrowserWindow

let page = 1
let currentView: BrowserView|null;
let nextView: BrowserView|null;

const createHeaderView = () => {
  const headerView = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
    },
  })
  headerView.webContents.loadFile(path.resolve(__dirname, "../header.html"))
  mainWindow.addBrowserView(headerView)
  headerView.setBounds({
    x: 0,
    y: 0,
    width: mainWindow.getBounds().width,
    height: 100,
  })
}

const createMainWindow = () => {
  return new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
    darkTheme: true,
  })
}

const addViewToWindow = (view: BrowserView) => {
  mainWindow.addBrowserView(view)
  view.setBounds({
    x: 0,
    y: 100,
    width: 1200,
    height: 800,
  })
  // view.webContents.openDevTools({ mode: "detach" })
}
const createMainView = () => {
  const view = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      preload: path.resolve(__dirname, "preload.js"),
    },
  })
  view.webContents.loadURL(`http://localhost:5173?page=${page}`)
  page++
  return view
}

app.whenReady().then(() => {
  mainWindow = createMainWindow();
  main.init(mainWindow)
  createHeaderView()
  currentView = createMainView()
  addViewToWindow(currentView)
  nextView = createMainView()
  // mainWindow.addBrowserView(currentView)
})

ipcMain.handle("showNext", () => {
  console.log('show next')
  if(currentView && nextView) {
    console.log('start replace browserView')
    addViewToWindow(nextView)
    mainWindow.removeBrowserView(currentView)
    currentView = nextView;
    nextView = createMainView()
  }
})

ipcMain.handle('renderDone',() => {
  main.info('handle renderDone-----')
  nextView = createMainView()
})

// ipcMain.on("renderDone", () => {
//   nextView = createMainView()
// });

app.once("window-all-closed", () => app.quit())
