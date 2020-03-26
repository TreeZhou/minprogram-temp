/**是否是企业微信
 *
 *   */

export default function isWxwork() {
  const res = wx.getSystemInfoSync();
  return res.environment && res.environment === 'wxwork';
}
