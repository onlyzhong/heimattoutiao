// 用来处理所有与频道相关的网络请求
import myhttp from '../utils/myhttp.js'

// 封装请求用户频道的数据
export function apiGetChannels () {
  return myhttp({
    url: '/user/channels',
    method: 'GET'
  })
}
// 封装请求所有频道数据的方法
export function apiGetAllChannels () {
  return myhttp({
    url: '/channels'

  })
}
// 封装重新加载频道的方法
export function apiResetChannels (channels) {
  return myhttp({
    url: '/user/channels',
    method: 'PUT',
    data: {
      channels: channels
    }
  })
}
