<template>
  <v-app light class="login-container">
    <Nuxt />
  </v-app>
</template>

<script>
export default {}
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
