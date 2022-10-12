import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: {
    // 获取本地token
    userToken: getItem('user')
  },
  mutations: {
    changeUserToken (state, userToken) {
      state.userToken = userToken
      // 将token存入本地
      setItem('user', userToken)
    }
  },
  actions: {

  },
  getters: {

  }
}
