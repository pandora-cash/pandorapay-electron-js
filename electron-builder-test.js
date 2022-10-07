const builder = require('./electron-builder')
delete(builder.mac)
delete(builder.dmg)
delete(builder.nsis)
delete(builder.win)

builder.linux.target = ['AppImage']

module.exports = builder
