import config from './config';
import pagePatch from './patch/Page';
import api from './api/index.js';
pagePatch();

App({
  api,
  globalData: {
    wxUserInfo: {},
    userInfo: null,
    scene: '',
    searchObj: null,
    isProd: false
  },
  async onLaunch(e) {
    let env;
    try {
      env = wx.getAccountInfoSync();
      if (!env) {
        env = 'none';
      }
    } catch (e) {
      console.log('获取小程序环境失败:', e);
      env = 'none';
    }
    // !注意检查
    if (env !== 'trial' && env !== 'develop') {
      this.globalData.isProd = true;
    }
    this.globalData.scene = e.scene;
    this.overShare();
  },

  getUserInfo() {
    return api.getUserInfo().then(data => {
      this.globalData.userInfo = data.result;
      return Promise.resolve({
        userInfo: data.result
      });
    });
  },

  async ensure() {
    if (this.globalData.userInfo) {
      return Promise.resolve({
        userInfo: this.globalData.userInfo
      });
    } else {
      return this.getUserInfo();
    }
  },
  updateUserInfo() {
    this.globalData.userInfo = null;
    return this.getUserInfo();
  },

  saveStorage(obj) {
    let stored = wx.getStorageSync(config.localStorageName);
    for (let key in obj) {
      if (stored) {
        stored[key] = obj[key];
      } else {
        stored = {};
        stored[key] = obj[key];
      }
    }
    wx.setStorage({
      key: config.localStorageName,
      data: stored
    });
  },
  getStorage() {
    return wx.getStorageSync(config.localStorageName);
  },

  //分享配置
  overShare: function() {
    //监听路由切换
    wx.onAppRoute(function() {
      let pages = getCurrentPages(),
        view = pages[pages.length - 1];
      let url = config.share.path;
      let options = view.options;
      url = url + '?';
      for (let key in options) {
        let value = options[key];
        url += key + '=' + value + '&';
      }
      url = url.substring(0, url.length - 1);
      if (view) {
        //这里可以过滤不需要复用的内容
        view.onShareAppMessage = function() {
          //你的分享配置
          console.log('fenxiang:', url);
          return {
            title: config.share.title,
            path: url,
            imageUrl: '/assets/share.png'
          };
        };
      }
    });
  }
});
