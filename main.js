const electron = require('electron')
const jetpack = require('fs-jetpack')
const app = electron.app;
const dialog = electron.dialog;
const ipc = electron.ipcMain

const BrowserWindow = electron.BrowserWindow
let mainWindow
let splashWindow
let server;
let shown = false;
let serverTimer = null;

function createWindows(){
  createSplashWindow();
  
}
function activate(){
 ipc.on('invokeAction', function(event, data){
    //var result = processData(data);
    event.sender.send('msg-activate', '');
  });
mainWindow.webContents.openDevTools();

}
function createMenu(){
  const Menu = electron.Menu

  let template = 
  [
    {
      label:'Fichier',
      submenu:[
      {
          'label':'Fermer',
          'accelerator': 'CmdOrCtrl+F',

          'click':function(){
            app.quit();
          }
    }/*,
      {
          'label':'Déboguer',
          'accelerator': 'CmdOrCtrl+R',

          'click':function(){
            activate();
          }
      }*/
      ]
    },
    {
      label: 'Edition',
      submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        role: 'undo'
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        role: 'redo'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        role: 'cut'
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        role: 'copy'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        role: 'paste'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        role: 'selectall'
      }]

    },
  
  ];
  let menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

}
function createSplashWindow(){
    var startTime = Date.now();
    splashWindow = new BrowserWindow({width: 500,height: 500,backgroundColor: '#2e2c29',frame:false,show:false})
    splashWindow.loadURL(`file://${__dirname}/splash.html`)
    splashWindow.webContents.on('did-finish-load', function() {
      splashWindow.show();
      createAppWindow();
      
    });    
    splashWindow.on('closed', function () {
        splashWindow = null
        if(mainWindow !== null)
        {
              mainWindow.show();
        }
    })
}

function createAppWindow(){
  var startTime = Date.now();
  mainWindow = new BrowserWindow({width: 1024, height: 600,show:false,frame:true,backgroundColor: '#2e2c29',show:false})
  mainWindow.loadURL(`file://${__dirname}/index2.html`)
  createMenu();
  mainWindow.webContents.on('did-finish-load', function() {
    
      splashWindow.close();

      setTimeout(function(){
          shown = true;
          mainWindow.show();
      
      },500);
      
         
    //createAndLaunchServer();
  });
  
       

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindows)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createAppWindow();
    
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
