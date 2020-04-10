# 小程序模板

## 项目地址

线上：

## 调试模式

#### 调试模式

- 模拟数据模式  
  开启方法：将 config.js 中的 mock 字段设置为 true ；
  模拟数据文件：MockData.js；
- 快速进入页面  
  开启方法：将 config.js 中的 debug 字段设置为 true , debugPath 字段设置要进入的路径

## 项目结构

### 支持 scss

使用了 vscode easy-sass 插件，将scss 文件保持后自动生成 wxss;

```json
// vscode 配置文件
 "easysass.formats":[
    {
      "format": "nested",
      "extension":".wxss"
    }
  ],
```

### newcomp.js 生成组件模板文件，newpage.js 生成页面模板文件

### 计算属性

使用了 npm 包 `wx-computed` 实现

```js
import initComputed from 'wx-computed';
Page({
  onLoad() {
    initComputed(this);
  },
  computed: {
    // 这是一个函数，返回值为此计算属性的值
    fullName() {
      return this.data.a + '-' + this.data.b;
    }
  }
});
```

## 安装

```bash
npm install
```

构建小程序 npm

## 开发

小程序开发

## 发布

小程序发布
