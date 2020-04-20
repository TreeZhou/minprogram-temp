const app = getApp();
import config from '../../config';
import { wxCheckSession } from '../../sdk/wxSdk';
Page({
  data: {},
  async onLoad(option) {
    console.log('index/index', option, getCurrentPages());
    this.saveSearchData(option);
    this.selectComponent('#loading').startProgress();
    await this.login();
    this.initPage();
  },
  saveSearchData(option) {
    if (Object.keys(option).length > 0) {
      app.globalData.searchObj = option;
    }
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
