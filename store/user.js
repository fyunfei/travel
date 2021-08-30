/*
 * @Author: fuyunfei
 * @Date: 2021-08-30 21:03:29
 * @Last Modified by: fuyunfei
 * @Last Modified time: 2021-08-30 21:54:26
 */
import UserApi from '@/api/user'

export const state = () => ({
  userInfo: {
    username: '',
    nickname: '',
    birth: null,
    profile: null,
    intro: null,
    address: null,
  },
})

export const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  },
}

export const actions = {
  register() {},
  getUserInfo({ commit }) {
    return this.$axios
      .post(UserApi.userInfo)
      .then((res) => {
        const { code, result } = res.data
        if (code === 200 && result) {
          commit('setUserInfo', result)
        }
        return Promise.resolve()
      })
      .catch((err) => console.log(err))
  },
}
