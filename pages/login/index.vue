<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap_header">
        <div class="login-wrap_tab">密码登录</div>
      </div>
      <v-form
        ref="form"
        v-model="params.valid"
        class="login-wrap_form"
        lazy-validation
      >
        <v-text-field
          v-model="params.username"
          label="用户名"
          :error-messages="userError"
          @input="$v.params.username.$touch()"
          @blur="$v.params.username.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="params.password"
          label="密码"
          type="password"
          :error-messages="passwordError"
          @input="$v.params.password.$touch()"
          @blur="$v.params.password.$touch()"
        ></v-text-field>
        <div class="login-wrap_reg">
          <a
            href="javascript:void(0)"
            class="register"
            @click="$router.push('/register')"
            >注册账号</a
          >
        </div>
        <v-btn
          class="login-wrap_btn"
          dark
          color="primary"
          :loading="loading"
          @click="login"
          >登录</v-btn
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
import { required } from 'vuelidate/lib/validators'
const { userTip, passTip } = placeholder
export default {
  mixins: [validationMixin],
  data() {
    return {
      loading: false,
      params: {
        username: '',
        password: '',
      },
    }
  },
  validations: {
    params: {
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
    },
  },
  computed: {
    userError() {
      const errors = []
      if (!this.$v.params.username.$dirty) return errors
      !this.$v.params.username.required && errors.push(userTip)
      !this.$v.params.username.checkUser &&
        errors.push('用户名由6~12位字母和数字组成')
      return errors
    },
    passwordError() {
      const errors = []
      if (!this.$v.params.password.$dirty) return errors
      !this.$v.params.password.required && errors.push(passTip)
      !this.$v.params.password.checkPass &&
        errors.push('密码必须包括大小写字母和数字，可以使用特殊字符长度8~16位')
      return errors
    },
  },
  methods: {
    login() {
      const validate = this.$v.params
      validate.$touch()
      if (!validate.$invalid) {
        this.loading = true
        const { username, password } = this.params
        this.$axios
          .$post(UserApi.login, {
            username,
            password,
          })
          .then((res) => {
            this.loading = false
            const { code, message, result } = res
            if (code === 200 && result) {
              this.$message({ type: 'success', message: '登录成功' })
              this.$cookiz.set('jwt_token', result, {
                maxAge: 60 * 60 * 24 * 7 * 1000,
              })
              this.$router.push('/')
            } else {
              this.$message({ type: 'error', message })
            }
          })
          .catch(() => {
            this.loading = false
            this.$message({ type: 'error', message: '登录失败，请重试' })
          })
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
    &_reg {
      margin-bottom: 20px;
      text-align: right;
      color: $primary;
      .register {
        color: $primary;
      }
    }
    &_btn {
      width: 100%;
      margin-bottom: 20px;
    }
  }
}
</style>
