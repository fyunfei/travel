/*
 * @Author: fuyunfei
 * @Date: 2021-08-30 21:03:29
 * @Last Modified by: fuyunfei
 * @Last Modified time: 2021-11-23 20:40:15
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
      .catch(() => {})
  },
  updateInfo({ commit }, { $cookiz, info }) {
    return this.$axios
      .$post(UserApi.updateInfo, { ...info })
      .then((res) => {
        const { code, message, result } = res
        if (code && result) {
          for (const key in info) {
            commit('changeUserInfo', { key, value: info[key] })
            $cookiz.set(key, info[key])
          }
          return Promise.resolve(result)
        } else {
          return Promise.reject(message)
        }
      })
      .catch(() => Promise.reject(new Error('更新失败')))
  },
}
