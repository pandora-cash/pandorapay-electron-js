echo "release using electron-builder"

./build.sh wasm wallet electron-helper

args="-lw"

if [ "$(uname)" == "Darwin" ]; then #Mac OS X platform
	args="-mlw"
fi

electron-builder ${args} --config electron-builder.js
