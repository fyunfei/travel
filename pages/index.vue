<template>
  <div>
    <div class="container-bg"></div>
    <div class="container z-10">
      <div class="w-10/12 clearfix">
        <HomeCom
          v-for="app in appList"
          :key="app.text"
          :img="app.img"
          :text="app.text"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appList: [
        {
          text: '我的计划',
          img: 'list',
        },
        {
          text: '制定计划',
          img: 'plan',
        },
        {
          text: '地图',
          img: 'map',
        },
      ],
    }
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container,
.container-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.container-bg {
  background-image: url('@/assets/svg/list_.svg');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>
