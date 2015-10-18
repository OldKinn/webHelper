var fs = require('fs');
var contentType = require('content-type-mime');

var gui = require('nw.gui');
var win = gui.Window.get();

win.setMaximumSize(902, 600);
//win.on('maximize', function() {
//    win.restore();
//});
function refresh() {
    win.reload();
}
function showDebug() {
    win.showDevTools();
}
function miniWindow() {
    win.minimize()
}
function closeWindow() {
    win.close();
}

function encodeBase64(str) {
    var buffer = new Buffer(str);
    return buffer.toString('base64');
}

function decodeBase64(str) {
    var buffer = new Buffer(str, 'base64');
    return buffer.toString('utf8');
}

function encodeImg(file, callback) {
    fs.readFile(file, function(error, data) {
        if(error) return callback(error);
        callback(null, data.toString('base64'));
    });
}

//文件内容类型
function contentType(file) {
    return contentType(file);
}
