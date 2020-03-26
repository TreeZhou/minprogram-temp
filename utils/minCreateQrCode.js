import wxbarcode from '../utils/wxbarcode/index';
// https://github.com/alsey/wxbarcode
//todo : 修改了源码，增加了回调cb
/**
 * @param {string}  content 转换成二维码的内容
 * @param {string}  canvasId 小程序canvasId
 * @param {number}}  cavW 宽度
 * @param {number}  cavH 高度
 * @return {string}  二维码图片图片
 *  */
export default function minCreateQrCode(content, canvasId, cavW, cavH) {
  return new Promise((resolve, reject) => {
    wxbarcode.qrcode(canvasId, content, cavW, cavH, function() {
      //  获取临时缓存图片路径，存入data中
      wx.canvasToTempFilePath({
        canvasId, // 这里canvasId即之前创建的canvas-id
        success: function(res) {
          resolve(res.tempFilePath);
        },
        fail: function(res) {
          console.error(res);
          reject(res);
        },
        complete: function() {}
      });
    });
  });
}
