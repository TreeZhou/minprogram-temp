const app = getApp();
import mixinMethods from '../../mixin/methods';
import initComputed from 'wx-computed';


const dataTemp = {
  userInfo: null,
  popup: {
    commonPopupVisiable: false,
    dialogPopupVisiable: false,
    selectPopupVisiable: false
  }
};
Page({
  data: JSON.parse(JSON.stringify(dataTemp)),
  init() {
    this.setData(JSON.parse(JSON.stringify(dataTemp)));
  },
  computed: {
    computedName() {
      return this.data.userInfo;
    }
  },
  ...mixinMethods,
  onLoad() {
    initComputed(this);
  },
  onReady() {},
  handle() {},
  onShow() {
    app
      .updateUserInfo()
      .then(res => {
        this.setData({
          userInfo: res.userInfo
        });
      })
      .catch(e => {
        console.error(e);
      });
  },
  showPopup1() {
    this.hideAllPopup();
    this.setData({ 'popup.commonPopupVisiable': true });
  },
  showPopup2() {
    this.hideAllPopup();
    this.setData({ 'popup.dialogPopupVisiable': true });
  },
  showPopup3() {
    this.hideAllPopup();
    this.setData({ 'popup.dialogPopupVisiable': true });
  },
  showSelectPopup() {
    this.setData({ 'popup.selectPopupVisiable': true });
  },
  getPrevPageData() {
    const pages = getCurrentPages();
    const prevPage = pages[pages.length - 2];
    console.log(prevPage.data);
  }
});
