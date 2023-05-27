# Pandora Pay desktop wallet using electron.js

## Installation
1. install nodejs
2. `npm install` (install node modules)
3. `npm i -g electron-builder`
4. `npm i -g electron-packager`
5. `bash build.sh wasm electron-helper wallet`

## Tor/I2P Proxy
1. install Tor/I2P
2. start daemon
3. use wallet setup

## Debugging
edit `.env` file
```
DEBUG=true
```

## Running
```
npm run start
```

## Build on linux

```
sudo apt-get install rpm
```

### Build windows on Linux

```
sudo apt-get install  wine64 wine32 mono-complete
```

Download [wine-mono.msi](https://dl.winehq.org/wine/wine-mono/) from the WineHQ website.
Type `wine64 uninstaller`.
Press install from the uninstaller GUI and select the downloaded .msi package.

## Build tests
```
npm run test-builder
npm run test-packager
```

## Release

### electron-builder
```
./release-builder.sh
```

### electron-packager
```
./release-packager.sh
```
