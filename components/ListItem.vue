<template>
  <div class="w-full item-con clearfix" @click="routeTo">
    <div class="item-left item-left_img float-left"></div>
    <div class="item-right float-right">
      <p class="item-right_title">
        <a href="javascript:void(0)">
          做无用之事，遣有涯之生，藏在古诗词中的旅行种草攻略。
        </a>
      </p>
      <article class="item-right_content">
        <a href="javascript:void(0)">
          就地过年，让我有了更多独处和沉淀下来的闲暇时光。做无用之事，遣有涯之生。这或许是疫情下，一个创业者最了一慰藉的话语，当然，这也是对于自己人生的一种答案。这一篇游记想了好久，也累...
        </a>
      </article>
      <div class="item-right_bottom clearfix">
        <div class="float-left item-right_bottom-user">
          <i class="iconfont icon-view align-middle"></i>
          <span>100</span>
        </div>
        <div class="float-right item-right_bottom-user" data-user="Victoria">
          <img src="@/assets/pic/profile.jpg" alt="Victoria" />
          <span>Victoria</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    background-image: url('@/assets/pic/clear.jpg');
    background-size: cover;
    background-position: center center;
    background-color: rgba($color: #fff, $alpha: 0.6);
  }
  .item-right {
    position: relative;
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
