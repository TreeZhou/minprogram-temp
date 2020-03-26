import minCreateQrCode from '../../utils/minCreateQrCode';
Component({
  properties: {
    qrcodeString: {
      type: String,
      value: ''
    },
    width: {
      type: String,
      value: '300rpx;'
    },
    height: {
      type: String,
      value: '300rpx;'
    }
  },
  data: {
    qrcodeImg: ''
  },
  lifetimes: {
    attached: function() {
      this.create();
    },
  },
  methods: {
    async create() {
      const qrcodeImg = await minCreateQrCode(
        'id;' + this.data.qrcodeString,
        'qrcode-canvas',
        200,
        200
      );
      this.setData({
        qrcodeImg
      });
    }
  }
});
