<template>
  <div class="container z-10">
    <div v-if="homePageFlag" class="w-10/12 clearfix">
      <HomeCom
        v-for="app in appList"
        :key="app.text"
        :img="app.img"
        :path="app.path"
        :text="app.text"
        :profile="app.profile"
      />
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ $cookiz }) {
    const profile = $cookiz.get('profile')
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
          text: '写游记',
          img: 'travels',
          path: '/travels',
        },
        {
          text: '地图',
          img: 'map',
          path: '/map',
        },
        {
          text: '我的信息',
          img: '',
          path: `/myInfo`,
          profile,
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
