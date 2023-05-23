if [ $# -eq 0 ]; then
  echo "arguments missing"
fi

if [[ "$*" == "help" ]]; then
    echo "wallet, wasm, electron-helper"
    exit 1
fi

echo "Running build"

if [[ "$*" == *wasm* ]]; then
  echo "Build Wasm"

  cd ../go-pandora-pay/ || exit
  ./scripts/build-wasm.sh main build
  ./scripts/build-wasm.sh helper build

  cd ../pandorapay-electron-js || exit
fi

if [[ "$*" == *electron-helper* ]]; then
  echo "Build Electron Helper"

  cd ../go-pandora-pay/ || exit
  ./scripts/build-electron-helper.sh

  mkdir -p ../pandorapay-electron-js/helper
  cp ./builds/electron_helper/bin/* ../pandorapay-electron-js/helper
  mkdir -p ../pandorapay-electron-js/helper
  cp ./builds/electron_helper/bin/* ../pandorapay-electron-js/helper

  cd ../pandorapay-electron-js || exit
fi

if [[ "$*" == *wallet* ]]; then
  echo "Build Wallet"

  cd ../PandoraPay-wallet/ || exit

  npm run build-ui --skip-zip -- --mode=production

  cp -r ./dist/build/* ../pandorapay-electron-js/dist

  cd ../pandorapay-electron-js/ || exit

  cd ./dist/ || exit

  find . -name "*.gz" -type f -delete
  find . -name "*.br" -type f -delete

  rm ./wasm/PandoraPay-wallet-helper.wasm

  cd .. || exit


  node ./init-script.js
fi

