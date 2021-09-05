<template>
  <div>
    <div class="w-10/12 mx-auto mt-5 flex justify-center items-center">
      <v-img
        max-width="120"
        max-height="120"
        contain
        src="http://image.followmyheart.cn/male.svg"
      ></v-img>
      <div class="w-3/12 ml-10">
        <div class="leading-10">
          <span>{{ userInfo.nickname }}</span>
          <v-btn
            class="float-right"
            fab
            small
            color="#6A76AB"
            dark
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
          color="#6c36ff"
          filled
          placeholder="快来简单介绍下自己吧！！"
        ></v-textarea>
        <v-btn
          color="#6c36ff"
          style="width: 100%"
          :loading="introLoading"
          dark
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
import UserApi from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  components: {
    NameDialog,
  },
  async asyncData(ctx) {
    const { store } = ctx
    const result = {}
    try {
      const userInfo = await store.dispatch('user/getUserInfo', ctx)
      result.userInfo = userInfo
    } catch (err) {
      result.userInfo = {}
    }
    return {
      intro: '', // 双向绑定个性签名，如果第一次保存时未做任何修改不触发请求
      editable: false,
      nameVisible: false,
      introLoading: false,
      ...result,
    }
  },
  methods: {
    ...mapMutations({
      changeUserInfo: 'user/changeUserInfo',
    }),
    showTextArea() {
      this.editable = true
      this.intro = this.userInfo.intro
    },
    showNameDialog() {
      this.nameVisible = true
    },
    saveIntro() {
      if (this.userInfo.intro !== this.intro) {
        this.introLoading = true
        this.$axios
          .$post(UserApi.updateInfo, {
            intro: this.userInfo.intro,
          })
          .then((res) => {
            const { code, message, result } = res
            this.editable = false
            this.introLoading = false
            if (code && result) {
              this.$message({
                type: 'success',
                message: '签名更新成功',
              })
              this.changeUserInfo({
                key: 'intro',
                value: this.intro,
              })
            } else {
              this.$message({
                type: 'error',
                message,
              })
            }
          })
          .catch(() => {
            this.$message({
              type: 'error',
              message: '更新失败',
            })
          })
      } else {
        this.editable = false
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
    background-image: url('../../assets/pic/ico_sprite.png');
  }
}
</style>
