import config from '../config';

function pagePatch(extraPatch = []) {
  let oldPage = Page;

  function createWXPatch(apiName) {
    return function(e) {
      const { dataset } = e.currentTarget;
      const { success, fail, complete, ...restDataset } = dataset;
      wx[apiName].call(this, {
        ...restDataset,
        success: this[success],
        fail: this[fail],
        complete: this[complete]
      });
    };
  }

  Page = function(options) {
    const defaultPatch = {};
    const wxPatchFns = [
      // 路由
      'switchTab',
      'reLaunch',
      'redirectTo',
      'navigateTo',
      'navigateBack',
      // 交互
      'showToast',
      'showModal',
      'showLoading',
      'showActionSheet',
      'hideToast',
      'hideLoading',
      // 导航栏
      'showNavigationBarLoading',
      'setNavigationBarTitle',
      'setNavigationBarColor',
      'hideNavigationBarLoading',
      // 背景
      'setBackgroundTextStyle',
      'setBackgroundColor',
      // Tab Bar
      'showTabBarRedDot',
      'showTabBarRedDot',
      'showTabBar',
      'setTabBarStyle',
      'setTabBarItem',
      'setTabBarBadge',
      'removeTabBarBadge',
      'hideTabBarRedDot',
      'hideTabBar',
      // 滚动
      'pageScrollTo',
      // 置顶
      'setTopBarText',
      // 数据缓存
      'setStorageSync',
      'setStorage',
      'removeStorageSync',
      'removeStorage',
      'getStorageSync',
      'getStorageInfoSync',
      'getStorageInfo',
      'getStorage',
      'clearStorageSync',
      'clearStorage',
      // 图片
      'saveImageToPhotosAlbum',
      'previewImage',
      'getImageInfo',
      'compressImage',
      'chooseMessageFile',
      'chooseImage',
      // 视频
      'saveVideoToPhotosAlbum',
      'createVideoContext',
      'chooseVideo',
      // 剪贴板
      'setClipboardData',
      'getClipboardData',
      // 电话
      'makePhoneCall',
      // 扫码
      'scanCode',
      // 位置
      'openLocation',

      /// addon
      ...extraPatch
    ];
    wxPatchFns.forEach(apiName => {
      defaultPatch['$wx.' + apiName] = createWXPatch(apiName);
    });

    if (!options.onShareAppMessage) {
      options.onShareAppMessage = function() {
        return config.share;
      };
    }

    oldPage.call(this, { ...defaultPatch, ...options });
  };
}

export default pagePatch;
