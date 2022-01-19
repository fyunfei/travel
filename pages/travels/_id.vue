<template>
  <div>
    <div ref="topic" class="topic">
      <Uploader
        :cropper="true"
        :options="options"
        :browse-opts="browseOpts"
        @change="change"
        @fileSuccess="fileSuccess"
        @uploader="getUploader"
      >
        <div
          v-if="article.banner"
          class="topic-bg"
          :style="{
            'background-image': `url(${article.banner})`,
          }"
        ></div>
        <div v-else class="topic-bg_null">
          <div class="topic-bg_null_img"></div>
        </div>
      </Uploader>
      <CustomCropper
        ref="cropper"
        v-model="cropperVisible"
        :img="cropperImg"
        :ratio="NaN"
        @cancel="cropperCancel"
        @getBlob="uploadProfile"
      />
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
              v-if="!titleEditable"
              class="article-title_info"
              @click="titleEditable = !titleEditable"
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
              @blur="titleEditable = !titleEditable"
            />
            <!-- <TravelsTitleDialog /> -->
          </h1>
        </div>
      </div>
    </header>
    <!-- 标题end -->
    <!-- 文章start -->
    <Editor
      ref="editor"
      v-model="article.content"
      :guid="guid"
      class="article-editor w-8/12 mx-auto"
    />
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
import { v4 as uuidv4 } from 'uuid'
import travelApi from '@/api/travelArticle'
import CustomCropper from '@/components/cropper/CustomCropper'
export default {
  components: {
    CustomCropper,
  },
  async asyncData({ $cookiz, $axios, route, router }) {
    const { id } = route.params
    const article = {
      title: '', // 文章标题
      content: '', // 文章内容
      text: '', // 文章纯文本内容
      banner: null, // 文章banner
    }
    let guid = uuidv4()
    if (id) {
      // 调用详情接口
      const response = await $axios.$get(travelApi.detail, { params: { id } })
      const { code, result } = response
      if (code === 200 && result) {
        const { content, title, banner, guid: RES_GUID } = result
        article.id = id
        article.content = content
        article.title = title
        article.banner = banner
        if (RES_GUID) guid = RES_GUID
        // 正则匹配banne路由guid字段
      } else {
        // console.log(result)
      }
    }
    return {
      uploader: null,
      guid, // 写游记页面guid标识
      editable: !!id,
      titleEditable: false,
      cropperVisible: false,
      cropperImg: '',
      article,
      options: {
        target: travelApi.editorUpload,
        chunkSize: 50 * 1024 * 1024,
        testChunks: false,
        headers: {
          Authorization: `Bearer ${$cookiz.get('jwt_token')}`,
        },
        query: {
          guid,
        },
      },
      browseOpts: [false, false, { accept: 'image/*' }],
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
      this.article.text = this.$refs.editor.getText()
      const API = this.editable ? travelApi.update : travelApi.write
      this.$axios
        .$post(API, { draft, guid: this.guid, ...this.article })
        .then((res) => {
          const { code, result, message } = res
          if (code === 200 && result) {
            this.$message({ type: 'success', message })
            this.$router.push(draft ? '/list/1' : '/list/2')
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
    cropperCancel() {
      this.uploader.cancel()
    },
    uploadProfile(blob) {
      const file = new File(
        [blob],
        `${this.profile.size}-${this.profile.name}`,
        {
          type: this.profile.type,
        }
      )
      file.cropper = true
      this.uploader.cancel()
      this.uploader.addFile(file)
      this.uploader.upload()
    },
    change(event, uploader) {
      const file = event.target.files[0]
      // 头像上传流程采用服务器qiniu直传
      const reader = new FileReader()
      this.profile = file
      reader.readAsDataURL(file)
      reader.onload = (e) => {
        const base64 = e.target.result
        this.cropperImg = base64
        this.cropperVisible = true
      }
    },
    getUploader(uploader) {
      this.uploader = uploader
    },
    fileSuccess({ message }) {
      const result = JSON.parse(message)
      if (result.code === 200) {
        try {
          this.$message({
            type: 'success',
            message: 'Banner上传成功',
          })
          this.article.banner = result.data[0].url
        } catch (message) {
          this.$message({
            type: 'error',
            message,
          })
        }
      }
    },
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
.article-editor {
  position: relative;
  margin-top: 50px;
  z-index: 0;
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
