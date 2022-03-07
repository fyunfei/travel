<template>
  <div class="list-con w-8/12 mx-auto mt-5 bg-white bg-opacity-50 h-full">
    <v-row align="center">
      <v-col :cols="6">
        <span class="text-4xl">Let's Travel!!!</span>
      </v-col>
      <v-col :cols="6" class="text-right">
        <v-btn color="primary" @click="visible = true">
          <span class="px-3">Get Started</span>
          <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="item in mainList" :key="item.id" :cols="4">
        <div class="list-con_item relative">
          <v-btn
            small
            color="primary"
            fab
            class="list-con_item__arrow"
            @click="routeTo(item)"
          >
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
          <p class="list-con_item__target">
            <span>{{ item.title }}</span>
            <v-icon color="#fff">mdi-arrow-right-bold</v-icon>
          </p>
        </div>
      </v-col>
    </v-row>
    <MainPlanDialog v-model="visible" @success="handleSuccess" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import MainPlanDialog from '@/components/plan/MainPlanDialog'
export default {
  components: {
    MainPlanDialog,
  },
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    const response = await store.dispatch('mainPlan/getMainList', {
      page: 1,
      pageSize: 10,
    })
    const { list } = response.result

    return {
      visible: false,
      mainList: list,
    }
  },
  methods: {
    ...mapActions({
      getMainList: 'mainPlan/getMainList',
    }),
    async init() {
      const response = await this.getMainList({
        page: 1,
        pageSize: 10,
      })
      const { list } = response.result
      this.mainList = list
    },
    handleSuccess() {
      this.init()
      // 列表刷新
    },
    routeTo(item) {
      this.$router.push({
        name: 'plan-sub-main',
        params: {
          main: item.id,
        },
      })
    },
  },
}
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
