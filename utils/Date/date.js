export default {
  /** 格式化日期
   * @param {string} date "2019年02月16日 00:00:00"
   * @param {string} [separator='/']
   * @returns {string} 2019/02/16 00:00:00
   */
  dateCNToSeparator(date, separator = '/') {
    return date.replace(/[年月]/gim, separator).replace(/日/, '');
  },

  /** 格式化日期
   *@param {Date} date
   *@param {string} separator  分隔符"/","-"
   *@param {boolean} [onlyDay=false] 是否只返回日期
   *@returns {string} xxxxSxxSxx xx:xx:xx
   */
  dateToSeparator(date, separator = '/', onlyDay = false) {
    date = new Date(date);
    let newDate;
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let h = date.getHours();
    let mm = date.getMinutes();
    let s = date.getSeconds();
    function add0(m) {
      return m < 10 ? '0' + m : m;
    }

    newDate = y + separator + add0(m) + separator + add0(d);

    if (onlyDay) {
      return newDate;
    } else {
      return newDate + ' ' + add0(h) + ':' + add0(mm);
      // return newDate + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
    }
  },

  getHM(date) {
    return this.dateToSeparator(date).slice(11, 16);
  },

  /** 获取开始时间
   * @param {date} date
   * @param {boolean} 是否精确到时分秒
   * @returns {string} 2019/02/16 00:00:00
   */
  getStartDate(date, withEnd = false) {
    return withEnd
      ? this.dateToSeparator(date, '/', true) + ' 00:00:00'
      : this.dateToSeparator(date, '/', true);
  },

  /** 获取结束时间
   * @param {date} date
   * @param {boolean} 是否精确到时分秒
   * @returns {string} 2019/02/16 23:59:59
   */
  getEndDate(date, withEnd) {
    return withEnd
      ? this.dateToSeparator(date, '/', true) + ' 23:59:59'
      : this.dateToSeparator(date, '/', true);
  },
  getMonth(date) {
    return new Date(date).getMonth() + 1;
  },
  getDate(date) {
    return new Date(date).getDate();
  },
  getDay(date) {
    console.log();
    return this.translatetoChina(new Date(date).getDay() + 1);
  },
  translatetoChina(key) {
    key = String(key);
    let str;
    switch (key) {
      case '1':
        str = '一';
        break;
      case '2':
        str = '二';
        break;
      case '3':
        str = '三';
        break;
      case '4':
        str = '四';
        break;
      case '5':
        str = '五';
        break;
      case '6':
        str = '六';
        break;
      case '7':
        str = '日';
        break;
      default:
        break;
    }
    return str;
  },
  getLastWeek() {
    let today = new Date();
    return today.setDate(today.getDate() - 6);
  }
};
