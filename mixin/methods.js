export default {
  hideAllPopup() {
    Object.keys(this.data.popup).forEach(item => {
      this.data.popup[item] = false;
    });
    this.setData({ popup: this.data.popup });
  },
  toHome() {
    wx.redirectTo({
      url: '/pages/home/index',
      ...app.getCommonCallback('redirectTo')
    });
  }
};
