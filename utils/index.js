const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
function isIOS(system) {
  return /iOS/i.test(system);
}

export function getHeaderHeight() {
  const iosNavH = 48;
  const androidNavH = 44;
  const info = wx.getSystemInfoSync();
  return {
    statusH: info.statusBarHeight,
    navH: isIOS(info.system) ? iosNavH : androidNavH
  };
}

