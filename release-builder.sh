echo "release using electron-builder"

./build.sh wasm wallet electron-helper

name="pandora-cash"

npm run builder

