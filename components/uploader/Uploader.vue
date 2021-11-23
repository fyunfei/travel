<template>
  <div ref="uploader" class="uploader">
    <slot />
  </div>
</template>

<script>
import Uploader from 'simple-uploader.js'
export default {
  props: {
    cropper: {
      // 是否为裁剪模式，裁剪模式需要设置为true否则会同时出发FileAdded事件
      type: Boolean,
      default: false,
    },
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
    this.uploader.on('change', (event) => {
      this.$emit('change', event, this.uploader)
    })
    this.uploader.on('fileAdded', (file) => {
      if (this.cropper && !file.file.cropper) {
        return false
      }
      this.$emit('fileAdded', file, this.uploader)
    })
    this.uploader.on('filesSubmitted', (file) => {
      this.$emit('filesSubmitted', file, this.uploader)
    })
    this.uploader.on('fileSuccess', (rootFile, file, message, chunk) => {
      this.$emit('fileSuccess', { rootFile, file, message, chunk })
    })
    this.$emit('uploader', this.uploader)
  },
}
</script>

<style lang="scss" scoped>
.uploader {
  cursor: pointer;
}
</style>
