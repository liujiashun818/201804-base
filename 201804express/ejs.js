const fs = require('fs');
exports.__express = function (filepath, data, callback) {
    fs.readFile(filepath, 'utf8', (err, tmpl) => {
        let html = tmpl.replace(/<%=(\w+)%>/g, function (matched, attr) {
            return data[attr];
        });
        callback(null, html);
    });
}