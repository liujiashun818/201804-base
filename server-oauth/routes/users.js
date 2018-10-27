var express = require('express');
const gravatar = require('gravatar');
const { User, AccessToken } = require('../model');
const logger = require('debug')('server-oauth:users');
var router = express.Router();

router.get('/signup', function (req, res, next) {
  //<%=title%>
  //res.locals
  res.render('signup', { title: '注册' });
});
router.post('/signup', async function (req, res, next) {
  let body = req.body;//{username,password,email,gender}
  body.avatar = gravatar.url(body.email);//通过邮件得到头像
  let user = new User(body);
  await user.save();//user._id
  logger('注册用户成功:', user);
  res.redirect('/users/signin');
});
router.get('/signin', function (req, res, next) {
  res.render('signin');
});
router.post('/signin', async function (req, res, next) {
  let body = req.body;//{username,password,email,gender}
  let oldUser = await User.findOne(body);
  if (oldUser) {
    req.session.user = oldUser;
    res.redirect('/');
  } else {
    res.redirect('back');
  }
});
router.get('/signout', function (req, res, next) {
  req.session.user = null;
  res.redirect('/users/signup');
});
// /users/get_user_info
router.get('/get_user_info', async function (req, res, next) {
  let options = {
    access_token,
    oauth_consumer_key,//client_id
    openid//user._id
  } = req.query;
  let { permissions } = await AccessToken.findById(access_token).populate('permissions');
  let findItem = permissions.find(item => item.route.toString() == 'get_user_info');
  logger('findItem', findItem);
  if (findItem) {
    let user = await User.findById(openid);
    logger('返回用户详情', user);
    res.json(user);
  } else {
    return res.json({ code: 1, error: '你的Token无权限访问此接口' });
  }
});
module.exports = router;
