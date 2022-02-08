<template>
  <!-- 首页应用图标 -->
  <div
    :class="{ shake: shaked }"
    class="w-4/12 mb-10 float-left cursor-pointer select-none"
  >
    <nuxt-link :to="path">
      <div
        class="icon my-0 mx-auto"
        :class="img ? `icon-${img}` : ''"
        @mouseover="shaked = true"
      >
        <v-avatar v-if="profile" size="100">
          <v-img
            max-width="120"
            max-height="120"
            contain
            :src="profile"
          ></v-img>
        </v-avatar>
      </div>
    </nuxt-link>

    <p class="title text-center">{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    img: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    profile: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      shaked: false,
    }
  },
  methods: {
    routeTo() {
      this.$router.push(this.path)
    },
  },
}
</script>

<style lang="scss" scoped>
$a: '.icon';
$types: 'travel', 'list', 'plan', 'map', 'male', 'female', 'travels';
#{$a} {
  width: 100px;
  height: 100px;
  background-size: contain;
  background-position: center center;
}
@each $type in $types {
  #{$a}-#{$type} {
    background-image: url('http://image.followmyheart.cn/#{$type}.svg');
  }
}
.title {
  color: #222428;
}
.shake {
  animation: shake 2s ease 1;
}
@keyframes shake {
  0% {
    transform: rotate(0) scale(0.8);
  }
  100% {
    transform: rotate(0) scale(1);
  }
  10% {
    transform: rotate(2deg) scale(1);
  }
  15%,
  25%,
  35% {
    transform: rotate(-4deg);
  }
  20%,
  30%,
  40% {
    transform: rotate(4deg);
  }
  45% {
    transform: rotate(-2deg);
  }
  50% {
    transform: rotate(2deg);
  }
  55%,
  90% {
    transform: rotate(0deg);
  }
}
</style>
