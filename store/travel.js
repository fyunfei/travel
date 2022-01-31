import travelApi from '@/api/travelArticle'
export const actions = {
  // 获取邮寄详情
  getTravelDetail(store, params) {
    return this.$axios
      .$get(travelApi.detail, { params })
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  // 更新游记内容
  updateDetail(store, data) {
    return this.$axios
      .$post(travelApi.update, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  // 添加游记
  addTravel(store, data) {
    return this.$axios
      .$post(travelApi.write, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  // 获取游记列表
  getTravelList(store, params) {
    return this.$axios
      .$get(travelApi.list, { params })
      .then((response) => {
        return Promise.resolve(response)
      })
      .catch((err) => Promise.reject(err))
  },
}
