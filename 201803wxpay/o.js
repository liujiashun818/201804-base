const convert = require('xml-js');
let order = {
    xml: {
        appid: "appid"
    }

}
let xmlOrder = convert.js2xml(order, { compact: true });
console.log('xmlOrder', xmlOrder);