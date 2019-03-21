var fs = require('fs');
var path = require('path')

module.exports.clearFolder = function(name) {
    fs.readdir(name, (err, files) => {
    if(err) throw err;
    for(const f of files) {
        fs.unlink(path.join(name, f), (err) => {
        if (err) throw err;
        });
    }
    });
}

module.exports.clearFolderCondional = function(name, condition) {
    fs.readdir(name, (err, files) => {
        if(err) throw err;
        if(condition(files)) {
            for(const f of files) {
                fs.unlink(path.join(name, f), (err) => {
                if (err) throw err;
                });
            }
        }
    });
}

module.exports.filterFolder = function(name, condition) {
    fs.readdir(name, (err, files) => {
        if(err) throw err;
        for(const f of files) {
            if(condition(f)) {
                fs.unlink(path.join(name, f), (err) => {
                if (err) throw err;
                });
            }
        }
    });
}