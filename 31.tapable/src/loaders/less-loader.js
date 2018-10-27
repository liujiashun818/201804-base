let less = require('less');
/* function loader(source) {
    let callback = this.async();
    less.render(source, (err, output) => {
        let css = output.css;
        callback(err, css);
    });
} */

function loader(source) {
    let callback = this.async();
    less.render(source, (err, output) => {
        let css = output.css;
        callback(err, `module.exports = ${JSON.stringify(css)}`);
    });
}

module.exports = loader;