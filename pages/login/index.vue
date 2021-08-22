<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-wrap_header">
        <div class="login-wrap_tab">密码登录</div>
      </div>
      <v-form
        ref="form"
        v-model="valid"
        class="login-wrap_form"
        lazy-validation
      >
        <v-text-field
          v-model="param.username"
          color="#6c36ff"
          label="用户名"
        ></v-text-field>
        <v-text-field
          v-model="param.password"
          color="#6c36ff"
          label="密码"
          type="password"
        ></v-text-field>
        <div class="login-wrap_reg">
          <a
            href="javascript:void(0)"
            class="register"
            @click="$router.push('/register')"
            >注册账号</a
          >
        </div>
        <v-btn color="#6c36ff" class="login-wrap_btn" style="width: 100%" dark
          >登录</v-btn
        >
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      valid: true,
      param: {
        username: '',
        password: '',
      },
    }
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
