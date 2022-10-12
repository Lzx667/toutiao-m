/*
    *用户相关的请求模块
 */
import request from '@/utils/request'
/*
    *登录模块
 */
export const login = (data) => request({
  url: '/app/v1_0/authorizations',
  method: 'post',
  data
})

/*
    *获取验证码--一分钟只能发一次
    !该接口不可用
 */
export const getSmsCode = mobile => request({
  method: 'get',
  url: `/app/v1_0/sms/codes/${mobile}`
})
