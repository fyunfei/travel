<template>
  <div class="list-con w-8/12 mx-auto mt-0 bg-white bg-opacity-50 h-full">
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
  async asyncData({ $axios }) {
    const params = {
      page: 1,
      pageSize: 10,
      draft: 1,
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
      travelList,
    }
  },
}
</script>

<style lang="scss" scoped>
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
