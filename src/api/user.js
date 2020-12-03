import request from '../utils/request.js'

// 登录请求
export function login (data) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}

// 发送验证码
export function sendSms (mobile) {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息
export function getUserInfo () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

// 获取用户频道列表
export function getUserChannel () {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
