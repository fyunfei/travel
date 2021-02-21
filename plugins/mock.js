import Mock from 'mockjs'
// eg:
Mock.mock(/\/list/, 'get', () => {
  return {
    'list|1-10': [
      {
        'id|+1': 1,
      },
    ],
  }
})
