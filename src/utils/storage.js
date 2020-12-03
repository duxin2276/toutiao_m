// 获取数据
export function setItem (key, value) {
  // 判断是否是个对象 将对象装换成json字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // 存入本地存储
  window.localStorage.setItem(key, value)
}
// 得到数据
export function getItem (key) {
  // 去除数据  判断是否获取到  获取到后将这个json字符串转换为对象
  // 如果不存在 否则返回为空
  return window.localStorage.getItem(key)
    ? JSON.parse(window.localStorage.getItem(key)) : null
}
// 删除数据
export function removeItem (key) {
  window.localStorage.removeItem(key)
}
