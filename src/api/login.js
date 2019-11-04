import request from '@/utils/request'

//获取token
export function login(username, password) {
    return request({ // Promise
        url: '/user/login',
        method: 'post',
        data: {
            username, // username: username
            password
        }
    })
}
//根据token获取用户信息
export function getUserInfo(token) {
    return request({
        url: `/user/info/${token}`,
        method: 'get'
    })
}
//退出登录
export function logout(token) {
    return request({
        url: `/user/logout`,
        method: 'post',
        data: {
            token //token: token
        }
    })
}

