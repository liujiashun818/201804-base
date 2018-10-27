const express = require('express');
const querystring = require('querystring');
const request = require('request-promise');
const { appId, appKey, redirect_uri, authorizeUrl, fetchTokenUrl, fetchMeUrl, fetchUserInfo } = require('../config');
const router = express.Router();
const logger = require('debug')('oauth-client:users');
//在此进行登录 /users/login
router.get('/login', function (req, res, next) {
  req.session.state = Date.now();
  let options = {
    response_type: 'code',//响应类型 固定为code
    client_id: appId, //客户端的ID，这个ID是由QQ授权服务器分配的
    redirect_uri,
    state: req.session.state,
    scope: 'get_user_info,list_album'
  }

  let query = querystring.stringify(options);
  let fullAuthorizeUrl = authorizeUrl + query;
  res.render('login', {
    title: '登录',
    fullAuthorizeUrl
  });
});
//http://localhost:4000/users/callback
router.get('/callback', async function (req, res, next) {
  let { code, state } = req.query;
  if (state != req.session.state) {
    return next(new Error('状态值不匹配'));
  }
  let options = {
    grant_type: 'authorization_code',
    client_id: appId,
    client_secret: appKey,
    code,
    redirect_uri
  }
  let fullFetchTokenUrl = fetchTokenUrl + querystring.stringify(options);
  logger('fullFetchTokenUrl', fullFetchTokenUrl);
  let FetchTokenUrlResponse = await request(fullFetchTokenUrl);
  logger('FetchTokenUrlResponse', FetchTokenUrlResponse);
  //1.取得token
  let { access_token, expires_in, refresh_token } = querystring.parse(FetchTokenUrlResponse);
  //return res.send(FetchTokenUrlResponse);

  options = {
    access_token
  }
  let fullFetchMeUrl = fetchMeUrl + querystring.stringify(options);
  logger('fullFetchMeUrl', fullFetchMeUrl);
  //callback( {"client_id":"YOUR_APPID","openid":"YOUR_OPENID"} );
  let fetchMeResult = await request(fullFetchMeUrl);
  //2.通过token取得openId
  let { openid } = JSON.parse(fetchMeResult.slice(fetchMeResult.indexOf('{'), fetchMeResult.lastIndexOf('}') + 1));
  logger('openid', openid);

  options = {
    access_token,
    oauth_consumer_key: appId,
    openid
  }
  let fullFetchUserInfo = fetchUserInfo + querystring.stringify(options);
  let fetchUserInfoResult = await request(fullFetchUserInfo);
  let userInfo = JSON.parse(fetchUserInfoResult);
  logger('userInfo', userInfo);
  // userInfo.oauth = 'QQ';
  // let oldUser = await User.create(userInfo);
  // req.session.user = oldUser;
  res.json(userInfo);
});

module.exports = router;
