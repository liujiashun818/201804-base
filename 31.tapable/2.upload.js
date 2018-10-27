const {resolve} = require('path');
const qiniu = require('qiniu');
var accessKey = 'fi5imW04AkxJItuFbbRy1ffH1HIoo17HbWOXw5fV0';
var secretKey = 'ru__Na4qIor4-V7U4AOJyp2KBUYEw1NWduiJ4Pby0';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

var options = {
  scope: 'cnpmjs',
};
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken=putPolicy.uploadToken(mac);

let filename = 'debugger.js';
var localFile = resolve(__dirname,filename);
var config = new qiniu.conf.Config();
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();
// 文件上传
formUploader.putFile(uploadToken, filename, localFile, putExtra, function(respErr,
    respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      console.log(respBody);
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });