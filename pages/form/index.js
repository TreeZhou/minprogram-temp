const app = getApp();

Page({
  data: {
    checked: true,
    date: new Date().getTime(),
    verifyCodeBtnTxt: '获取验证码',
    nameInputFocus: false,
    formData: {
      name: '',
      phone: '',
      code: '',
      sex: '男',
      year: ''
    },
    rules: [
      {
        name: 'name',
        rules: { required: true, message: '姓名必填' }
      },
      {
        name: 'phone',
        rules: [
          { required: true, message: 'mobile必填' },
          { mobile: true, message: 'mobile格式不对' }
        ]
      },
      {
        name: 'code',
        rules: { required: true, message: '验证码必填' }
      },
      {
        name: 'sex',
        rules: { required: true, message: '性别必填' }
      },
      {
        name: 'year',
        rules: { required: true, message: '出生年必填' }
      }
    ]
  },
  onLoad() {
    this.init();
  },
  init() {
    app.ensure().then(res => {
      this.setData({
        userInfo: res.userInfo
      });
    });
  },
  setDefaultValue() {
    this.setData({ formData: {} });
  },
  async getPhoneCode() {
    this.selectComponent('#form').validateField(
      'phone',
      async (valid, errors) => {
        if (!valid) {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            wx.showToast({
              icon: 'none',
              title: errors[firstError[0]].message
            });
          }
        } else {
          this.setVerifyCodeBtnTxt();
          console.log(this.data.formData.phone);
        }
      }
    );
  },
  commonFormChange(e) {
    const { field } = e.currentTarget.dataset;
    this.setData({
      [`formData.${field}`]: e.detail.value
    });
  },
  nameInputFocusHandle() {
    this.setData({ nameInputFocus: true });
  },
  sexChange(event) {
    this.setData({
      'formData.sex': event.detail
    });
  },
  dateChange(e) {
    let data = e.detail.value.split('-');
    this.setData({ 'formData.year': data[0], 'formData.month': data[1] });
  },
  agress(event) {
    this.setData({
      checked: event.detail
    });
  },
  verifyForm() {
    return new Promise((resolve, reject) => {
      this.selectComponent('#form').validate((valid, errors) => {
        console.log('valid', valid, errors);

        if (!valid) {
          const firstError = Object.keys(errors);
          if (firstError.length) {
            wx.showToast({
              icon: 'none',
              title: errors[firstError[0]].message
            });
          }
          reject(new Error('表单校验失败'));
        } else {
          let tip;
          if (!this.data.checked) {
            tip = '请同意协议';
          }
          if (!this.data.formData.month) {
            tip = '月份必填';
          }
          if (tip) {
            wx.showToast({
              icon: 'none',
              title: tip
            });
            return;
          }
          resolve();
        }
      });
    });
  },
  async saveForm() {
    try {
      await this.verifyForm();
      console.log(this.data.formData);
    } catch (error) {
      if (error.ok === false) {
        wx.showToast({ icon: 'none', title: error.msg });
      }
      return Promise.reject(error);
    }
  },
  setVerifyCodeBtnTxt() {
    let timer = setInterval(() => {
      let text = this.data.verifyCodeBtnTxt;
      if (typeof text === 'string') {
        this.setData({ verifyCodeBtnTxt: 60 });
      } else if (text <= 0) {
        this.setData({ verifyCodeBtnTxt: '获取验证码' });
        clearInterval(timer);
      } else {
        this.setData({ verifyCodeBtnTxt: --text });
      }
    }, 1000);
  }
});
