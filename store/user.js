/*
 * @Author: fuyunfei
 * @Date: 2021-08-30 21:03:29
 * @Last Modified by: fuyunfei
 * @Last Modified time: 2021-09-02 21:23:16
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
  changeUserInfo(state, { key, value }) {
    state.userInfo[key] = value
  },
}

export const actions = {
  register() {},
  getUserInfo({ commit }, { $cookiz }) {
    return this.$axios
      .post(UserApi.userInfo)
      .then((res) => {
        const { code, result } = res.data
        if (code === 200 && result) {
          commit('setUserInfo', result)
          const { username, nickname, birth, profile, intro, address } = result
          $cookiz.set('username', username)
          $cookiz.set('nickname', nickname)
          $cookiz.set('birth', birth)
          $cookiz.set('profile', profile)
          $cookiz.set('intro', intro)
          $cookiz.set('address', address)
        }
        return Promise.resolve(result)
      })
      .catch((err) => console.log(err))
  },
}
