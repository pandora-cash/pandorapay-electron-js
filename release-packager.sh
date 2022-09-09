echo "release using electron-packager"

./build.sh wasm wallet electron-helper

name="pandora-pay"
argsWin="--icon=assets/icons/win/icon.ico  --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName='${name}'"
args=" --overwrite ${name} --prune=true --out=release-packager-builds --ignore='^/release-packager-builds' --ignore='^/release-builder-builds' --ignore='^/_build' --ignore='^/helper' --ignore='^/build.sh' --ignore='^/release.sh' --ignore='^/.idea' --ignore='^/assets' "
argsLinux="--icon=assets/icons/mac/icon.icns "

npx electron-packager ./ $args --platform=linux --arch=x64 $argsLinux
npx electron-packager ./ $args --platform=win32 --arch=ia32 $argsWin
npx electron-packager ./ $args --platform=win32 --arch=x64 $argsWin
npx electron-packager ./ $args --platform=darwin --arch=x64 $argsLinux

a="./release-builds/${name}-darwin-x64"
mkdir -p ${a}/${name}.app/Contents/Resources/app/helper
cp ./helper/pandora-electron-helper-darwin-amd64 ${a}/${name}.app/Contents/Resources/app/helper/
zip -r $a.zip $a

a="./release-builds/${name}-linux-x64"
mkdir -p ${a}/resources/app/helper
cp ./helper/pandora-electron-helper-linux-amd64 ${a}/resources/app/helper/
zip -r $a.zip $a

a="./release-builds/${name}-win32-ia32"
mkdir -p ${a}/resources/app/helper
cp ./helper/pandora-electron-helper-windows-386.exe ${a}/resources/app/helper/
zip -r $a.zip $a

a="./release-builds/${name}-win32-x64"
mkdir -p ${a}/resources/app/helper
cp ./helper/pandora-electron-helper-windows-amd64.exe ${a}/resources/app/helper/
zip -r $a.zip $a