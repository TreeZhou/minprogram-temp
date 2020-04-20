Component({
  data: {
    progress: 0,
    timer: null
  },
  onUnload: function () {
    clearInterval(this.data.timer);
  },
  methods: {
    startProgress() {
      let timer = setInterval(() => {
        if (this.data.progress <= 99)
          return this.setData({ progress: this.data.progress + 2 });
        clearInterval(this.data.timer);
      }, 100);
      this.setData({ timer });
    }
  }
});
