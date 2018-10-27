let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
let connection = mongoose.createConnection('mongodb://localhost/zfoauthclient');
//用户信息
exports.User = connection.model('User', new Schema({
    username: { type: String, required: true },//用户名
    password: { type: String, required: true },//密码
    email: { type: String, required: true },//密码
    avatar: String,//头像
    oauth: String,
    gender: { type: Number, default: 1 }//1 男 0 女
}));
