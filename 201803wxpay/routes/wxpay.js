var express = require('express');
let randomstring = require('randomstring');
const convert = require('xml-js');
const axios = require('axios');
let { appid, mch_id, notify_url, unifiedorder, orderquery, key } = require('../config');
var router = express.Router();
let moment = require('moment');
const querystring = require('querystring');
let logger = require('debug')('201803wxpay:wxpay');
let crypto = require('crypto');
let qrcode = require('qrcode');
/// cnpm i randomstring xml-js moment 
let out_trade_no;
router.get('/payment', async function (req, res, next) {
    let nonce_str = randomstring.generate(32);
    //商品名称
    let body = '腾讯QQ会员';
    //商品详情
    let detail = "一年的黄钻";
    //订单号
    out_trade_no = moment().local().format('YYYYMMDDhhmmss');
    //金额 
    let total_fee = 1;//分
    //交易类型
    let trade_type = 'NATIVE';
    let order = {
        appid,
        mch_id,
        notify_url,
        nonce_str,
        body,
        detail,
        out_trade_no,
        total_fee,
        trade_type
    }
    logger('order', order);
    //生成签名
    //[appid,detail,mch_id,notify_url]
    let sortedOrder = Object.keys(order).sort().reduce((memo, key) => {
        memo[key] = order[key];
        return memo;
    }, {});
    let stringA = querystring.stringify(sortedOrder, null, null, { encodeURIComponent: querystring.unescape });
    logger('stringA', stringA);
    let stringSignTemp = stringA + `&key=${key}`;
    let sign = crypto.createHash('md5').update(stringSignTemp).digest('hex').toUpperCase();

    let xmlOrder = convert.js2xml({
        xml: {
            ...order,
            sign
        }
    }, { compact: true });
    logger('xmlOrder', xmlOrder);
    let unifiedorderResponse = await axios.post(unifiedorder, xmlOrder);
    let unifiedorderResponseJSON = convert.xml2js(unifiedorderResponse.data, {
        compact: true,
        cdataKey: 'value',
        textKey: 'value'
    }).xml;
    let unifiedorderResponseJSON2 = {};
    Object.keys(unifiedorderResponseJSON).reduce((memo, key) => {
        unifiedorderResponseJSON2[key] = unifiedorderResponseJSON[key].value;
    }, {});
    logger('unifiedorderResponseJSON2', unifiedorderResponseJSON2);
    const qrcodeUrl = await qrcode.toDataURL(unifiedorderResponseJSON2.code_url, {
        width: 300
    });

    res.render('payment', { title: '付款', qrcodeUrl });
});
function wxSign(order, key, logger) {
    let sortedOrder = Object.keys(order).sort().reduce((memo, key) => {
        memo[key] = order[key];
        return memo;
    }, {});
    let stringA = querystring.stringify(sortedOrder, null, null, { encodeURIComponent: querystring.unescape });
    logger('stringA', stringA);
    let stringSignTemp = stringA + `&key=${key}`;
    let sign = crypto.createHash('md5').update(stringSignTemp).digest('hex').toUpperCase();
    return sign;
}
router.get('/query', async function (req, res, next) {
    //orderquery
    let nonce_str = randomstring.generate(32);
    let query = {
        appid,
        mch_id,
        out_trade_no,
        nonce_str
    }
    let sign = wxSign(query, key, logger);
    let xmlQuery = convert.js2xml({
        xml: {
            ...query,
            sign
        }
    }, { compact: true });
    logger('xmlQuery', xmlQuery);
    let orderqueryResponse = await axios.post(orderquery, xmlQuery);
    let orderqueryResponseJSON = convert.xml2js(orderqueryResponse.data, {
        compact: true,
        cdataKey: 'value',
        textKey: 'value'
    }).xml;
    let orderqueryResponseJSON2 = {};
    Object.keys(orderqueryResponseJSON).reduce((memo, key) => {
        orderqueryResponseJSON2[key] = orderqueryResponseJSON[key].value;
    }, {});
    logger('orderqueryResponseJSON2', orderqueryResponseJSON2);
    res.render('query', { title: '查询结果', ...orderqueryResponseJSON2 });
});
module.exports = router;
