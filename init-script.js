//append script electron-app.js in page head
const fs = require("fs");

const filePath = `./dist/index.html`

const script = `<script src="/electron-app.js"></script>`
const text = fs.readFileSync( filePath ).toString()
if (text.indexOf(script) === -1){
    const p = text.indexOf("<head>")+"<head>".length
    const newText = [text.slice( 0, p ), script, text.slice(p)].join('')
    fs.writeFileSync(filePath, Buffer.from(newText) )
}

console.log("init-script √")