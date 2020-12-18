import request from '@/utils/request.js'

export function getArticle (params) {
  return request({
    method: 'GET',
    url: '/v1_1/articles',
    params
  })
}
// 获取新闻文章详情
export function getArticleInfo (id) {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${id}`
  })
}
