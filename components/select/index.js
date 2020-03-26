Component({
  properties: {
    dataArray: {
      type: Array,
      value: [{ name: '名字', id: 1 }]
    },
    defaultId: {
      type: Number,
      value: -1
    }
  },
  data: {
    checked: '',
    filterDatas: [],
    key: ''
  },
  attached: function() {
    this.init();
  },
  methods: {
    init() {
      this.setData({
        checked:
          this.data.defaultId === -1
            ? this.data.dataArray[0].id
            : this.data.defaultId
      });
      this.filter();
    },
    radioChange: function(e) {
      this.setData({ checked: e.detail.value });
    },
    next() {
      if (this.data.checked === '') {
        return wx.showToast({ icon: 'none', title: '未选择' });
      }
      this.triggerEvent(
        'change',
        this.data.dataArray.find(item => {
          return item.id == this.data.checked;
        })
      );
    },
    onSearchBarInput(e) {
      this.setData({ key: e.detail.value, checked: '' });
      this.filter();
    },
    close() {
      this.triggerEvent('close');
    },
    filter() {
      let filterDatas = this.data.dataArray.filter(item => {
        return (
          item.name
            .toLocaleLowerCase()
            .indexOf(this.data.key.toLocaleLowerCase()) > -1
        );
      });
      this.setData({
        filterDatas
      });
    }
  }
});
