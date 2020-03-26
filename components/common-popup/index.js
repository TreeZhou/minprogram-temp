Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    bgc: {
      type: String,
      value: '#fff'
    },
    width: {
      type: Number,
      value: 640
    },
    height: {
      type: Number,
      value: 411
    }
  }
});
