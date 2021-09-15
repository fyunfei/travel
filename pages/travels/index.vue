<template>
  <div>
    <div ref="topic" class="topic">
      <div class="topic-bg"></div>
    </div>
    <header class="relative">
      <div class="content-header_con clearfix">
        <div class="profile rounded-full overflow-hidden">
          <img :src="userInfo.profile" alt />
        </div>
        <div class="article-info float-left">
          <h1 class="article-title">
            <!-- 东边日出西边雨｜夏日的荷兰比利时11日自由行 -->
            <p
              v-if="!editable"
              class="article-title_info"
              @click="editable = !editable"
            >
              请输入游记标题
            </p>
            <v-text-field
              v-else
              solo
              light
              background-color="#fff"
              maxlength="25"
              counter
              clearable
              placeholder="请输入游记标题"
            />
            <!-- <TravelsTitleDialog /> -->
          </h1>
        </div>
      </div>
    </header>
    <!-- 标题弹框 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      editable: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  mounted() {
    const topicEl = this.$refs.topic
    topicEl.style.height = document.documentElement.offsetWidth * 0.33 + 'px'
    window.addEventListener('resize', () => {
      topicEl.style.height = document.documentElement.offsetWidth * 0.33 + 'px'
    })
  },
}
</script>

<style lang="scss" scoped>
.topic {
  position: relative;
  height: 480px;
  overflow: hidden;
  &-bg {
    position: absolute;
    left: 0;
    right: 0;
    height: 100%;
    background-image: url('@/assets/pic/topicPic.jpg');
    background-size: cover;
  }
}
.content-header_con {
  position: relative;
  width: 1140px;
  margin: 0 auto;
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
