<template>
  <div>
    <div ref="topic" class="topic">
      <div class="topic-bg"></div>
    </div>
    <!-- 标题start -->
    <header class="relative">
      <div class="content-header_con w-8/12 mx-auto clearfix">
        <div class="profile rounded-full overflow-hidden">
          <img :src="userInfo.profile" alt />
        </div>
        <div class="article-info float-left">
          <h1 class="article-title">
            <p
              v-if="!editable"
              class="article-title_info"
              @click="editable = !editable"
            >
              {{ article.title || '请输入游记标题' }}
            </p>
            <v-text-field
              v-else
              v-model.trim="article.title"
              solo
              light
              autofocus
              background-color="#fff"
              maxlength="25"
              counter
              clearable
              placeholder="请输入游记标题"
              @blur="editable = !editable"
            />
            <!-- <TravelsTitleDialog /> -->
          </h1>
        </div>
      </div>
    </header>
    <!-- 标题end -->
    <!-- 文章start -->
    <Editor v-model="article.content" class="article-editor w-8/12 mx-auto" />
    <!-- 文章end -->
    <!-- 发布按钮 -->
    <transition name="translate">
      <div v-if="actionBtnVisible" class="publish">
        <v-row class="mb-6">
          <v-btn color="primary" min-width="120" @click="publish(1)">
            存草稿
            <v-icon>description</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-btn color="primary" min-width="120" @click="publish()">
            发布文章
            <v-icon>edit</v-icon>
          </v-btn>
        </v-row>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ArticleApi from '@/api/travelArticle'
export default {
  data() {
    return {
      editable: false,
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
      },
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    actionBtnVisible() {
      return this.article.title || this.article.content
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
  methods: {
    publish(draft = 0) {
      this.$axios
        .$post(ArticleApi.write, { draft, ...this.article })
        .then((res) => {
          const { code, result, message } = res
          if (code === 200 && result) {
            this.$message({ type: 'success', message })
            this.$router.push('/list')
          } else {
            this.$message({ type: 'error', message })
          }
        })
        .catch(() => {
          this.$message({
            type: 'error',
            message: `游记${this.article.draft ? '保存' : '发布'}失败`,
          })
        })
    },
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
    background-position: center center;
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
.article-editor {
  position: relative;
  margin-top: 50px;
}
.publish {
  position: fixed;
  right: 20px;
  bottom: 50px;
}

.translate-enter-active,
.translate-leave-active {
  transform: translate3d(0, 0, 0);
  transition: all 300ms ease;
}
.translate-enter,
.translate-leave-to {
  transform: translate3d(200px, 0, 0);
}
</style>
