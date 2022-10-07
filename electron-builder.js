const files = [
    "!_build/",
    "!release-packager-builds/",
    "!release-builder-builds/",
    "!build.sh",
    "!electron-builder-test.js",
    "!release-builder.sh",
    "!release-packager.sh",
]

const config = require('./config')
const os = require("os");

module.exports = {
    directories: {
        buildResources: 'electron-build',
        output: 'release-builder-builds',
    },
    mac: {
        category: "public.app-category.utilities",
        icon: "assets/icons/mac/icon.icns",
        target: [
            "pkg",
            (os.arch() === 'darwin') ? 'dmg' : 'zip',
        ],
        files: [
            ...files,
            "!helper/pandora-electron-helper-linux-386",
            "!helper/pandora-electron-helper-linux-amd64",
            "!helper/pandora-electron-helper-windows-386.exe",
            "!helper/pandora-electron-helper-windows-amd64.exe",
        ],
    },
    linux: {
        category: 'Utility',
        icon: "assets/icons/mac/icon.icns",
        target: [
            "AppImage",
            "tar.gz"
        ],
        files: [
            ...files,
            "!helper/pandora-electron-helper-darwin-amd64",
            "!helper/pandora-electron-helper-linux-386",
            "!helper/pandora-electron-helper-windows-386.exe",
            "!helper/pandora-electron-helper-windows-amd64.exe",
        ]
    },
    win:{
        publisherName: config.name,
        target: [
            "nsis",
            "portable",
        ],
        icon: "assets/icons/win/icon.ico",
        files: [
            ...files,
            "!helper/pandora-electron-helper-darwin-amd64",
            "!helper/pandora-electron-helper-linux-386",
            "!helper/pandora-electron-helper-linux-amd64",
        ],
    },
    dmg: {
        "icon": "assets/icons/mac/icon.icns",
        "title": `${config.name} installer`
    },
    nsis: {
        "oneClick": false,
        "perMachine": false,
        "allowToChangeInstallationDirectory": true,
        "installerIcon": "assets/icons/win/icon.ico",
        "createDesktopShortcut": true,
        "createStartMenuShortcut": true
    },
}