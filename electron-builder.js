const files = [
    "!_build/",
    "!bin-packager/",
    "!bin-builder/",
    "!build.sh",
    "!electron-builder-test.js",
    "!release-builder.sh",
    "!release-packager.sh",
    "!src/electron-entry-app.js",
    "!init-script.js",
]

const config = require('./src/config')
const os = require("os");

helperWindowsIgnore = ["!helper/pandora-electron-helper-windows-386.exe", "!helper/pandora-electron-helper-windows-amd64.exe",
    "!helper/pandora-electron-helper-windows-arm64.exe",]

helperLinuxIgnore = ["!helper/pandora-electron-helper-linux-386","!helper/pandora-electron-helper-linux-amd64",
    "!helper/pandora-electron-helper-linux-arm64", "!helper/pandora-electron-helper-linux-armv7l"]

helperDarwinIgnore = ["!helper/pandora-electron-helper-darwin-amd64",
    "!helper/pandora-electron-helper-darwin-arm64",]

module.exports = {

    directories: {
        buildResources: 'electron-build',
        output: 'bin-builder',
    },
    mac: {
        category: "public.app-category.utilities",
        icon: "assets/icons/mac/icon.icns",
        target: [
            "pkg",
            "dmg",
            "mas",
            "7z",
            "zip",
            "tar.gz",
        ],
        type: "distribution",
        files: [
            ...files,
            ...helperLinuxIgnore,
            ...helperWindowsIgnore,
        ],
    },
    linux: {
        category: 'Utility',
        icon: "assets/icons/mac/icon.icns",
        target: [
            "AppImage",
            "tar.gz",
            "snap",
            "deb",
            "rpm",
            "tar.gz",
            "apk",
        ],
        vendor: config.name,
        maintainer: config.name,
        synopsis: config.description,
        description: config.description,
        desktop: config.name,
        files: [
            ...files,
            ...helperWindowsIgnore,
            ...helperDarwinIgnore,
        ]
    },
    win:{
        publisherName: config.name,
        target: [
            {target: "nsis", "arch": [ "ia32", "x64" ] },
            {target: "portable", "arch": [ "ia32", "x64" ] },
            {target: "zip", "arch": [ "ia32", "x64" ] },
            {target: "msi", "arch": [ "ia32", "x64" ] },
            //"appx", //AppX is supported only on Windows 10 or Windows Server 2012 R2 (version number 6.3+)
        ],
        icon: "assets/icons/win/icon.ico",
        files: [
            ...files,
            ...helperDarwinIgnore,
            ...helperLinuxIgnore,
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
