import request from '@/utils/request.js'

export function getArticle (params) {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
