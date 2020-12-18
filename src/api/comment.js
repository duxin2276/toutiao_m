import request from '@/utils/request.js'

// 对评论或评论回复点赞
export function addCommentLike (target) {
  return request({
    method: 'POST',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
// 取消对评论或评论回复点赞
export function cancelCommentLike (target) {
  return request({
    method: 'DELETE',
    url: `/v1_0/comment/likings/${target}`
  })
}

// 添加评论或评论回复
export function addComment (data) {
  return request({
    method: 'POST',
    url: '/v1_0/comments',
    data
  })
}
