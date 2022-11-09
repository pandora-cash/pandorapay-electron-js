echo "release using electron-packager"

./build.sh wasm wallet electron-helper

name="pandora-cash-electron-js"
dir="release-packager-builds"


argsWin="--icon=assets/icons/win/icon.ico  --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName='${name}'"
args=" --overwrite ${name} --prune=true --out=release-packager-builds --ignore='^/(_build|${dir}|release-builder-builds|release-packager-builds|helper|build.sh|release-builder.sh|release-packager.sh|.idea|assets|electron-builder.js|electron-builder-test.js)' "
argsLinux="--icon=assets/icons/mac/icon.icns "

npx electron-packager ./ $args --platform=linux --arch=x64 $argsLinux
npx electron-packager ./ $args --platform=win32 --arch=ia32 $argsWin
npx electron-packager ./ $args --platform=win32 --arch=x64 $argsWin
npx electron-packager ./ $args --platform=darwin --arch=x64 $argsLinux

mkdir -p ${dir}

a="./${dir}/${name}-darwin-x64"
mkdir -p ${a}/${name}.app/Contents/Resources/app/helper
cp ./helper/pandora-electron-helper-darwin-amd64 ${a}/${name}.app/Contents/Resources/app/helper/
zip -r $a.zip $a

a="./${dir}/${name}-linux-x64"
mkdir -p ${a}/resources/app/helper
cp ./helper/pandora-electron-helper-linux-amd64 ${a}/resources/app/helper/
zip -r $a.zip $a

a="./${dir}/${name}-win32-ia32"
mkdir -p ${a}/resources/app/helper
cp ./helper/pandora-electron-helper-windows-386.exe ${a}/resources/app/helper/
zip -r $a.zip $a

a="./${dir}/${name}-win32-x64"
mkdir -p ${a}/resources/app/helper
cp ./helper/pandora-electron-helper-windows-amd64.exe ${a}/resources/app/helper/
zip -r $a.zip $a