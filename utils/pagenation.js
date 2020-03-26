// todo

class Pagenation {
  constructor(pageCount = 20) {
    this._pageCount = pageCount;
    this.pageData = {
      page: 1,
      pageCount
    };
  }
  initPagenation() {
    this.pageData = {
      page: 1,
      pageCount: this._pageCount
    };
  }
  getNextPage() {
    return ++this.pageData.page;
  }
  getPrePage() {
    return --this.pageData.page;
  }
}
export default Pagenation;
