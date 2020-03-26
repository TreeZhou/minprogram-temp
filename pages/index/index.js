const app = getApp();
import config from '../../config';
import { wxCheckSession } from '../../sdk/wxSdk';
Page({
  data: {
    progress: 0,
    timer: null
  },
  async onLoad(option) {
    console.log('index/index', option, getCurrentPages());
    this.saveSearchData(option);
    this.startProgress();
    await this.login();
    this.initPage();
  },
  onUnload: function() {
    clearInterval(this.data.timer);
  },
  saveSearchData(option) {
    if (Object.keys(option).length > 0) {
      app.globalData.searchObj = option;
    }
  },
  startProgress() {
    let timer = setInterval(() => {
      if (this.data.progress <= 99)
        return this.setData({ progress: this.data.progress + 2 });
      clearInterval(this.data.timer);
    }, 100);
    this.setData({ timer });
  },
  async login() {
    try {
      let checkStatus = await wxCheckSession();
      if (!checkStatus.ok) {
        await app.api.fetchToken();
      }
      return Promise.resolve();
    } catch (error) {
      console.error(error);
      wx.showToast({
        icon: 'none',
        title: '应用程序授权失败' + error.message
      });
      return Promise.reject();
    }
  },
  async initPage() {
    try {
      // 调试页面，快速进入
      if (config.debug) return wx.redirectTo({ url: config.debugPath });
      let directUrl = '/pages/home/index';
      wx.redirectTo({
        url: directUrl,
        ...app.getCommonCallback()
      });
    } catch (error) {
      console.error(error);
      wx.showToast({ icon: 'none', title: '初始化页面失败' });
    }
  }
});
