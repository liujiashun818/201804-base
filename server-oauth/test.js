let accessToken = {
    _id: { name: 'zfpx' },
    refresh_token: 'refresh_token'
}
let querystring = require('qs');
let options = {
    access_token: accessToken._id,
    expires_in: 60 * 60 * 24 * 30 * 3,
    refresh_token: accessToken.refresh_token
}
console.log(querystring.stringify(options));