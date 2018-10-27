let fs = require('fs');
setInterval(function(){
    fs.appendFileSync('1.txt','hello')
},1000)