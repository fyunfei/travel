<template>
  <div class="detail-container">
    <div ref="topic" class="topic">
      <div class="topic-bg"></div>
    </div>
    <div class="content">
      <header class="relative">
        <div class="content-header_con clearfix">
          <div class="profile rounded-full overflow-hidden">
            <img src="@/assets/pic/profile1.jpg" alt />
          </div>
          <div class="article-info float-left">
            <h1 class="article-title">
              东边日出西边雨｜夏日的荷兰比利时11日自由行
            </h1>
            <div class="user">
              <span class="user__name">亚麻空空 (上海)</span>
              <span class="user__level">LV.15</span>
              <span class="date"></span>
            </div>
          </div>
        </div>
      </header>
      <article class="article">
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
        <p>这是文章</p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    console.log(context)
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
.detail-container {
  min-width: 1140px;
}
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
.content {
  &-header_con {
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
        position: absolute;
        top: -60px;
        font-size: 26px;
        font-weight: bold;
        color: #fff;
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
  .article {
    width: 1000px;
    margin: 60px auto 20px;
    background: #fff;
  }
}
</style>
