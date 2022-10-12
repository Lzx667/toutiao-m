/*
   * 封装 axios 请求模块
 */
import axios from 'axios'
axios.defaults.baseURL = 'http://api-toutiao-web.itheima.net'
const request = axios

// const request = axios.create({
//   baseURL: "http://ttapi.research.itcast.cn"
// })
export default request
