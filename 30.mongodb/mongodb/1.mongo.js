let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let conn = mongoose.createConnection('mongodb://localhost:27017/mymongo');
// id 标识符 主键  fk foreign key 外键
//主是这个文档中最主要的键，可以唯一标识 这个文档的键
//外键 其它文档的主键
let UserSchema = new mongoose.Schema({
    username: String,
    password: { type: String, required: true },
    createAt: { type: Date, default: Date.now },
    age: { type: Number },
    home: String,
    hobby: [String]
});
//模型拥有了操作数据库的能力
let User = conn.model('User', UserSchema);
/* User.create({ username: 'zfpx', password: '123456', age: '123', hobby: ['a', 'b'] }, function (err, doc) {
    console.log(err);
    console.log(doc);
}); */

/**
 * mongoose会默认帮我们生成一个_id
 * { hobby: [],
  _id: 5b8125e09fc9652300b0ca69,
  username: 'zfpx',
  password: '123456',
  createAt: 2018-08-25T09:48:16.029Z,
   }
 */
(async function () {
    //let doc = await User.create({ username: 'zfpx5', password: 5, age: 5 });
    //console.log('old', doc);
    // doc.home = 'home';

    //await doc.save();
    //console.log('new', doc);
    //通过 new 模型可以创建 一个实体
    let user = new User({
        username: 'zfpx6',
        password: 6
    });
    await user.save();
    //let result = await User.update({ _id: doc._id }, { home: 'home' });
    //console.log(result);
    //let result2 = await User.remove({ _id: doc._id });
    //console.log(result2);
    return doc;
})().then(ret => console.log(ret), err => console.error(err))