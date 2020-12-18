import request from '../utils/request.js'

// 搜索建议请求
export function getSuggestions (q) {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}

// 搜索结果
export function getResults (params) {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
