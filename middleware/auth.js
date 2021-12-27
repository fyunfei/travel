export default async function (ctx) {
  const { redirect, app, store } = ctx
  // redirect('/inspire')
  const { $cookiz } = app
  const isAuth = !!$cookiz.get('jwt_token')
  if (!isAuth) {
    redirect('/login')
  } else {
    // 用户登录成功后会将个人信息保存在cookie中，所以需要判断cookie是否存在，
    // 如果不存在则需要重新请求个人信息接口
    const userInfo = {
      profile: null,
      birth: null,
      address: null,
      intro: null,
      nickname: null,
      username: null,
    }
    const infoKey = Object.keys(userInfo)
    let dataEnough = true
    for (const key of infoKey) {
      userInfo[key] = $cookiz.get(key)
      if (userInfo[key] === undefined) dataEnough = false
    }
    if (!dataEnough) {
      await store.dispatch('user/getUserInfo', ctx)
    } else {
      store.commit('user/setUserInfo', userInfo)
    }
  }
}
