/**
 * @NOTE when using this component, set this in page json file
 * "navigationStyle": "custom"
 */
import { getHeaderHeight } from '../../utils/index';

Component({
  data: {
    statusH: 0,
    navH: 0,
    showBack: false,
    pageLength: 0
  },
  properties: {
    title: {
      type: String,
      value: '自定义导航栏'
    },
    backBtn: {
      type: Boolean,
      value: true
    }
  },
  lifetimes: {
    attached() {
      const { statusH, navH } = getHeaderHeight();
      const pages = getCurrentPages();
      let showBack = pages.length > 1;
      if (pages.length === 1) {
        showBack = !/index\/index/.test(pages[0].__route__);
      }
      this.setData({
        showBack: showBack,
        statusH,
        navH,
        pageLength: pages.length
      });
    }
  },
  methods: {
    _tapBack() {
      if (this.data.pageLength <= 1) {
        return wx.reLaunch({
          url: '/pages/index/index'
        });
      }
      wx.navigateBack();
    }
  }
});
