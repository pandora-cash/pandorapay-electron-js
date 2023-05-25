//append script electron-app.js in page head
const fs = require("fs");

const filePath = `./dist/index.html`

if (fs.existsSync(filePath)) {
	const script = `<script src="/electron-entry-app.js"></script>`
	const text = fs.readFileSync( filePath ).toString()
	if (text.indexOf(script) === -1){
    	const p = text.indexOf("<head>")+"<head>".length
    	const newText = [text.slice( 0, p ), script, text.slice(p)].join('')
    	fs.writeFileSync(filePath, Buffer.from(newText) )
	}
}

fs.writeFileSync("dist/electron-entry-app.js", fs.readFileSync("src/electron-entry-app.js"));

console.log("init-script √")
