<template>
  <div ref="uploader">
    <slot />
  </div>
</template>

<script>
import Uploader from 'simple-uploader.js'
export default {
  props: {
    // 文档https://github.com/simple-uploader/Uploader/blob/develop/README_zh-CN.md
    options: {
      type: Object,
      default: () => ({}),
    },
    browseOpts: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      uploader: null,
    }
  },
  mounted() {
    this.uploader = new Uploader(this.options)
    this.uploader.assignBrowse(this.$refs.uploader, ...this.browseOpts)
  },
}
</script>

<style lang="scss" scoped></style>
