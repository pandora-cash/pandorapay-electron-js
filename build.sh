name="pandora"

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
  (cd ../PandoraPay-wallet/; bash build.sh build no-helper)
fi

if [[ "$*" == *electron-helper* ]]; then
  echo "Build Electron Helper"

  (cd ../go-pandora-pay/; bash scripts/build-electron-helper.sh)
  cp ../go-pandora-pay/bin/electron-helper/* ./helper

fi

if [[ "$*" == *wallet* ]]; then
  echo "Build Wallet"

  cd ../PandoraPay-wallet/ || exit

  npm run build-webworker-wasm --skip-zip -- --mode=production
  npm run build-ui --skip-zip -- --mode=production

  cp -r ./dist/build/* ../pandorapay-electron-js/dist

  cd ../pandorapay-electron-js/dist/ || exit

  find . -name "*.gz" -type f -delete
  find . -name "*.br" -type f -delete

  rm ./wasm/${name}-helper.wasm 2>/dev/null

  cd .. || exit

  node ./init-script.js
fi

