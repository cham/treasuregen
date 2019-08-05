const {app, BrowserWindow, protocol} = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  const WEB_FOLDER = 'dist';
  const PROTOCOL = 'file';

  protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {
      let url = request.url.substr(PROTOCOL.length + 1)

      url = path.join(__dirname, WEB_FOLDER, url.replace(__dirname, ''))
      url = path.normalize(url)

      callback({path: url})
  })

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})
