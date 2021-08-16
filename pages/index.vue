<template>
  <div class="container z-10">
    <div v-if="homePageFlag" class="w-10/12 clearfix">
      <HomeCom
        v-for="app in appList"
        :key="app.text"
        :img="app.img"
        :path="app.path"
        :text="app.text"
      />
    </div>
    <nuxt-child v-else></nuxt-child>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appList: [
        {
          text: '游记',
          img: 'travel',
          path: '/list',
        },
        {
          text: '我的计划',
          img: 'list',
          path: '/planList',
        },
        {
          text: '制定计划',
          img: 'plan',
          path: '/plan',
        },
        {
          text: '地图',
          img: 'map',
          path: '/map',
        },
        {
          text: '我的信息',
          img: 'male',
          path: '/user',
        },
      ],
    }
  },
  computed: {
    homePageFlag() {
      return this.$route.fullPath === '/'
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
