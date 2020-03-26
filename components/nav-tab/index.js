Component({
  data: {
    safePad: 0
  },
  properties: {
    active: {
      type: String,
      value: 'home'
    }
  },
  lifetimes: {
    attached() {
      const { safeArea } = wx.getSystemInfoSync();
      let safePad;
      if (safeArea) {
        safePad = safeArea.bottom - safeArea.height;
      }
      this.setData({
        safePad: safePad || 0
      });
    }
  },
  methods: {
    _go(e) {
      const { dataset } = e.currentTarget;
      if (dataset.active) return;
      wx.redirectTo({
        url: dataset.url
      });
    }
  }
});
