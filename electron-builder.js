const files = [
    "!_build/",
    "!bin/",
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

/**
 * all supported architectures can be found in https://github.com/electron/electron/releases
 */

module.exports = {

    appId: "com.pandora-cash.app",
    productName: "pandora-cash-wallet",
    artifactName: "${productName}-${os}-${arch}.${ext}",
    publish: null,

    directories: {
        buildResources: 'electron-build',
        output: 'bin/builder',
    },
    mac: {
        identity: null, //disable code signing
        category: "public.app-category.utilities",
        icon: "assets/icons/mac/icon.icns",
        target: [
            {target: "pkg", arch: [ "x64"] }, //"arm64" returns an error
            {target: "dmg", arch: [ "x64", "arm64"] },
            // mas not working without code signing
            //{target: "mas", arch: [ "x64", "arm64"] },
            {target: "7z", arch: [ "x64", "arm64"] },
            {target: "zip", arch: [ "x64", "arm64"] },
            {target: "tar.gz", arch: [ "x64", "arm64"] },
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
            {target: "AppImage", arch: [ "x64", "armv7l", "arm64"] },
            {target: "snap", arch: [ "x64", "armv7l", "arm64"] },
            {target: "deb", arch: [ "x64", "armv7l", "arm64"] },
            {target: "rpm", arch: [ "x64", "armv7l", "arm64"] },
            {target: "tar.gz", arch: [ "x64", "armv7l", "arm64"] },
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
            /**
             * target: "nsis" throws an error on windows server
             * spawn EBUSY     failedTask=build stackTrace=Error: spawn EBUSY
             */
            ...( process.platform === "linux" ? [ {target: "nsis", arch: [ "ia32", "x64", "x86" ] } ] : [] ), //AppX is supported only on Windows 10 or Windows Server 2012 R2 (version number 6.3+)
            {target: "portable", arch: [ "ia32", "x64", "x86" ] },
            {target: "zip", arch: [ "ia32", "x64", "x86" ] },
            {target: "msi", arch: [ "ia32", "x64", "x86" ] },
            /**
             * target: "appx"  is supported only on Windows 10 or Windows Server 2012 R2 (version number 6.3+)
             */
            ...( process.platform === "win32" ? [{target: "appx", "arch": [ "ia32", "x64", "x86" ] }] : [] ),
        ],
        icon: "assets/icons/win/icon.ico",
        files: [
            ...files,
            ...helperDarwinIgnore,
            ...helperLinuxIgnore,
        ],
        verifyUpdateCodeSignature: false,
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
    appx:{
        applicationId: "PandoraCashWallet"
    }
}
