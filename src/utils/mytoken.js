// 存储token
export function setLocal (key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

// 取出token
export function getLocal (key) {
  return JSON.parse(window.localStorage.getItem(key))
}

// 删除token
export function removeLocal (key) {
  window.localStorage.removeItem(key)
}
