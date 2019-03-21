var valid = require('../../../../utils/valid.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    param: {
      mobile: '',
      password: '',
    },
    type_pw: 'password',
  },
  //监听input (手机号输入)
  listenerInput(e) {
    let value = e.detail.value || '';
    let row = e.currentTarget.dataset.row;
    this.setData({
      [row]: value
    })
  },
  //切换密码状态
  showBtnClick: function () {
    if (this.data.type_pw == 'password') {
      this.setData({
        "type_pw": 'text'
      })
    } else {
      this.setData({
        "type_pw": 'password'
      })
    }
  },
  //用户密码输入
  listenerPasswordInput: function (e) {
    var password = e.detail.value;
    this.setData({
      "param.password": password
    })
  },
  //移除密码
  resetBtnclicklm: function () {
    this.setData({
      "param.password": ''
    })
  },

  //检验
  check() {
    let error_info = '';
    console.log(!valid.default.check_mobile(this.data.param.mobile))
    if (!valid.default.check_mobile(this.data.param.mobile)) {
      error_info = '请输入正确的手机号';
    }else if (this.data.param.password.length <= 8) {
      error_info = '密码应大于8位';
    }
    if (error_info) {
      wx.showToast({
        title: error_info,
        icon: 'none'
      })
      return false;
    }
    return true;
  },
  //登录
  mobile_login:function(){
    if (!this.check()) return;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})