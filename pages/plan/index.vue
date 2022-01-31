<template>
  <div class="list-con w-8/12 mx-auto mt-5 bg-white bg-opacity-50 h-full">
    <v-row align="center">
      <v-col :cols="6">
        <span class="text-4xl">Let's Travel!!!</span>
      </v-col>
      <v-col :cols="6" class="text-right">
        <v-btn color="primary">
          <span class="px-3">Get Started</span>
          <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="4" v-for="i in 10" :key="i">
        <div class="list-con_item relative">
          <v-btn small color="primary" fab class="list-con_item__arrow">
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <p class="list-con_item__target">
            <span>测试152</span>
            <v-icon color="#fff">mdi-arrow-right-bold</v-icon>
          </p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.list-con_item {
  width: 300px;
  height: 400px;
  margin: 0 auto;
  border-radius: 15px;
  background-image: url('@/assets/pic/topicPic.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  &__arrow {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  &__target {
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    font-weight: bold;
    color: #fff;
    text-align: center;
  }
}
</style>
