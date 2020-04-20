import { getHeaderHeight } from '../../utils/index';

Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    mode: {
      type: String,
      value: 'scale'
    },
    bg: {
      type: String,
      value: '#f2f2f2'
    },
    safeAreaMode: {
      type: Boolean,
      value: false
    },
    designHeight: {
      type: Number,
      value: 1334
    },
    designWidth: {
      type: Number,
      value: 750
    }
  },
  data: {
    h: 0,
    wh: 0,
    ableSafeArea: true,
    scaleRatio: 1
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

      if (windowHeight - navH - statusH < this.data.designHeight / 2) {
        this.setData({
          ableSafeArea: false
        });
        if (this.data.mode === 'scale') {
          this.scale();
        }
      }

      this.setData({
        statusH: statusH,
        h,
        wh: (windowHeight - statusH - navH) * 2,
        safePad: safePad || 0
      });
    }
  },
  methods: {
    scale() {
      const { statusH, navH } = getHeaderHeight();
      const { windowWidth, windowHeight } = wx.getSystemInfoSync();

      let safeHeight = windowHeight - (statusH + navH);

      const fit = this.aspectFit({
        designWidth: this.data.designWidth,
        designHeight: this.data.designHeight,
        widht: windowWidth,
        height: safeHeight
      });
      if (fit.widht !== windowWidth) {
        const scaleRatio = (fit.widht / windowWidth) * 0.9;
        this.setData({ scaleRatio });
      }
    },
    aspectFit({ designWidth, designHeight, widht, height }) {
      const designRatio = designWidth / designHeight;
      const ratio = designWidth / designHeight;
      if (designRatio > ratio) {
        return {
          widht: widht,
          height: widht / designRatio
        };
      } else {
        return {
          widht: height * designRatio,
          height: height
        };
      }
    }
  }
});
