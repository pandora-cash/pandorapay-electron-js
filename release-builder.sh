echo "release using electron-builder"

if ! [[ "$*" == *no-build* ]]; then
  ./build.sh wasm wallet electron-helper
fi

args="-lw"

if [ "$(uname)" == "Darwin" ]; then #Mac OS X platform
	args="-mlw"
fi

electron-builder ${args} --config electron-builder.js
