const chalk = require('chalk');

function log (msg, color) {
    var msgStr = msg instanceof Error ? msg.message : typeof msg == 'object' ? JSON.stringify(msg, null, 2) : msg 
    if (color) {
        msgStr = (chalk[color] || chalk['white'])(msgStr)
    }
    console.log(msgStr)
}

function logGreen (msg) {
    log(msg, 'green')
}

function logRed (msg) {
    log(msg, 'red')
}

module.exports = {
    log,
    logGreen,
    logRed
}
