// const {app, BrowserWindow} = require('electron')
//
// let win = null
// let devtools = null

// app.once('ready', () => {
//     win = new BrowserWindow()
//     devtools = new BrowserWindow()
//     win.loadURL('https://github.com')
//     win.webContents.setDevToolsWebContents(devtools.webContents)
//     win.webContents.openDevTools({mode: 'detach'})
// })


const electron = require('electron');
const fs = require('fs-extra-promise');
//const Datastore = require('nedb');
const path = require('path');

const { ipcMain, Menu } = electron;

process.on('uncaughtException', err => {
    console.error(err);
});

const { app, BrowserWindow, shell } = electron;

let windows = [];
let devtools = null;

const windowHeight = process.platform === 'win32' ? 530 : process.platform === 'darwin' ? 485 : 510;

app.on('ready', () => {

    //BrowserWindow.addDevToolsExtension('Users/david/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.2_0');

    // let dataPath;
    // if(process.platform === 'win32') {
    //     const { name } = fs.readJSONSync(path.join(__dirname, 'package.json'));
    //     dataPath = path.join(process.env.LOCALAPPDATA, name);
    // } else {
    //     dataPath = app.getPath('userData');
    // }
    //
    // const orderDB = new Datastore({ filename: path.join(dataPath, 'orders.db'), autoload: true });
    // const addressDB = new Datastore({ filename: path.join(dataPath, 'addresses.db'), autoload: true });

    const appWindow = new BrowserWindow({
        show: false,
        width: 700,
        height: windowHeight
    });
    windows.push(appWindow);

    //devtools = new BrowserWindow();
    appWindow.loadURL(`file://${__dirname}/index.html`);
    //appWindow.webContents.setDevToolsWebContents(devtools.webContents);
    //appWindow.addDevToolsExtension('~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/2.5.2_0');
    //appWindow.webContents.openDevTools( { mode: 'detach'});

    appWindow.once('ready-to-show', () => {
        appWindow.show();
    });


    // const menuTemplate = [];
    //
    // // File Menu
    // menuTemplate.push({
    //     label: 'File',
    //     submenu: [
    //         { role: 'quit' }
    //     ]
    // });
    //
    // // Edit Menu
    // menuTemplate.push({
    //     label: 'Edit',
    //     submenu: [
    //         { role: 'undo' },
    //         { role: 'redo' },
    //         { type: 'separator' },
    //         { role: 'cut' },
    //         { role: 'copy' },
    //         { role: 'paste' },
    //         { role: 'selectall' }
    //     ]
    // });
    //
    // // Help Menu
    // menuTemplate.push({
    //     label: 'Help',
    //     submenu: [
    //         {
    //             label: 'Visit the Crypto Farm',
    //             click: () => {
    //                 shell.openExternal('https://mlgacryptofarm.net');
    //             }
    //         }
    //     ]
    // });
    //
    // const appMenu = Menu.buildFromTemplate(menuTemplate);
    // Menu.setApplicationMenu(appMenu);

});

app.on('window-all-closed', () => {
    app.quit();
});

