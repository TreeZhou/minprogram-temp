/* usage

const pagenation = new Pagenation()
const num = pagenation.getNextPageNum（）//向服务器获取第num页的数据；
pagenation.addData([1,2,3]);//添加数据，会自动已经添加到第几页
pagenation.getData(); // [1,2,3]；
pagenation.setEnd()//当服务器已经没有更多数据是，设置为结束；

*/

class Pagenation {
  constructor(pageCount = 20) {
    this._pageCount = pageCount;
    this.dataArray = [];
    this.ending = false;
    this.pageData = {
      page: 1,
      pageCount
    };
  }
  initPagenation() {
    this.dataArray = [];
    this.ending = false;
    this.pageData = {
      page: 0,
      pageCount: this._pageCount
    };
  }
  getNextPageNum() {
    return this.pageData.page + 1;
  }
  addData(dataArray) {
    this.dataArray = this.dataArray.concat(dataArray);
    ++this.pageData.page;
  }
  getData() {
    return this.dataArray;
  }
  setEnd() {
    this.ending = true;
  }
  hasMore() {
    return !this.ending;
  }
}
export default Pagenation;
