import request from '../utils/request.js'

// 获取全部频道列表
export function getChannelMethod () {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export function addUserChannels (channel) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: [channel]
  })
}

export function deleteUserChannels (id) {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/channels/' + id
  })
}
