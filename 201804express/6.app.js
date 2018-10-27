let express = require('./express');
let app = express();
const path = require('path');
app.use(express.static(path.resolve(__dirname, 'public')))
app.get('/a', function (req, res) {
    res.end('/a');
})
app.get('/b', function (req, res) {
    res.redirect('/a');
})
app.listen(8080, () => {
    console.log(`server started at port 8080`);
});