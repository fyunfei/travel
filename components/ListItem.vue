<template>
  <div class="w-full item-con clearfix" @click="routeTo">
    <div
      v-lazy:background-image="travelBanner"
      class="item-left item-left_img float-left"
    ></div>
    <div class="item-right float-left">
      <p class="item-right_title">
        <a href="javascript:void(0)">
          {{ travel.title }}
        </a>
      </p>
      <article class="item-right_content">
        <a href="javascript:void(0)">
          {{ travel.text }}
        </a>
      </article>
      <div class="item-right_bottom clearfix">
        <div class="float-left item-right_bottom-user">
          <i class="iconfont icon-view align-middle"></i>
          <span>100</span>
        </div>
        <div class="float-right item-right_bottom-user" data-user="Victoria">
          <img :src="travel.user.profile" />
          <span>{{ travel.user.author }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    travel: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      travelBanner: {
        src: this.travel.banner,
        error: '//image.followmyheart.cn/upload.svg',
        loading: this.travel.banner
          ? `${this.travel.banner}/gauss`
          : '//image.followmyheart.cn/loading_.svg',
      },
    }
  },
  methods: {
    routeTo() {
      this.$router.push('/list/detail')
    },
  },
}
</script>

<style lang="scss" scoped>
$highlight: #ffb458;
a {
  color: #222428;
}
.item-con {
  padding: 15px;
  &:hover {
    .item-right_title a {
      color: $highlight;
    }
  }
  .item-left {
    cursor: pointer;
    width: 220px;
    height: 150px;
    margin-right: 15px;
    border-radius: 5px;
  }
  .item-left_img {
    // background-image: url('@/assets/pic/clear.jpg');
    background-size: contain;
    background-position: center center;
    background-color: rgba($color: #fff, $alpha: 0.6);
  }
  .item-right {
    position: relative;
    width: 100%;
    max-width: 1010px;
    height: 150px;
    &_title {
      font-size: 18px;
    }
    &_content {
      font-size: 14px;
    }
    &_bottom {
      position: absolute;
      right: 0;
      left: 0;
      bottom: 0;
      &-user {
        overflow: hidden;
        img {
          width: 16px;
          height: 16px;
          display: inline;
          border-radius: 50%;
          vertical-align: middle;
          object-fit: contain;
        }
        span {
          vertical-align: middle;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
