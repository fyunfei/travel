<template>
  <div class="login">
    <div class="login-wrap">
      <v-alert dense type="success">
        I'm a dense alert with a <strong>type</strong> of info
      </v-alert>
      <div class="login-wrap_header">
        <v-btn icon @click="$router.go(-1)">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <div class="login-wrap_tab">用户注册</div>
      </div>
      <v-form
        ref="form"
        v-model="registParam.valid"
        class="login-wrap_form"
        lazy-validation
      >
        <v-text-field
          v-model="registParam.username"
          color="#6c36ff"
          label="用户名"
          :error-messages="userError"
          @input="$v.registParam.username.$touch()"
          @blur="$v.registParam.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="registParam.nickname"
          color="#6c36ff"
          label="昵称"
          :error-messages="nickError"
          @input="$v.registParam.nickname.$touch()"
          @blur="$v.registParam.nickname.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="registParam.phone"
          color="#6c36ff"
          label="手机号"
          :error-messages="phoneError"
          @input="$v.registParam.phone.$touch()"
          @blur="$v.registParam.phone.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="registParam.password"
          color="#6c36ff"
          label="密码"
          type="password"
          :error-messages="passwordError"
          @input="$v.registParam.password.$touch()"
          @blur="$v.registParam.password.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="registParam.passwordRepeat"
          color="#6c36ff"
          label="再次输入密码"
          type="password"
          :error-messages="repeatError"
          @input="$v.registParam.passwordRepeat.$touch()"
          @blur="$v.registParam.passwordRepeat.$touch()"
        ></v-text-field>
        <v-btn
          color="#6c36ff"
          class="login-wrap_btn"
          style="width: 100%"
          dark
          @click="register"
          >注册</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
import UserApi from '@/api/user'
import placeholder from '@/config/default'
import { checkUser, checkPass } from '@/utils/check'
import { validationMixin } from 'vuelidate'
import { required, sameAs } from 'vuelidate/lib/validators'
const { userTip, phoneTip, passTip, repeatTip, nickTip } = placeholder
export default {
  mixins: [validationMixin],
  layout: 'login',
  data() {
    return {
      valid: true,
      registParam: {
        username: '',
        nickname: '',
        password: '',
        passwordRepeat: '',
        phone: '',
      },
    }
  },
  validations: {
    registParam: {
      username: {
        required,
        checkUser: (value) => {
          const result = checkUser(value)
          if (result.code === 0) {
            return true
          } else {
            return false
          }
        },
      },
      nickname: {
        required,
      },
      password: {
        required,
        checkPass: (value) => {
          const result = checkPass(value)
          if (result.code === 0) {
            return true
          } else {
            return false
          }
        },
      },
      passwordRepeat: {
        required,
        sameAsPassword: sameAs('password'),
        checkPass: (value) => {
          const result = checkPass(value)
          if (result.code === 0) {
            return true
          } else {
            return false
          }
        },
      },
      phone: {
        required,
      },
    },
  },
  computed: {
    userError() {
      const errors = []
      if (!this.$v.registParam.username.$dirty) return errors
      !this.$v.registParam.username.required && errors.push(userTip)
      !this.$v.registParam.username.checkUser &&
        errors.push('用户名由6~12位字母和数字组成')
      return errors
    },
    nickError() {
      const errors = []
      if (!this.$v.registParam.nickname.$dirty) return errors
      !this.$v.registParam.nickname.required && errors.push(nickTip)
      return errors
    },
    phoneError() {
      const errors = []
      if (!this.$v.registParam.phone.$dirty) return errors
      !this.$v.registParam.phone.required && errors.push(phoneTip)
      return errors
    },
    passwordError() {
      const errors = []
      if (!this.$v.registParam.password.$dirty) return errors
      !this.$v.registParam.password.required && errors.push(passTip)
      !this.$v.registParam.password.checkPass &&
        errors.push('密码必须包括大小写字母和数字，可以使用特殊字符长度8~16位')
      return errors
    },
    repeatError() {
      const errors = []
      if (!this.$v.registParam.passwordRepeat.$dirty) return errors
      !this.$v.registParam.password.required && errors.push('请先输入密码')
      !this.$v.registParam.passwordRepeat.required && errors.push(repeatTip)
      !this.$v.registParam.passwordRepeat.checkPass &&
        errors.push('密码必须包括大小写字母和数字，可以使用特殊字符长度8~16位')
      !this.$v.registParam.passwordRepeat.sameAsPassword &&
        errors.push('两次输入密码不一致，请重试')
      return errors
    },
  },
  mounted() {
    this.$message()
    // console.log(this.$message)
  },
  methods: {
    register() {
      const validate = this.$v.registParam
      validate.$touch()
      if (!validate.$invalid) {
        const { username, nickname, password, phone } = this.registParam
        this.$axios
          .$post(UserApi.register, {
            username,
            nickname,
            password,
            phone,
          })
          .then((res) => {
            console.log(res)
          })
          .catch(() => {})
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/variable.scss';
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  // min-width: 1100px;
  height: 100%;
  margin: 0 auto;
  .login-wrap {
    width: 400px;
    // height: 500px;
    padding: 10px;
    overflow: hidden;
    background-color: rgba($color: #fff, $alpha: 0.8);
    backdrop-filter: blur(2px);
    border-radius: 5px;
    &_header {
      display: flex;
      align-items: center;
    }
    &_form {
      padding: 10px;
    }
    &_tab {
      position: relative;
      color: #121212;
      font-weight: 600;
      line-height: 60px;
      height: 60px;
      margin-right: 24px;
      &::after {
        content: '';
        position: absolute;
        left: 0;

        bottom: 0;
        width: 100%;
        height: 3px;
        background-color: $primary;
      }
    }
    &_btn {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
