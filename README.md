# pandorapay-electron-js

## Installation
```
npm install
./build.sh
```

## Running
```
npm run start
```

## Build
```
npm run build
npm run paclage-win
npm run paclage-mac
npm run paclage-linux
```

## Release
```
./release-builder.sh
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
