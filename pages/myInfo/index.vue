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
        <pre class="intro_content">这里是自我介绍</pre>
      </div>
      <div v-else>
        <v-textarea
          label="个人简介"
          auto-grow
          color="#6c36ff"
          filled
          placeholder="快来简单介绍下自己吧！！"
        ></v-textarea>
        <v-btn color="#6c36ff" style="width: 100%" dark @click="saveIntro"
          >保存</v-btn
        >
      </div>
    </div>
    <NameDialog v-model="nameVisible" />
  </div>
</template>

<script>
import NameDialog from '@/components/myInfo/NameDialog'
export default {
  components: {
    NameDialog,
  },
  async asyncData(ctx) {
    const { store } = ctx
    /* const username = $cookiz.get('username')
    const nickname = $cookiz.get('nickname')
    const birth = $cookiz.get('birth')
    const profile = $cookiz.get('profile')
    const intro = $cookiz.get('intro')
    const address = $cookiz.get('address')
    let userInfo
    if (username && nickname) {
      userInfo = {
        username,
        nickname,
        birth,
        profile,
        intro,
        address,
      }
    } */
    const result = {}
    try {
      const userInfo = await store.dispatch('user/getUserInfo', ctx)
      result.userInfo = userInfo
    } catch (err) {
      result.userInfo = {}
    }
    return {
      editable: false,
      nameVisible: false,
      ...result,
    }
  },
  methods: {
    showTextArea() {
      this.editable = true
    },
    showNameDialog() {
      this.nameVisible = true
    },
    saveIntro() {
      this.editable = false
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
