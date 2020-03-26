Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    width: {
      type: String,
      value: '100%ƒ'
    },
    height: {
      type: String,
      value: '65rpx'
    },
    placehold: {
      type: String,
      value: '请输入'
    }
  },
  data: {
    show: false,
    value: ''
  },
  attached: function() {
    this.setData({ show: true });
  },
  detached: function() {
    this.setData({ show: false });
  },

  methods: {
    clear() {
      this.setData({ value: '' });
    },
    onInput(e) {
      this.triggerEvent('input', e.detail);
    },
    onClose() {
      this.triggerEvent('close');
    }
  }
});
