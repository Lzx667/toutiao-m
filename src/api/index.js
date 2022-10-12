
/*
    *用户登录api
 */
import { login, getSmsCode } from './user'
export const loginAPI = login // 导出用户接口api

/*
    * 获取验证码
 */
export const getSmsCodeAPI = getSmsCode
