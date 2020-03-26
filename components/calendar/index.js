//index.js
//获取应用实例
//todo 跨月选择
Component({
  data: {
    hasEmptyGrid: false,
    cur_year: '',
    cur_month: '',
    lastDay: null,
    selectedDay: [],
    firstInit: true,
    classList: {},
    long: false
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.setNowDate();
    this.setClass();
  },
  methods: {
    setClass() {
      let classList = {};
      if (this.data.firstInit && this.data.todayIndex != null) {
        classList[this.data.todayIndex] = 'dateSelectViewRadiu';
      } else if (this.data.todayIndex != null && this.data.lastDay) {
        classList[this.data.todayIndex] = 'dateSelectViewRadiu';
        classList[this.data.lastDay] = 'dateSelectViewRadiu';
        for (let i = this.data.todayIndex + 1; i < this.data.lastDay; i++) {
          classList[i] = 'dateSelectViewRadiu';
        }
      }
      this.setData({
        classList: classList
      });
    },
    dateSelectAction: function(e) {
      if (this.data.firstInit) {
        this.setData({
          firstInit: false
        });
      }

      var cur_day = e.currentTarget.dataset.idx;
      if (this.data.lastDay != null) {
        this.setData({
          todayIndex: null,
          lastDay: null
        });
      }
      if (this.data.todayIndex == null || this.data.todayIndex > cur_day) {
        this.setData({
          todayIndex: cur_day
        });
        this.setData({
          firstInit: true
        });
      } else {
        this.setData({
          lastDay: cur_day
        });

        let selectedDay = [this.data.todayIndex];
        for (let i = this.data.todayIndex; i < cur_day; i++) {
          selectedDay.push(i);
        }
        this.setData({
          selectedDay: selectedDay
        });
        this.triggerEvent('datechange', {
          startDate: new Date(
            `${this.data.cur_year}/${this.data.cur_month}/${this.data
              .todayIndex + 1}`
          ),
          endDate: new Date(
            `${this.data.cur_year}/${this.data.cur_month}/${this.data.lastDay +
              1}`
          )
        });
      }

      this.setClass();

      console.log(
        `点击的日期:${this.data.cur_year}年${this.data.cur_month}月${cur_day +
          1}`
      );
    },

    setNowDate: function() {
      const date = new Date();
      const cur_year = date.getFullYear();
      const cur_month = date.getMonth() + 1;
      const todayIndex = date.getDate() - 1;
      console.log(`日期：${todayIndex}`);
      const weeks_ch = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

      this.calculate(cur_year, cur_month);
      this.setData({
        cur_year: cur_year,
        cur_month: cur_month,
        weeks_ch,
        todayIndex
      });
    },

    getThisMonthDays(year, month) {
      return new Date(year, month, 0).getDate();
    },
    getFirstDayOfWeek(year, month) {
      return new Date(Date.UTC(year, month - 1, 1)).getDay();
    },
    calculate(year, month) {
      this.calculateEmptyGrids(year, month);
      this.calculateDays(year, month);
      this.calculatLong();
    },
    calculateEmptyGrids(year, month) {
      const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
      let empytGrids = [];
      if (firstDayOfWeek > 0) {
        for (let i = 0; i < firstDayOfWeek; i++) {
          empytGrids.push(i);
        }
        this.setData({
          hasEmptyGrid: true,
          empytGrids
        });
      } else {
        this.setData({
          hasEmptyGrid: false,
          empytGrids: []
        });
      }
    },
    calculateDays(year, month) {
      let days = [];

      const thisMonthDays = this.getThisMonthDays(year, month);

      for (let i = 1; i <= thisMonthDays; i++) {
        days.push(i);
      }

      this.setData({
        days
      });
    },
    calculatLong() {
      this.setData({
        long: (this.data.days.length + this.data.empytGrids.length) / 7 > 5
      });
    },
    handleCalendar(e) {
      const handle = e.currentTarget.dataset.handle;
      const cur_year = this.data.cur_year;
      const cur_month = this.data.cur_month;
      if (handle === 'prev') {
        let newMonth = cur_month - 1;
        let newYear = cur_year;
        if (newMonth < 1) {
          newYear = cur_year - 1;
          newMonth = 12;
        }
        this.calculate(newYear, newMonth);

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
      } else {
        let newMonth = cur_month + 1;
        let newYear = cur_year;
        if (newMonth > 12) {
          newYear = cur_year + 1;
          newMonth = 1;
        }
        this.calculate(newYear, newMonth);

        this.setData({
          cur_year: newYear,
          cur_month: newMonth
        });
      }
    }
  }
});
