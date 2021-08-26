export default function ({ redirect, app }) {
  // redirect('/inspire')
  const { $cookiz } = app
  const isAuth = !!$cookiz.get('jwt_token')
  if (!isAuth) {
    redirect('/login')
  }
  // console.log(redirect)
  // console.log('middleware')
}
