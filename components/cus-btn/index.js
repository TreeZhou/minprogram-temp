Component({
  properties: {
    img: {
      type: String,
      value: ''
    },
    disable: {
      type: Boolean,
      value: false
    },
    text: {
      type: String,
      value: '#68B300'
    },
    color: {
      type: String,
      value: '#fff'
    },
    bgc: {
      type: String,
      value: '#68B300'
    },
    width: {
      type: Number,
      value: 480
    },
    height: {
      type: String,
      value: 90
    },
    fontSize: {
      type: String,
      value: 32
    },
    rect: Boolean,
    plain: Boolean,
    pointerEvents: {
      type: String,
      value: 'auto'
    }
  },
  data: {
    timer: ''
  },
  methods: {
    click: function() {
      if (this.data.disable) return;
      clearTimeout(this.data.timer);
      let timer = setTimeout(() => {
        this.triggerEvent('click');
      }, 300);
      this.setData({ timer });
    }
  }
});
