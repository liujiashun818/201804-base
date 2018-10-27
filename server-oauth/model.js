let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let connection = mongoose.createConnection('mongodb://localhost/zfoauth');
//用户信息
exports.User = connection.model('User', new Schema({
    username: { type: String, required: true },//用户名
    password: { type: String, required: true },//密码
    email: { type: String, required: true },//密码
    avatar: String,//头像
    gender: { type: Number, default: 1 }//1 男 0 女
}));
//应用信息 存放第三方的信息 appId appKey _id=appId
exports.Application = connection.model('Application', new Schema({
    appKey: { type: String, required: true },
    website: { type: String, required: true },//网站名称
    redirect_uri: { type: String, required: true },//此应用的回调地址
}));

//把mongodb帮我们生成的ID作为授权码
//授权码
exports.AuthorizationCode = connection.model('AuthorizationCode', new Schema({
    appId: { type: String, required: true },//客户端的appId
    createAt: { type: Date, default: Date.now }, //创建时间
    //permissions是一个外键的数组 类型是的文档的主键ObjectId, ref是指定这个外键是哪个集合的外键
    permissions: [{ type: ObjectId, ref: 'Permission' }],
    isUsed: { type: Boolean, default: false },
    user: { type: ObjectId, ref: 'User' } //哪个用户的授权
}));
//access_code模型
exports.AccessToken = connection.model('AccessToken', new Schema({
    appId: { type: String, required: true },//客户端的appId
    refresh_token: String, //刷新token
    createAt: { type: Date, default: Date.now }, //创建时间
    //permissions是一个外键的数组 类型是的文档的主键ObjectId, ref是指定这个外键是哪个集合的外键
    permissions: [{ type: ObjectId, ref: 'Permission' }],
    user: { type: ObjectId, ref: 'User' }
}));
//权限
exports.Permission = connection.model('Permission', new Schema({
    name: { type: String, required: true },//权限的名称 获得您的昵称、头像、性别
    route: { type: String, required: true } //路径 /users/get_user_info
}));

/* (async function () {
    let codeObj = await exports.AuthorizationCode.findById('5b826bf01bba0c151899ef21').populate('user', 'username');
    console.log(codeObj.user.username);
})() */