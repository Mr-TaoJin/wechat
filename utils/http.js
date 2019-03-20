var app = getApp();
var base64 = require('../vendors/base64.js');
var md5 = require('../vendors/md5.js');
var config = require('wxconfig.js');

/*
* @Title 请求接口域名
*/
function api_url(params) {
  var site_url;
  if (params && params.api) { 
    return site_url = config.api_url + params.api
  }
  if (Object.keys(wx.getExtConfigSync()).length === 0) {
    return site_url = config.api_url
  }
  return site_url = wx.getExtConfigSync().host
};

/* 
* @Title get请求url
*  参数拼接至url上
*/
function get_url(params) {
  var site_url = api_url(params);

  if (params.method) { //老接口
    var sid = 'sid';
    site_url += 'wx_api/';
    params['version'] = 'v3.0.0';
    site_url += '&sign=' + create_sign(params);
    params['member_info'] = wx.getStorageSync('loginInfo').member_info;

  } else {
    let api_token = wx.getStorageSync('api_token');
    let nologin_token = wx.getStorageSync('nologin_token') ? wx.getStorageSync('nologin_token').token : '';
    site_url += '?plat=7';

    if (!api_token) {
      site_url += '&token=' + nologin_token;
    }
  }


  for (var x in params) {
    if (x == 'api') continue;
    site_url += '&' + x + '=' + params[x];
  }
  return site_url;
};

/* 
* @Title post请求url
*  参数拼接至url上
*/
function post_url(params, post) {
  var site_url = api_url(params);
  if (params.method) { //老接口
    var sid = 'sid';
    site_url += 'wx_api/';
    params['version'] = 'v3.0.0';
    site_url += '&sign=' + create_sign(params);
    params['member_info'] = wx.getStorageSync('loginInfo').member_info;
  }

  return site_url;
};

function create_sign(sign_arr) {
  var array = new Array();
  var appkey = '654321@';
  var secrect = '123456';
  for (var key in sign_arr) {
    if (key == '' || key == 'act' || key == 'method' || key == 'sign' || key == 'userinfo' || key == 'rawData' || key == 'encryptedData' || key == 'iv' || key == 'wx_session' || key == 'api') continue;
    array.push(key);
  }
  array.sort();
  var paramArray = new Array();
  paramArray.push(secrect);
  for (var index in array) {
    var key = array[index];
    paramArray.push(key + base64.encode(String(sign_arr[key])));
  }
  paramArray.push(appkey);
  return md5.hex_md5(paramArray.join(""));
};

/*@Title调用请求  GET方式
* params api和get参数
* callBack 成功回调函数（status==1）
* errorCallback 失败回调函数（需要判断其他status）
* data post参数（目前是get传参，此参数未用到）
* 注意：成功回调传参res.data，失败回调传参res
*/
function get(params, callBack, errorCallback, data) {
  let url = get_url(params);
  let api_token = wx.getStorageSync('api_token');
  let header;
  if (!api_token) {
    header = { "content-type": "json" };
  } else {
    header = { "content-type": "json", 'Api-Token': api_token };
  }
  if (wx.getStorageSync('PHPSESSID')) { //发短信页面有session_id，其他页面没有
    header.cookie = "PHPSESSID=" + wx.getStorageSync('PHPSESSID')
  }
  wx.request({
    url: url,
    data: data,
    method: 'GET',
    header: header,
    success: function (res) {
      if (res.data.status == 1) {
        callBack(res.data);
      } else if (res.data.status == 10000) {
        wx.navigateTo({
          url: '/page/member/pages/login/login'
        })
      } else {
        if (errorCallback) {
          errorCallback(res);
          return;
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }

    },
    fail: function (error) {
    }
  })
};

/*@Title调用请求 POST方式
* params api和get参数
* callBack 成功回调函数（status==1）
* errorCallback 失败回调函数（需要判断其他status）
* data post参数（目前是get传参，此参数未用到）
* 注意：成功回调传参res.data，失败回调传参res
*/
function post(params, callBack, errorCallback, data) {
  let url = post_url(params);
  let header = { "content-type": "application/x-www-form-urlencoded" }
  if (wx.getStorageSync('PHPSESSID')) { //发短信页面有session_id，其他页面没有
    header.cookie = "PHPSESSID=" + wx.getStorageSync('PHPSESSID')
  }

  if (params.api) {
    let api_token = wx.getStorageSync('api_token');
    let nologin_token = wx.getStorageSync('nologin_token') ? wx.getStorageSync('nologin_token').token : '';
    params.plat = 7;

    if (!api_token) {
      params.token = nologin_token;
    } else {
      header['Api-Token'] = api_token;
    }
    delete params.api
  }
  wx.request({
    url: url,
    data: params,
    method: 'POST',
    header: header,
    success: function (res) {
      if (res.data.status == 1) {
        callBack(res.data);
      } else if (res.data.status == 1002) {
        wx.navigateTo({
          url: '/page/member/pages/login/login'
        })
      } else {
        if (errorCallback) {
          errorCallback(res);
          return;
        }
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
      }

    },
    fail: function (error) {
    }
  })
};

module.exports = {
  get_url,
  api_url,
  get,
  post,
}