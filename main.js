const {app, BrowserWindow, protocol, Menu} = require('electron')
const path = require('path')

let mainWindow

const createWindow = () => {
  const WEB_FOLDER = 'dist'
  const PROTOCOL = 'file'

  protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
      let url = request.url.substr(PROTOCOL.length + 1)

      url = path.join(__dirname, WEB_FOLDER, url.replace(__dirname, ''))
      url = path.normalize(url)

      callback({path: url})
  })

  Menu.setApplicationMenu(null)

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    menu: false
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

app.on('browser-window-created', (e, win) => {
  win.setMenu(null)
})
