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
    img: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
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
$types: 'travel', 'list', 'plan', 'map', 'male', 'female';
#{$a} {
  width: 100px;
  height: 100px;
  background-size: contain;
  background-position: center center;
}
@each $type in $types {
  #{$a}-#{$type} {
    background-image: url('http://image.followmyheart.cn/#{$type}.svg');
  }
}
.title {
  color: #222428;
}
</style>
