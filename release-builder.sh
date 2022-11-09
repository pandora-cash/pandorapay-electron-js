echo "release using electron-builder"

./build.sh wasm wallet electron-helper

electron-builder -mwl --config electron-builder.js

