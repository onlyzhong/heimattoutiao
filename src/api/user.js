// 封装所有与用户相关的网络请求
import myHttp from '../utils/myhttp'

// 封装一个登录方法
export function apiLogin ({ mobile, code }) {
  return myHttp({
    url: '/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}

// 封装拉黑作者的接口
export function apiBlackList (autid) {
  return myHttp({
    url: '/user/blacklists',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 封装一个关注用户的接口
export function apiFollow (autid) {
  return myHttp({
    url: '/user/followings',
    method: 'POST',
    data: {
      target: autid
    }
  })
}

// 封装一个取关用户的接口
export function apiUnFollow (autid) {
  return myHttp({
    url: `/user/followings/${autid}`,
    method: 'DELETE'
  })
}
