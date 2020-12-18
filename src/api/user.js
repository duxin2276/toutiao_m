import request from '../utils/request.js'

// 登录请求
export function login (data) {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}

// 发送验证码
export function sendSms (mobile) {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/v1_0/user'
  })
}

// 获取用户频道列表
export function getUserChannel () {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}

// 关注用户
export function addFollow (target) {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

// 取消关注用户
export function cancelFollow (targetId) {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${targetId}`
  })
}

// 收藏文章
export function addCollect (target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/collections',
    data: {
      target
    }
  })
}

// 取消收藏文章
export function cancelCollect (targetId) {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${targetId}`
  })
}

// 对文章点赞
export function addLike (target) {
  return request({
    method: 'POST',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}

// 取消对文章点赞
export function cancelLike (targetId) {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/likings/${targetId}`
  })
}

// 获取评论或评论回复
export function getComments (params) {
  return request({
    method: 'GET',
    url: '/v1_0/comments',
    params
  })
}

// 获取用户个人资料
export function getUserProfile () {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

// 修改用户个人资料
export function updateNickname (data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}

// 修改用户头像
export function updatePhoto (data) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data
  })
}
