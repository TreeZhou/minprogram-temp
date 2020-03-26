```html
<view class="box">
  <image
    data-type="image"
    data-url="./demo.png"
    class="draw_canvas"
    src="./demo.png"
  />
  <text data-type="text" data-text="文字" class="code draw_canvas">文字</text>
  <canvas
    canvas-id="canvasId"
    class="canvas"
    style="width:602rpx;height:910rpx;"
  />
  <!--  生成二维码需要一个canvas标签，只能放在page页面文件中；将其隐藏到了画面外 -->
</view>

<image class="save-img" src="{{qrcodeImg}}" bindlongpress="saveImg" />
```

```js
import Wxml2Canvas from './wxml2canvas';

drawGuiderQrcodeImage() {
    wx.showLoading({
      title: '生成中'
    });
    const drawImage = new Wxml2Canvas({
      width: 602,
      height: 910,
      element: 'canvasId',
      background: 'transparent',
      finish: url => {
        this.setData({
          qrcodeImg: url
        });
        wx.hideLoading();
      },
      error(res) {
        console.error('导购二维码绘制失败', res);
      }
    });

    drawImage.draw({
      list: [
        {
          type: 'wxml',
          class: '.box .draw_canvas',
          limit: '.box',
          x: 0,
          y: 0
        }
      ]
    });
  }

```
