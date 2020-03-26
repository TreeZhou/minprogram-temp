import { getHeaderHeight } from '../../utils/index';

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    bg: {
      type: String,
      value: '#f2f2f2'
    },
    safeAreaMode: {
      type: Boolean,
      value: false
    }
  },
  data: {
    h: 0,
    wh: 0,
    ableSafeArea: true
  },
  lifetimes: {
    attached() {
      console.log(wx.getSystemInfoSync());
      const { windowHeight, safeArea } = wx.getSystemInfoSync();
      console.log('safeArea', safeArea);
      let safePad;
      if (safeArea) {
        safePad = safeArea.bottom - safeArea.height;
      }
      const { statusH, navH } = getHeaderHeight();
      let h = statusH + navH;

      if (windowHeight - navH - statusH < 1206 / 2) {
        this.setData({
          ableSafeArea: false
        });
      }
      this.setData({
        statusH: statusH,
        h,
        wh: (windowHeight - statusH - navH) * 2,
        safePad: safePad || 0
      });
    }
  }
});
