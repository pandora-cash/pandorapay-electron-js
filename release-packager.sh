echo "release using electron-packager"

if ! [[ "$*" == *no-build* ]]; then
  ./build.sh wasm wallet electron-helper
fi

name="pandora-cash-wallet"
dir="bin/packager"

mkdir -p ${dir}

helperWindows="helper/pandora-electron-helper-windows-386.exe|helper/pandora-electron-helper-windows-amd64.exe|helper/pandora-electron-helper-windows-arm64.exe"
helperLinux="helper/pandora-electron-helper-linux-386|helper/pandora-electron-helper-linux-amd64|helper/pandora-electron-helper-linux-arm64|helper/pandora-electron-helper-linux-armv7l"
helperDarwin="helper/pandora-electron-helper-darwin-amd64|helper/pandora-electron-helper-darwin-arm64"

getArgsIgnore(){
	argsIgnore="--ignore='^/(_build|${dir}|bin|build.sh|release-builder.sh|release-packager.sh|init-script.js|.idea|assets|electron-builder.js|electron-builder-test.js|src/electron-entry-app.js|$1)'"
}

args=" --overwrite ${name} --prune=true --out=bin/packager"

argsWin="--icon=assets/icons/win/icon.ico  --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName='${name}'"
argsLinux="--icon=assets/icons/mac/icon.icns "

if ! [[ "$*" == *no-release-linux* ]]; then
  getArgsIgnore "$helperWindows|$helperDarwin"
  npx electron-packager ./ $args $argsIgnore --platform=linux --arch=x64,armv7l,arm64 $argsLinux

  #linux

  a="./${dir}/${name}-linux-x64"
  zip -r $a.zip $a

  a="./${dir}/${name}-linux-arm64"
  zip -r $a.zip $a

  a="./${dir}/${name}-linux-armv7l"
  zip -r $a.zip $a
fi

if ! [[ "$*" == *no-release-windows* ]]; then
  getArgsIgnore "$helperLinux|$helperDarwin"
  npx electron-packager ./ $args $argsIgnore --platform=win32 --arch=ia32,x64,arm64 $argsWin

  #windows

  a="./${dir}/${name}-win32-ia32"
  zip -r $a.zip $a

  a="./${dir}/${name}-win32-x64"
  zip -r $a.zip $a

  a="./${dir}/${name}-win32-arm64"
  zip -r $a.zip $a

fi

if ! [[ "$*" == *no-release-darwin* ]]; then
  getArgsIgnore "$helperWindows|$helperLinux"
  npx electron-packager ./ $args $argsIgnore --platform=darwin --arch=x64,arm64 $argsLinux
  npx electron-packager ./ $args $argsIgnore --platform=mas --arch=x64,arm64 $argsLinux

  #macos

  a="./${dir}/${name}-darwin-x64"
  zip -r $a.zip $a

  a="./${dir}/${name}-darwin-arm64"
  zip -r $a.zip $a

  #macos mas

  a="./${dir}/${name}-mas-x64"
  zip -r $a.zip $a

  a="./${dir}/${name}-mas-arm64"
  zip -r $a.zip $a
fi






