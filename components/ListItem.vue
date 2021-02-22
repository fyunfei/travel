<template>
  <div class="w-full item-con clearfix">
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
      <div class="item-right_bottom"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
a {
  color: #222428;
}
.item-con {
  padding: 15px;
  &:hover {
    .item-right_title a {
      color: #ff9d00;
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
    background-size: contain;
    background-position: center center;
    background-color: rgba($color: #fff, $alpha: 0.6);
  }
  .item-right {
    position: relative;
    max-width: 1010px;

    &_title {
      font-size: 18px;
    }
    &_content {
      font-size: 14px;
    }
  }
}
</style>
