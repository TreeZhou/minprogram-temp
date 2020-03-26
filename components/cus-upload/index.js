const app = getApp();
Page({
  data: {
    fileList: [
      //填充图片格式
      // {
      //   url: 'http://iph.href.lu/60x60?text=default',
      //   name: '图片2',
      //   isImage: true
      // }
    ],
    uploading: false,
    progress: 0
  },
  delete(e) {
    this.data.fileList.splice(e.detail.index, 1);
    this.setData({ fileList: this.data.fileList });
  },
  uploading() {
    this.setData({ uploading: true });
  },
  unUploading() {
    return this.data.fileList.every(item => {
      return item.uploaded;
    });
  },
  isUploading() {
    return this.data.uploading;
  },
  async afterRead(event) {
    if (this.isUploading()) return;
    const { file } = event.detail;
    this.uploading();
    try {
      //todo 接口及token数据格式需要重写
      let token = await app.api.getUploadToken();
      this.showImg({
        ...file,
        ossImgUrl: token.result.url
      });
      await this.wxUploadFile({
        filePath: file.path,
        url: token.result.endpoint,
        OSSAccessKeyId: token.result.OSSAccessKeyId,
        policy: token.result.policy,
        Signature: token.result.signature,
        key: token.result.key
      });
      //todo 接口及token数据格式需要重写
    } catch (error) {
      console.error(error);
      this.uploadfail();
    }
    this.unUploading();
  },
  showImg(file) {
    const { fileList = [] } = this.data;
    fileList.push({ ...file });
    this.setData({ fileList });
  },
  wxUploadFile({ url, filePath, OSSAccessKeyId, policy, Signature, key }) {
    return new Promise((resolve, reject) => {
      const uploadTask = wx.uploadFile({
        url,
        filePath,
        name: 'file',
        formData: {
          OSSAccessKeyId,
          policy,
          Signature,
          key
        },
        success: uploadRes => {
          if (uploadRes.statusCode === 400) {
            return reject(uploadRes);
          }
          console.log(uploadRes);
          resolve(uploadRes);
        },
        fail: res => {
          console.log('uploadfail:', res);
          return reject(res.errMsg);
        },
        complete: res => {
          console.log('uploadcomplete:', res);
        }
      });
      uploadTask.onProgressUpdate(res => {
        console.log('上传进度：', res.progress);
        this.setData({ progress: res.progress });
      });
    });
  },
  uploadfail(msg) {
    this.data.fileList.pop();
    this.setData({ fileList: this.data.fileList });
    wx.showToast({ icon: 'none', title: '上传失败' + msg });
  }
});
