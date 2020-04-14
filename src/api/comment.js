// 用来封装所有与评论相关的网络请求
import myHttp from '../utils/myhttp'

// 封装一个用来得到评论数据的接口
export function apiGetComment ({ artid, offset, limit }) {
  return myHttp({
    url: '/comments',
    method: 'GET',
    params: {
      type: 'a',
      source: artid,
      offset: offset,
      limit: limit
    }
  })
}

// 封装一个用来添加评论的接口
export function apiAddComment ({ artid, content }) {
  return myHttp({
    url: `/comments`,
    method: 'POST',
    data: {
      target: artid,
      content: content
    }
  })
}

// 封装一个用来得到评论回复的接口
export function apiGetReplay ({ commid, offset, limit }) {
  return myHttp({
    url: '/comments',
    params: {
      type: 'c',
      source: commid,
      offset: offset,
      limit: limit
    }
  })
}
