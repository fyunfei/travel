import subPlan from '@/api/subPlan'
export const actions = {
  insertSubPlan(store, data) {
    return this.$axios
      .$post(subPlan.insert, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  getSubDetail(store, params) {
    return this.$axios
      .$post(subPlan.detail, { params })
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  updateSubPlan(store, data) {
    return this.$axios
      .$post(subPlan.update, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  deleteSubPlan(store, data) {
    return this.$axios
      .$post(subPlan.delete, data)
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
  getSubList(store, params) {
    this.$axios
      .$post(subPlan.insert, { params })
      .then((response) => Promise.resolve(response))
      .catch((err) => Promise.reject(err))
  },
}
