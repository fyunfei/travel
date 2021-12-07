<template>
  <div class="list-con w-8/12 mx-auto mt-0 bg-white bg-opacity-50 h-full">
    <ListItem />
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
    try {
      const result = await $axios.get(travelApi.list, { params })
      console.log(result)
    } catch (err) {}
    return {
      ...params,
    }
  },
}
</script>

<style lang="scss" scoped></style>
