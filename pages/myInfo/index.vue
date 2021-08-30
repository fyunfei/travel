<template>
  <div>
    <div class="w-10/12 mx-auto mt-5 flex justify-center items-center">
      <v-img
        max-width="120"
        max-height="120"
        contain
        src="http://image.followmyheart.cn/male.svg"
      ></v-img>
      <div class="w-3/12 ml-10">
        <div>
          <span>{{ 'userInfo.nickname' }}</span>
          <v-btn class="float-right" fab small color="#6A76AB" dark>
            <v-icon dark>mdi-wrench</v-icon>
          </v-btn>
        </div>
        <div class="flex font-semibold leading-4">
          <p>11篇游记</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    const { userInfo } = store.state.user
    // console.log(userInfo)
    return {
      userInfo,
    }
  },
}
</script>

<style lang="scss" scoped></style>
