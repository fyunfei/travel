// 用户名由密码

export const checkUser = (value) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
  if (reg.test(value)) {
    return {
      code: 0,
      message: '',
    }
  } else {
    return {
      code: 1,
      message: '用户名由6~12位字母和数字组成',
    }
  }
}
// 密码必须包括大小写字母和数字，可以使用特殊字符长度8-16
export const checkPass = (value) => {
  const reg = /^(?=.*\d)(?=.*[A-Z])[a-zA-Z0-9~!@#$%^&*.]{8,16}$/
  if (reg.test(value)) {
    return {
      code: 0,
      message: '',
    }
  } else {
    return {
      code: 1,
      message: '密码必须包括大小写字母和数字，可以使用特殊字符长度8~16位',
    }
  }
}
