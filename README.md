# pandorapay-electron-js

## Installation
1. install nodejs
2. `npm install` (install node modules)
3. `./build.sh` (build dist files - wasm, electron-helper and wallet bundle )

## Running
```
npm run start
```

## Build tests
```
npm run test-builder
npm run test-packager
```

## Release
using electron-builder  
```
./release-builder.sh
```

using electron-packager
```
./release-packager.sh
```

### build win32 on linux

install wine64 and wine32
```
sudo apt-get install wine64 wine32
```

## Tor Proxy
edit `.env` file
```
PROXY_ADDRESS=socks5://127.0.0.1:9050
```
