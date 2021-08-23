import qs from 'qs'
export default function ({ $axios, redirect }) {
  // const api = $axios.create()
  $axios.setHeader('Content-Type', 'application/x-www-form-urlencoded', [
    'post',
  ])
  $axios.onRequest((config) => {
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
  })
  $axios.onResponse((response) => {
    // console.log(response)
  })
  $axios.onError((err) => {
    const { response, toJSON } = err
    const status = response && response.status
    const error = toJSON && toJSON()
    console.log(error)
    switch (status) {
      default:
        console.log('有一些错误存在')
        // console.log(status)
        break
    }
  })
}
