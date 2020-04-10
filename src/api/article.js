// 用来封装所有与文章相关的网络请求
import myHttp from '../utils/myhttp'

// 封装一个得到频道下文章的接口
export function apiGetArticleList ({
  channelid,
  timestamp
}) {
  return myHttp({
    // 由于这个地址与原本配置的基地址不同，如果需要覆盖，只需要把路径写全
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    method: 'GET',
    // query 的意思是将参数放到请求路由后面以 ? 隔开，多个参数之间用 &分割
    params: {
      channel_id: channelid,
      timestamp: timestamp,
      with_top: 0 // 请求时不包含置顶的数据
    }
  })
}

// 封装一个将文章标记为不喜欢的方法
export function apiDisLike (target) {
  return myHttp({
    url: '/article/dislikes',
    method: 'POST',
    data: {
      target
    }
  })
}

// 封装个举报文章的接口
export function apiReport ({
  artid,
  type
}) {
  return myHttp({
    url: '/article/reports',
    method: 'POST',
    data: {
      target: artid,
      type
    }
  })
}
