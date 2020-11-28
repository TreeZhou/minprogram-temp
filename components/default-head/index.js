const src = '/assets/default-head.png';
Component({
  properties: {
    src: {
      type: String,
      value: '',
      observer() {
        this.setData({ _src: this.data.src || src });
      }
    }
  },
  data() {
    return {
      _src: ''
    };
  },
  methods: {
    errorHandler(e) {
      this.setData({ _src: src });
    }
  }
});
