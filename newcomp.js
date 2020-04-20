const pageNameList = ['home']; //生成的文件名

const fs = require('fs');
const path = require('path');

function trimSpace(str) {
  return str.replace(/^\s/, '');
}

function make(pageName) {
  const pagePath = path.resolve(__dirname, 'components/' + pageName);
  fs.mkdirSync(pagePath);
  fs.writeFileSync(
    path.resolve(pagePath, 'index.js'),
    trimSpace(`
    const app = getApp();
    Component(
      {
        properties: {
          innerText: {
            type: String,value: 'default value'
          }
        },
        attached: function() {
          app.ensure({}).then(res => {
            this.setData({
              userInfo: res.userInfo
            });
          });
        },
        data: {
          someData: {}
        },
        attached: function() {
        },
        detached: function() {
        },
        methods: {
          customMethod: function(){}
        }
      })`)
  );
  fs.writeFileSync(
    path.resolve(pagePath, 'index.json'),
    trimSpace(`
  {
    "component": true
  }`)
  );
  fs.writeFileSync(
    path.resolve(pagePath, 'index.wxml'),
    trimSpace(`
  <view>
    ${pageName}
  </view>`)
  );
  fs.writeFileSync(path.resolve(pagePath, 'index.wxss'), trimSpace(''));
}

pageNameList.forEach(item => {
  make(item);
});
