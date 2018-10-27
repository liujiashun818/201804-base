var express = require('express');
const uuid = require('uuid');
const querystring = require('querystring');
const { Application, Permission, AuthorizationCode, User, AccessToken } = require('../model');
const logger = require('debug')('server-oauth:oauth');
var router = express.Router();
router.get('/permissions', async function (req, res, next) {
  let permissions = await Permission.find();
  res.render('permissions', { title: '权限列表', permissions });
});

router.get('/permission', function (req, res, next) {
  res.render('permission', { title: '创建权限' });
});

router.post('/permission', async function (req, res, next) {
  let body = req.body;
  let permission = await Permission.create(body);
  res.redirect('/oauth2.0/permissions');
});

router.get('/application', function (req, res, next) {
  res.render('application', { title: '创建客户端应用' });
});
router.get('/applications', async function (req, res, next) {
  let applications = await Application.find();
  res.render('applications', { title: '客户端应用列表', applications });
});
router.post('/application', async function (req, res, next) {
  let body = req.body;//website redirect_url
  body.appKey = uuid.v4();
  let application = await Application.create(body);
  res.redirect('/oauth2.0/applications');
});

//  /oauth2.0/authorize
//http://localhost:5000/oauth2.0/authorize?response_type=code&client_id=5b82587413cde3296495c735&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2Fusers%2Fcallback&scope=get_user_info%2Clist_album
router.get('/authorize', async function (req, res, next) {
  //scope get_user_info,list_album
  let { client_id, redirect_uri, state, scope = "get_user_info" } = req.query;
  let application = await Application.findById(client_id);
  logger(application, application.redirect_uri, redirect_uri);
  if (application.redirect_uri != redirect_uri) {
    return next(new Error('参数中的uri和应用注册的时候保存的uri不匹配'));
  }
  //get_user_info,list_album=>[get_user_info,list_album]=>
  let query = { $or: scope.split(',').map(route => ({ route })) };
  let permissions = await Permission.find(query);
  res.render('authorize', { title: '授权第三方应用权限', permissions, application });
});

router.post('/authorize', async function (req, res, next) {
  let { client_id, redirect_uri, state } = req.query;
  let { permissions = [], username, password } = req.body;
  if (!Array.isArray(permissions)) permissions = [permissions];
  let user;
  if (username && password) {
    user = await User.findOne({ username, password });
    req.session.user = user;
    logger('登录并授权 ', user);
  } else {
    user = req.session.user._id;//从会话中获取当前用户的ID
    logger('从会话中获取用户信息 ', user);
  }
  if (!user) {
    return next(new Error('用户权限错误'));
  }
  //生成授权码
  let authorizationCode = await AuthorizationCode.create({
    appId: client_id,
    permissions,
    user,
    state
  });
  logger('生成授权码 ', authorizationCode._id);
  redirect_uri = decodeURIComponent(redirect_uri);
  let redirectTo = redirect_uri + (redirect_uri.indexOf('?') == -1 ? '?' : '') + `code=${authorizationCode._id}&state=${state}`;
  logger('处理成功，跳回回调路径 ', redirectTo);
  res.redirect(redirectTo);
});


router.get('/token', async function (req, res, next) {
  let options = { client_id, client_secret, code, redirect_uri } = req.query;
  let authorizationCode = await AuthorizationCode.findById(code);
  if (!authorizationCode || Date.now() - authorizationCode.createAt.getTime() > 10 * 60 * 1000 || authorizationCode.isUsed === true) {
    return next(new Error('授权码错误或者已经失效或者已经被使用过'));
  }
  let accessToken = new AccessToken({
    appId: authorizationCode.appId,
    refresh_token: uuid.v4(),
    permissions: authorizationCode.permissions,
    user: authorizationCode.user,
  });
  await accessToken.save();
  logger('生成accessToken', accessToken);
  authorizationCode.isUsed = true;
  await authorizationCode.save();
  logger('把授权码设置为已经使用过', authorizationCode);
  //access_token=FE04&expires_in=7776000&refresh_token=88E4BE14
  options = {
    access_token: accessToken._id.toString(),
    expires_in: 60 * 60 * 24 * 30 * 3,
    refresh_token: accessToken.refresh_token
  }
  res.send(querystring.stringify(options));
});

router.get('/me', async function (req, res, next) {
  let { access_token } = req.query;
  let accessToken = await AccessToken.findById(access_token);
  //callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
  let options = {
    client_id: accessToken.appId,
    openid: accessToken.user.toString()//就是用户的真实ID
  }
  logger('返回用户的openId', `callback(${JSON.stringify(options)})`);
  res.send(`callback(${JSON.stringify(options)})`);
});

module.exports = router;
