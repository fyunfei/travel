<template>
  <div>
    <div ref="topic" class="topic">
      <div
        class="topic-bg"
        :style="{
          'background-image': `url(${article.banner})`,
        }"
      ></div>
    </div>
    <header class="relative">
      <div class="content-header_con w-8/12 mx-auto clearfix">
        <div class="profile rounded-full overflow-hidden">
          <img :src="article.user.profile" alt />
        </div>
        <div class="article-info float-left">
          <h1 class="article-title">
            <p class="article-title_info">
              {{ article.title || '请输入游记标题' }}
            </p>
            <!-- <TravelsTitleDialog /> -->
          </h1>
          <div class="user">
            <span class="user__name">{{ userInfo.author }}</span>
            <span class="user__level">lv.1</span>
          </div>
          <div class="user">
            <p>文章发布于：{{ visibleDate }}</p>
          </div>
        </div>
      </div>
    </header>
    <article class="mt-20 w-8/12 mx-auto" v-html="article.content"></article>
  </div>
</template>

<script>
import moment from 'moment'
import travelApi from '@/api/travelArticle'
export default {
  async asyncData({ $axios, route }) {
    const { id } = route.params
    if (id) {
      const response = await $axios.$get(travelApi.detail, { params: { id } })
      const { code, result } = response
      if (code === 200 && result)
        return {
          article: result,
        }
    }
  },
  computed: {
    userInfo() {
      return this.article.user
    },
    visibleDate() {
      return moment(this.article.createTime).format('YYYY-MM-DD')
    },
  },
  mounted() {
    const topicEl = this.$refs.topic
    // 默认0.33
    topicEl.style.height = document.documentElement.offsetWidth * 0.22 + 'px'
    window.addEventListener('resize', () => {
      topicEl.style.height = document.documentElement.offsetWidth * 0.22 + 'px'
    })
  },
}
</script>

<style lang="scss" scoped>
.topic {
  position: relative;
  height: 480px;
  overflow: hidden;
  &-bg,
  &-bg_null {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
  }
  &-bg {
    // background-image: url('@/assets/pic/topicPic.jpg');
    background-size: cover;
    background-position: center center;
  }
  &-bg_null {
    &_img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 150px;
      background-size: contain;
      background-position: center center;
      background-image: url('//image.followmyheart.cn/upload.svg');
    }
  }
}
.content-header_con {
  position: relative;
  .profile {
    position: absolute;
    top: -70px;
    width: 120px;
    height: 120px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .article-info {
    position: absolute;
    left: 150px;
    right: 0;
    .article-title {
      width: 100%;
      position: absolute;
      top: -60px;
      font-size: 26px;
      font-weight: bold;
      color: #fff;
      &_info {
        cursor: pointer;
      }
    }
  }
  .user {
    color: #ff9d00;
    font-size: 12px;
    &__level {
      color: #ea3c1a;
      font-weight: bold;
    }
  }
}
</style>
