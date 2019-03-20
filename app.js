//app.js
var config = require('./utils/wxconfig.js');//域名配置文件
var api = require('./utils/api.js');//api接口
var request = require('./utils/http.js');//http请求
App({
  config: config,
  request: request,
  api: api,
  onShow() {
    // this.get_token();
  },
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo;
          //     this.globalData.is_auth = true;

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }else{
          wx.navigateTo({ url:'/page/auth/auth'})
        }
      }
    })
  },
  // 全局基本数据
  globalData: {
    is_auth:false,//用户是否授权
    userInfo: null,//用户信息
  },
  /*
  *@Title 是否登录
  */
  isLogin() {
    if (!wx.getStorageSync('loginInfo')) {
      wx.navigateTo({
        url: '/page/login/login',
      })
      return false
    }
    return true
  },
  /*
  *@Title token获取
  */
  get_token: function () {
    //获取未登录token
    let nologin_token_obj = wx.getStorageSync('nologin_token') ? wx.getStorageSync('nologin_token') : '';
    if (!wx.getStorageSync('api_token')) {
      if (!nologin_token_obj || new Date().getTime() - nologin_token_obj.time * 1 > nologin_token_obj.expiration_time) {
        let params = {
          api: api.default.auth.get_token,
        };
        request.get(params, result => {
          if (result.status == 1) {
            nologin_token_obj = { token: result.data.token, time: new Date().getTime(), expiration_time: result.data.expiration_time };
            wx.setStorageSync('nologin_token', nologin_token_obj);
          } else {
            wx.showToast({ title: 'Token获取失败' })
          }
        })
      } else {
        let params = {
          token: nologin_token_obj.token,
          time: nologin_token_obj.time,
          expiration_time: nologin_token_obj.expiration_time
        };
        wx.setStorageSync('nologin_token', params);
      }
    }
  }
})