<template>
  <v-app :class="{ 'login-container': isLogin }">
    <v-app-bar v-if="!isLogin" color="#6A76AB" dark max-height="64">
      <v-app-bar-nav-icon v-if="!isHomePage" @click="backTo">
        <v-icon> mdi-arrow-left </v-icon>
      </v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn small fab class="custom float-right">
        <v-avatar size="50">
          <v-img width="50" height="50" contain :src="userInfo.profile"></v-img>
        </v-avatar>
      </v-btn>
    </v-app-bar>
    <Nuxt />
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
export default {
  middleware: ['auth'],
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    isLogin() {
      return this.$route.name === 'login'
    },
    isHomePage() {
      return this.$route.name === 'index'
    },
  },
  methods: {
    backTo() {
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  overflow-y: auto;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
.custom.v-btn {
  overflow: hidden;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 1100px;
  background-image: url('http://image.followmyheart.cn/%E7%99%BB%E5%BD%95%E8%83%8C%E6%99%AF.jpeg') !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  // background-position: center center !important;
  background-attachment: fixed !important;
  .v-application--wrap {
    justify-content: center;
    align-items: center;
  }
}
</style>
