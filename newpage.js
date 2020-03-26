const pageNameList = ['noWechatRegisterSuccess']; //生成的文件名

const fs = require('fs');
const path = require('path');

function trimSpace(str) {
  return str.replace(/^\s/, '');
}

function make(pageName) {
  const pagePath = path.resolve(__dirname, 'pages/' + pageName);
  fs.mkdirSync(pagePath);
  fs.writeFileSync(
    path.resolve(pagePath, 'index.js'),
    trimSpace(`
const app = getApp();
import initComputed from 'wx-computed';
Page({
  data: {
    userInfo: null
  },
  onLoad() {
    app.ensure().then(res => {
      this.setData({
        userInfo: res.userInfo
      });
    });
    initComputed(this);
  }
});
`)
  );
  fs.writeFileSync(
    path.resolve(pagePath, 'index.json'),
    trimSpace(`
{
  "navigationStyle": "custom"
}`)
  );
  fs.writeFileSync(
    path.resolve(pagePath, 'index.wxml'),
    trimSpace(`
<d-page>
  <d-header />
</d-page>`)
  );
  fs.writeFileSync(path.resolve(pagePath, 'index.wxss'), trimSpace(''));
}

pageNameList.forEach(item => {
  make(item);
});
