import req from './req';
import _mockData from './mockData';
import config from '../config';
const mockData = config.mock ? _mockData : {};

const api = {
  fetchToken: req.fetchToken,
  showError: error => {
    console.log(error);
    wx.showToast({
      icon: 'none',
      title: 'REQ_ERROR: ' + typeof error === 'string' ? error : error.message
    });
  },
  // 获取 oss 上传图片的签名
  getUploadToken() {
    return req.open({
      method: 'get',
      url: '/client/guide/oss/upload_sign'
    });
  },
  getUserInfo(data) {
    return req.open(
      {
        method: 'POST',
        url: '[api接口地址]',
        data
      },
      mockData.data
    );
  }
};

export default api;
