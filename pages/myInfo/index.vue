<template>
  <div>
    <div class="w-10/12 mx-auto mt-5 flex justify-center items-center">
      <Uploader
        :cropper="true"
        :options="options"
        :browse-opts="browseOpts"
        @change="change"
        @fileSuccess="fileSuccess"
        @uploader="getUploader"
      >
        <v-avatar size="100">
          <v-img
            max-width="120"
            max-height="120"
            contain
            :src="userInfo.profile"
          ></v-img>
        </v-avatar>
      </Uploader>
      <CustomCropper
        ref="cropper"
        v-model="cropperVisible"
        :img="cropperImg"
        @cancel="cropperCancel"
        @getBlob="uploadProfile"
      />
      <div class="w-3/12 ml-10">
        <div class="leading-10">
          <span>{{ userInfo.nickname }}</span>
          <v-btn
            class="float-right"
            fab
            small
            color="primary"
            @click="showNameDialog"
          >
            <v-icon dark>mdi-wrench</v-icon>
          </v-btn>
        </div>
        <div class="flex font-semibold leading-4">
          <p>11篇游记</p>
        </div>
      </div>
    </div>
    <div class="w-3/12 mx-auto mt-5 person-info leading-6">
      <span>我住在</span>
      <strong class="person-info-common">
        <v-icon>mdi-map-marker-outline</v-icon>青岛市
      </strong>
      <span>,</span>
      <span>我去过</span>
      <strong class="person-info-common">这里那里</strong>
      <span>,</span>
      <span>在这里我关注了</span>
      <strong class="person-info-common">
        <v-icon>mdi-account-supervisor-outline</v-icon>32
      </strong>
      <span>个小伙伴</span>
      <span>,</span>
      <span>同时有</span>
      <strong class="person-info-common">
        <v-icon>mdi-account-supervisor-outline</v-icon>15
      </strong>
      <span>个小伙伴关注了我</span>
      <span>...</span>
    </div>
    <div class="w-3/12 mx-auto mt-5">
      <div v-if="!editable" class="intro" @click="showTextArea">
        <pre class="intro_content">{{
          userInfo.intro || '快来简单介绍下自己吧！！'
        }}</pre>
      </div>
      <div v-else>
        <v-textarea
          v-model.trim="intro"
          label="个人简介"
          auto-grow
          filled
          placeholder="快来简单介绍下自己吧！！"
        ></v-textarea>
        <v-btn
          style="width: 100%"
          :loading="introLoading"
          color="primary"
          :disabled="introLoading"
          @click="saveIntro"
          >保存</v-btn
        >
      </div>
    </div>
    <NameDialog v-model="nameVisible" />
  </div>
</template>

<script>
import NameDialog from '@/components/myInfo/NameDialog'
import CustomCropper from '@/components/cropper/CustomCropper'
import { mapMutations, mapActions } from 'vuex'
export default {
  components: {
    NameDialog,
    CustomCropper,
  },
  async asyncData(ctx) {
    const { store, $cookiz } = ctx
    const result = {}
    try {
      const userInfo = await store.dispatch('user/getUserInfo', ctx)
      result.userInfo = userInfo
    } catch (err) {
      result.userInfo = {}
    }
    return {
      intro: '', // 双向绑定个性签名，如果第一次保存时未做任何修改不触发请求
      cropperImg: '',
      uploader: null,
      profile: null, // 头像文件实例
      editable: false,
      nameVisible: false,
      cropperVisible: false,
      introLoading: false,
      options: {
        target: '/api/upload/profile',
        chunkSize: 1024 * 1024,
        testChunks: false,
        headers: {
          Authorization: `Bearer ${$cookiz.get('jwt_token')}`,
        },
      },
      browseOpts: [false, false, { accept: 'image/*' }],
      ...result,
    }
  },
  // c971d385-b6ab-4c8b-a29d-8c86c30c6836
  methods: {
    ...mapMutations({
      changeUserInfo: 'user/changeUserInfo',
    }),
    ...mapActions({ updateInfo: 'user/updateInfo' }),
    showTextArea() {
      this.editable = true
      this.intro = this.userInfo.intro
    },
    showNameDialog() {
      this.nameVisible = true
    },
    async saveIntro() {
      if (this.userInfo.intro !== this.intro) {
        this.introLoading = true
        try {
          await this.updateInfo({
            $cookiz: this.$cookiz,
            info: {
              intro: this.intro,
            },
          })
          this.$message({
            type: 'success',
            message: '签名更新成功',
          })
        } catch (message) {
          this.$message({
            type: 'error',
            message,
          })
        }
        this.editable = false
        this.introLoading = false
      } else {
        this.editable = false
      }
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
    cropperCancel() {
      this.uploader.cancel()
    },
    uploadProfile(blob) {
      const file = new File([blob], this.profile.name, {
        type: this.profile.type,
      })
      file.cropper = true
      this.uploader.cancel()
      this.uploader.addFile(file)
      this.uploader.upload()
      // 触发upload接口请求
    },
    async fileSuccess({ message }) {
      const result = JSON.parse(message)
      if (result.code === 200) {
        try {
          await this.updateInfo({
            $cookiz: this.$cookiz,
            info: {
              profile: result.result,
            },
          })
          this.$message({
            type: 'success',
            message: '头像上传成功',
          })
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
.person-info {
  &-common {
    vertical-align: middle;
  }
}
.intro {
  cursor: pointer;
  position: relative;
  padding: 0 10px 0 10px;
  &_content {
    white-space: normal;
  }
  &::before {
    left: 0;
    top: 5px;
    background-position: -18px -257px;
  }
  &::after {
    right: 0;
    bottom: 12px;
    background-position: -26px -257px;
  }
  &::before,
  &::after {
    content: '';
    display: block;
    width: 8px;
    height: 6px;
    position: absolute;
    background-image: url('@/assets/pic/ico_sprite.png');
  }
}
</style>
