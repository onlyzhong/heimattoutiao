import myHttp from '../utils/myhttp.js'

// 封装一个输入联想的方法
export function apiThink (key) {
  return myHttp({
    // url: '/suggestion?q=' + key,
    url: `/suggestion?q=${key}`,
    method: 'GET'
  })
}

// 封装一个搜索数据的方法
export function apiSearch ({
  page,
  perPage,
  key
}) {
  return myHttp({
    url: '/search',
    method: 'GET',
    params: {
      page: page, // 页码
      per_page: perPage, // 页容量
      q: key // 搜索的关键字
    }
  })
}
