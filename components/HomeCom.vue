<template>
  <div class="w-4/12 mb-10 float-left cursor-pointer select-none">
    <div class="icon rounded-full my-0 mx-auto" :class="`icon-${img}`"></div>
    <p class="title text-center">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    img: String,
    text: String,
  },
}
</script>

<style>
.icon {
  width: 100px;
  height: 100px;
  background-size: contain;
}
.icon-list {
  background-image: url('@/assets/svg/list.svg');
}
.icon-plan {
  background-position: -5px 6px;
  background-image: url('@/assets/svg/plan.svg');
}
.icon-map {
  background-image: url('@/assets/svg/map.svg');
}
</style>
