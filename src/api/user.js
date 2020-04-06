// 封装所有与用户相关的网络请求
import myhttp from '../utils/myhttp'

// 封装一个登录方法
export function apiLogin ({ mobile, code }) {
  return myhttp({
    url: '/authorizations',
    method: 'POST',
    data: {
      mobile: mobile,
      code: code
    }
  })
}
