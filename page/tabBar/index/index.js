// page/loan_application/pages/no_account/no_account.js
const app = getApp();
const QQMapWX = require("../../../vendors/qqmap-wx-jssdk.min.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parms: { crglnamt: "300000", loanyrintrt: "4.85", trmuplmval: "12" },
    location: { lat: '', lng: '' },
    markers: [],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }]
  },
  markertap(e) {
    let markerId = e.markerId;
    let latitude = '';
    let longitude = '';
    for (let v of this.data.markers) {
      if (v.id == markerId) {
        latitude =
          wx.openLocation({
            latitude: v.latitude,
            longitude: v.longitude,
            scale: 18,
            name: v.address
          })
        return;
      }
    }
  },
  useQQSDK: function (keyword, location) {
    let that = this;
    // 实例化API核心类
    var qqSDK = new QQMapWX({
      key: 'TUPBZ-VWUK3-WSM3Z-32FNM-FAZVZ-27FLH' // 必填
    });
    // 调用接口
    qqSDK.getSuggestion({
      keyword: keyword,
      location: location,
      success: function (res) {
        let markers = [];
        res.data.forEach((v, index) => {
          markers.push({
            // iconPath: '',
            id: index,
            latitude: v.location.lat,
            longitude: v.location.lng,
            width: 25,
            height: 35,
            address: v.address
          })
        });
        that.setData({
          markers: markers
        });
      },
      fail: function (res) {
        // console.log(res, 'fail');
      },
      complete: function (res) {
        // console.log(res, 'complete');
      }
    });
  },
  // 获取信息进行设置
  get_location_info() {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        let location = String(res.latitude) + ',' + String(res.longitude);
        that.data.location.lat = res.latitude;
        that.data.location.lng = res.longitude;
        that.setData({
          "location.lat": res.latitude,
          "location.lng": res.longitude
        });
        that.useQQSDK('厕所', location)
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this;
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '温馨提示',
            content: '检测到您没打开地理位置权限，是否去设置打开?',
            cancelColor: '#83838B',
            confirmText: '确定',
            confirmColor: '#F54949',
            success(res) {
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    if (res.authSetting['scope.userLocation']) {
                      that.get_location_info();
                    }
                  }
                });
              } else if (res.cancel) {

              }
            }
          })
        } else {
          that.get_location_info();
        }
      }
    });

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.get_location_info();
  }
})