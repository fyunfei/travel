<template>
  <div class="list-con w-8/12 mx-auto mt-0 bg-white bg-opacity-50 h-full">
    <div class="relative custom-tabs">
      <v-tabs v-model="type" class="travel-tabs relative" centered>
        <v-tab v-for="tab in tabList" :key="tab.value" :to="tab.url">
          {{ tab.name }}
        </v-tab>
      </v-tabs>
      <v-btn
        color="primary"
        light
        class="travel-tabs-draft"
        small
        @click="$router.push('/list/1')"
        >草稿</v-btn
      >
    </div>
    <div v-if="travelList.length">
      <ListItem
        v-for="travel in travelList"
        :key="travel.id"
        :travel="travel"
      />
      <v-pagination
        v-if="total > pageSize"
        v-model="page"
        :length="pageTotal"
      ></v-pagination>
    </div>
    <div v-else class="null-match">
      <div class="null-match_img"></div>
      <p class="null-match_info">当前还没有游记哟~</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  async asyncData({ route, store }) {
    // route type 0 1 2
    /**
     * 0 表示全部已提交
     * 1 表示草稿
     * 2 表示我的已提交游记
     */
    const { type } = route.params
    const params = {
      page: 1,
      pageSize: 10,
    }
    switch (+type) {
      case 2:
        params.mine = 1
        break
      default: {
        params.draft = +type
      }
    }
    let travelList, pageTotal, total
    try {
      const { data } = await store.dispatch('travel/getTravelList', params)
      const { page, pageSize, pageTotal: pt, total: t, list } = data.result
      params.page = +page
      params.pageSize = +pageSize
      pageTotal = +pt
      total = +t
      travelList = list
    } catch (err) {}
    return {
      ...params,
      pageTotal,
      total,
      type: +type,
      travelList,
      tabList: [
        {
          name: '全部游记',
          value: 0,
          url: '/list/0',
        },
        {
          name: '我的游记',
          value: 2,
          url: '/list/2',
        },
      ],
    }
  },
  watch: {
    async page(val) {
      const { data } = await this.getTravelList({
        page: val,
        pageSize: this.pageSize,
      })
      const { page, pageSize, pageTotal, total, list } = data.result
      this.page = +page
      this.pageSize = +pageSize
      this.pageTotal = +pageTotal
      this.total = total
      this.travelList = list
    },
  },
  methods: {
    ...mapActions({
      getTravelList: 'travel/getTravelList',
    }),
  },
}
</script>

<style lang="scss" scoped>
.travel-tabs {
  margin-top: 10px;
}
.travel-tabs-draft {
  position: absolute !important;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}
.null-match {
  width: 100%;
  height: 50%;
  margin-top: 10px;
  &_img {
    width: 100%;
    height: 100%;
    background-size: contain;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url('//image.followmyheart.cn/null_match.svg');
  }
  &_info {
    margin-top: 10px;
    font-size: 20px;
    text-align: center;
  }
}
</style>
<style>
.custom-tabs .v-tabs-slider-wrapper {
  display: none !important;
}
</style>
