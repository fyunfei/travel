import mainPlan from '@/api/mainPlan'
export const actions = {
  insertMainPlan(store, data) {
    return this.$axios
      .$post(mainPlan.insert, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  getMainDetail(store, params) {
    return this.$axios
      .$post(mainPlan.detail, { params })
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  updateMainPlan(store, data) {
    return this.$axios
      .$post(mainPlan.update, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  deleteMainPlan(store, data) {
    return this.$axios
      .$post(mainPlan.delete, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  getMainList(store, params) {
    this.$axios
      .$post(mainPlan.insert, { params })
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
}
