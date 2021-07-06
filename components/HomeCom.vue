<template>
  <div class="w-4/12 mb-10 float-left cursor-pointer select-none">
    <div
      class="icon my-0 mx-auto"
      :class="`icon-${img}`"
      @click="routeTo"
    ></div>
    <p class="title text-center">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    text: String,
    path: String,
  },
  methods: {
    routeTo() {
      this.$router.push(this.path)
    },
  },
}
</script>

<style lang="scss" scoped>
$a: '.icon';
#{$a} {
  width: 100px;
  height: 100px;
  background-size: contain;
  background-position: center center;
}
#{$a}-travel {
  background-image: url('@/assets/pic/mango.png');
}
#{$a}-list {
  background-image: url('@/assets/pic/blueberry.png');
}
#{$a}-plan {
  background-image: url('@/assets/pic/cherry.png');
}
#{$a}-map {
  background-image: url('@/assets/pic/hamimelon.png');
}
.title {
  color: #222428;
}
</style>
