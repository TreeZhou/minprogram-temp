import config from '../config';

function code2session(code) {
  //todo
  // code2session请求地址
  let url = config.reqBaseURL + '</client/user/code2session>';
  return new Promise((resolve, reject) => {
    wx.request({
      method: 'POST',
      url,
      data: {
        //todo 数据格式
        js_code: code
      },
      success: res => {
        console.log('code2session返回数据:', url, res.data);
        resolve(res);
      },
      fail: err => {
        console.log('code2session返回数据:', url, err);
        reject(new Error('fetch token faile'));
      }
    });
  });
}
function wxLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: async res => {
        resolve(res.code);
      },
      fail: () => {
        reject(Error('wx.login faile'));
      }
    });
  });
}
export async function fetchToken() {
  try {
    const code = await wxLogin();
    const res = await code2session(code);
    wx.setStorageSync(config.cookieStoreKey, res.header['Set-Cookie']);
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

function rmUndefined(obj) {
  if (!obj) {
    return {};
  }
  return Object.keys(obj)
    .map(k => {
      return [k, obj[k]];
    })
    .reduce((acc, item) => {
      if (item[1] !== undefined) {
        acc[item[0]] = item[1];
      }
      return acc;
    }, {});
}

const req = {
  fetchToken,
  open(options, mockData, auth = true) {
    const reqProm = () => {
      return new Promise((resolve, reject) => {
        const { url, header, data, ...restOpt } = options;
        const sendData = rmUndefined(data);
        let headerWithX = {
          ...header
        };
        console.log('请求数据：', url, options.data);

        if (mockData !== undefined) {
          console.log('模拟的返回数据', mockData);
          if (mockData.ok) {
            return resolve(JSON.parse(JSON.stringify(mockData)));
          } else {
            return reject(JSON.parse(JSON.stringify(mockData)));
          }
        }

        wx.request({
          ...restOpt,
          data: sendData,
          header: auth
            ? {
                ...headerWithX,
                cookie: wx.getStorageSync(config.cookieStoreKey)
              }
            : headerWithX,
          url: config.reqBaseURL + url,
          success: res => {
            console.log('返回数据：', url, res.data);
            if (res.data.ok) {
              if (!auth) {
                const setCookieStr = res.header['Set-Cookie'];
                if (res.header['Set-Cookie']) {
                  wx.setStorageSync(config.cookieStoreKey, setCookieStr);
                }
              }
              resolve(res.data);
            } else {
              reject(res.data);
            }
          },
          fail: err => {
            reject(err);
          }
        });
      });
    };
    return new Promise((resolve, reject) => {
      reqProm()
        .then(resolve)
        .catch(err => {
          if (err.error_code === '需要重新授权的错误码') {
            //重新授权
            console.error(err.message);
            fetchToken()
              .then(() => {
                reqProm()
                  .then(resolve)
                  .catch(reject);
              })
              .catch(err => {
                wx.showToast({
                  icon: 'none',
                  title: err.message
                });
                reject(err);
              });
          } else {
            reject(err);
          }
        });
    });
  }
};

export default req;
