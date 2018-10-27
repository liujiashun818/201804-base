const path = require('path');
function upload(filename,localFile){
    console.log('filename',filename);
    console.log('localFile',localFile);
    return new Promise(function(resolve,reject){
        const qiniu = require('qiniu');
        var accessKey = 'fi5imW04AkxJItuFbbRy1ffH1HIoo17HbWOXw5fV';
        var secretKey = 'ru__Na4qIor4-V7U4AOJyp2KBUYEw1NWduiJ4Pby';
        var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

        var options = {
          scope: 'cnpmjs',
        };
        var putPolicy = new qiniu.rs.PutPolicy(options);
        var uploadToken=putPolicy.uploadToken(mac);
        var config = new qiniu.conf.Config();
        var formUploader = new qiniu.form_up.FormUploader(config);
        var putExtra = new qiniu.form_up.PutExtra();
        // 文件上传
        formUploader.putFile(uploadToken, filename, localFile, putExtra, function(respErr,
            respBody, respInfo) {
                if (respErr) {
                  reject(respErr);
                }else{
                    resolve(respBody);
                }
        });
    });
}

class UploadCDNPlugin{
   constructor(options){
    this.options = options||{};
   }

   apply(compiler){
    compiler.hooks.afterEmit.tapPromise('UploadCDNPlugin',(compilation)=>{
        let assets = compilation.assets;//{key:value} ['main.js']
        let promises = Object.keys(assets).map(filename=>upload(filename,path.resolve(__dirname,'../../dist',filename)));
        return Promise.all(promises);
       });
   }
}

module.exports = UploadCDNPlugin;