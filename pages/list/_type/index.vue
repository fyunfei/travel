<template>
  <div class="list-con w-8/12 mx-auto mt-0 bg-white bg-opacity-50 h-full">
    <div class="relative custom-tabs">
      <v-tabs v-model="type" class="travel-tabs relative" centered>
        <v-tab v-for="tab in tabList" :key="tab.value" :to="tab.url">{{
          tab.name
        }}</v-tab>
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
    </div>
    <div v-else class="null-match">
      <div class="null-match_img"></div>
      <p class="null-match_info">当前还没有游记哟~</p>
    </div>
  </div>
</template>

<script>
import travelApi from '@/api/travelArticle'
export default {
  async asyncData({ $axios, route }) {
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
    let travelList
    try {
      const { data } = await $axios.get(travelApi.list, { params })
      const { result } = data
      params.page = +result.page
      params.pageSize = +result.pageSize
      travelList = result.list
    } catch (err) {}
    return {
      ...params,
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
