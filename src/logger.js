const config = require('./config');
const fs = require('fs');

module.exports = {

    open(){
        if (!config.debug) return;
        try{
            if (fs.existsSync('debug.logs') ) fs.unlinkSync('debug.logs');
        }catch(e){
            this.error("error deleting file")
        }
        this.log('DEBUGGING', new Date());
    },

    error(){
        try{
            const s = Array.prototype.slice.call(arguments).reduce( (result, value) => result + value + " ", "")
            console.error(s);
            if (config.debug) fs.appendFileSync('debug.logs', 'ERROR: ' + s + "\n" );
        }catch(e){
            console.error("log error", e)
        }
    },

    log(){
        try{
            const s = Array.prototype.slice.call(arguments).reduce( (result, value) => result + value + " ", "")
            console.log(s);
            if (config.debug) fs.appendFileSync('debug.logs', 'LOG: ' + s + "\n" );
        }catch(e){
            console.error("log error", e)
        }
    },

}
