import myHttp from '../utils/myhttp.js'

// 封装一个输入联想的方法
export function apiThink (key) {
  return myHttp({
    // url: '/suggestion?q=' + key,
    url: `/suggestion?q=${key}`,
    method: 'GET'
  })
}
