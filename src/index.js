const electron = require("electron");
const path = require('path')
const url = require('url')
const httpHelper = require('./http-helper')
const fs = require('fs')
const exec = require('child_process').execFile;
const os = require("os");
const config = require('./config');
const logger = require('./logger');

require('dotenv').config({override: true});

if (typeof process.env.DEBUG === "string")
    config.debug = process.env.DEBUG === "true";

let helperChild

async function electronHelperGet( method, data ){
    return httpHelper.getJSON({host: "localhost", port: helperPort, path: method, method: "POST"}, data )
}

function execute(fileName, params, path) {

    let child
    const promise = new Promise((resolve, reject) => {
        child = exec(fileName, params, { cwd: path, stdio: ['pipe'] }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
    return {
        promise,
        child,
    }
}

const WEB_FOLDER = '../dist';
const PROTOCOL = 'file';

async function start(win, page){
    await win.loadURL(url.format({
        pathname: page,
        protocol: PROTOCOL + ':',
        slashes: true
    }));
}

logger.open();

const helperPort = Number.parseInt( process.env.HELPER_PORT || '25712' )

function getHelperFilePath () {

    let arch = os.arch()
    let platform = os.platform()

    if (platform === 'win32') platform = 'windows'

    if (arch === 'mas') arch = 'darwin';
    if (arch === 'x64') arch = 'amd64'
    else if (arch === 'x86' || arch === 'ia32') arch = '386'


    return path.join(__dirname, `helper/pandora-electron-helper-${platform}-${arch}${platform === 'windows' ? '.exe' : ''}`)
}


async function createWindow() {

    logger.log("Creating Window");

    const arch = os.arch()
    const platform = os.platform()

    logger.log("architecture", arch);
    logger.log("platform", platform);

    if (!process.env.HELPER_DISABLED){

        let filename = getHelperFilePath();

        logger.log("Electron helper file path", filename);

        if ( !fs.existsSync( filename )) {
            logger.error("Electron helper not found", filename );
            process.exit(0)
        }
        const out = execute(filename, [`--tcp-server-port=${helperPort}`, ...config.goArgv ])
        out.promise.catch(e => {
            logger.error("There was an error starting the Helper", e)
        })
        helperChild = out.child
    }

    electron.protocol.interceptFileProtocol(PROTOCOL, (request, callback) => {

        // Strip protocol
        if (typeof request.url !== "string") throw "Invalid string"

        let url = request.url.substr(PROTOCOL.length + 1);

        // Build complete path for node require function
        url = path.join(__dirname, WEB_FOLDER, url);

        // Replace backslashes by forward slashes (windows)
        // url = url.replace(/\\/g, '/');
        url = path.normalize(url);

        if (url.indexOf('?') > 0)
            url = url.slice(0, url.indexOf('?'))

        //console.log("url", url)

        callback({path: url});
    });

    // Create the browser window.
    const win = new electron.BrowserWindow( {
        width: 1280,
        height: 768,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: __dirname + '/preload.js'
        },
        center:  true,
    });

    electron.ipcMain.on("toMain", async (event, args ) => {

        if (typeof args === "object"){

            if (args.type === "helper-call" && !process.env.HELPER_DISABLED){
                try{
                    const out = await electronHelperGet(args.method, args.data )
                    win.webContents.send("fromMain", {type: "helper-answer", id: args.id, out })
                }catch(e){
                    win.webContents.send("fromMain", {type: "helper-answer", id: args.id, error: e.toString() })
                }
            }

            if (args.type === "setup"){

                process.env.SETUP_CONNECTION_PROXY_TYPE = args.data.connectionProxyType;
                process.env.SETUP_CONNECTION_PROXY_ADDRESS = args.data.connectionProxyAddress;

                await setProxy(win)

            }

        }
    })

    logger.log("Starting js app");

    await start(win, 'index.html')

}

async function setProxy(win){

    if (process.env.SETUP_CONNECTION_PROXY_TYPE === "tor"){
        await win.webContents.session.setProxy({proxyRules: "socks5://127.0.0.1:9050"})
    }else if (process.env.SETUP_CONNECTION_PROXY_TYPE === "i2p"){
        await win.webContents.session.setProxy({proxyRules: "socks5://127.0.0.1:4444"})
    }else if (process.env.SETUP_CONNECTION_PROXY_TYPE === "proxy"){
        await win.webContents.session.setProxy({proxyRules: process.env.SETUP_CONNECTION_PROXY_ADDRESS})
    }

    logger.log("PROXY SET", process.env.SETUP_CONNECTION_PROXY_TYPE, process.env.SETUP_CONNECTION_PROXY_ADDRESS );

}

electron.app.on("ready", ()=>{

    createWindow()

});

electron.app.on('window-all-closed', () => {
    try{
        if (helperChild){
            helperChild.kill()
            helperChild = undefined
        }
    }catch(e){
        logger.error("Error killing Helper", e)
    }

    if (process.platform !== 'darwin') {
        electron.app.quit()
    }
})
