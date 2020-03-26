const app = getApp();
export function getCommonCallback(desc) {
  return {
    fail: res => {
      console.log(desc + 'fail', res);
    },
    complete: res => {
      console.log(desc + 'complete', res);
    },
    success: res => {
      console.log(desc + 'succes', res);
    }
  };
}
app.getCommonCallback = getCommonCallback;

export async function wxCheckSession() {
  return new Promise(resolve => {
    wx.checkSession({
      success() {
        resolve({
          ok: true
        });
      },
      fail() {
        resolve({
          ok: false
        });
      }
    });
  });
}

export async function wxQyCheckSession() {
  return new Promise(resolve => {
    wx.qy.checkSession({
      success() {
        //session_key 未过期，并且在本生命周期一直有效
        resolve({
          ok: true
        });
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        resolve({
          ok: false
        });
      }
    });
  });
}

export function qyLogin() {
  console.log('qyLogin');
  return new Promise((resolve, reject) => {
    wx.qy.login({
      success: function(res) {
        console.log('qyLoginsuccess:', res);

        if (res.code) {
          resolve(res.code);
        } else {
          console.error('企业微信登录失败', res);
          reject(res);
        }
      },
      fail: res => {
        console.error('企业微信登录失败', res);
        reject(res);
      }
    });
  });
}

export async function qyWxTZLogin() {
  try {
    let qyCheckStatus = await wxQyCheckSession();
    if (!qyCheckStatus.ok) {
      const qyWxCode = await qyLogin();
      console.log(qyWxCode);
      await app.api.qyCode2session({
        js_code: qyWxCode
      });
    }
    return Promise.resolve({
      ok: true
    });
  } catch (error) {
    //
    return Promise.reject(error);
  }
}

export function getMobileInWork() {
  return new Promise((resolve, reject) => {
    wx.qy.getMobile({
      success: res => {
        resolve(res);
      },
      fail(res) {
        reject(res);
      }
    });
  });
}

//检查保存到相册的权限
function checkWritePhotosAlbum() {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: () => {
              resolve({
                ok: true
              });
            },
            fail: res => {
              reject(res);
            }
          });
        } else {
          resolve({
            ok: true
          });
        }
      },
      fail: res => {
        reject(res);
      }
    });
  });
}
function wxSaveImg(src) {
  return new Promise((resolve, reject) => {
    wx.getImageInfo({
      src,
      success: res => {
        let path = res.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success: () => {
            resolve({
              ok: true
            });
          },
          fail: res => {
            reject(res);
          }
        });
      },
      fail: res => {
        reject(res);
      }
    });
  });
}

export async function saveImg(src) {
  try {
    await checkWritePhotosAlbum();
    await wxSaveImg(src);
    wx.showToast({ icon: 'none', title: '保存成功' });
  } catch (error) {
    return Promise.reject(error);
  }
}

export function requestSubscribeMessage(tmpIds, type, successCallBack) {
  if (wx.canIUse('requestSubscribeMessage')) {
    wx.requestSubscribeMessage({
      tmplIds: tmpIds,
      success: async res => {
        if (res[tmpIds[0]] === 'accept') {
          await app.api.subscribeMsg({
            type
          });
        }
        successCallBack();
      },
      fail(e) {
        console.log('requestSubscribeMessage:fail', e);
      }
    });
  } else {
    successCallBack();
  }
}
