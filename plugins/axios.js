import qs from 'qs'
export default function ({ $axios, $cookiz, redirect }) {
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post',
  ])
  $axios.onRequest((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    const urlReg = /\/api\/user\/(register|login)/
    if (!urlReg.test(config.url)) {
      const token = $cookiz.get('jwt_token')
      $axios.setToken(`Bearer ${token}`)
    }
  })
  $axios.onResponse((response) => {
    // console.log(response)
    // console.log(response)
  })
  $axios.onError((err) => {
    const { response } = err
    const status = response && response.status
    switch (+status) {
      case 401:
        redirect('/login')
        break
      /* default:
          redirect('/login')
          console.log('有一些错误存在')
          // console.log(status)
          return */
    }
    return Promise.resolve(true)
    /* const error = err.toJSON && err.toJSON()
    console.log(error) */
  })
}
