export default {
  hideAllPopup() {
    Object.keys(this.data.popup).forEach(item => {
      this.data.popup[item] = false;
    });
    this.setData({ popup: this.data.popup });
  }
};
