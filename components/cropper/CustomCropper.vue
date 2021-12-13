<template>
  <v-dialog :width="conWidth" :value="value" hide-overlay persistent>
    <v-card>
      <v-card-title>
        <span class="text-h6">裁剪图片</span>
      </v-card-title>
      <v-card-text>
        <div ref="cropper" class="cropper"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#fff" :loading="loading" @click="handleCancel"
          >取消</v-btn
        >
        <v-btn
          class="login-wrap_btn"
          color="primary"
          :loading="loading"
          @click="handleConfirm"
          >保存</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
// 组价内部像外部抛出方法如下
/**
 * input v-model绑定
 * cancel 取消裁剪
 * getBlob
 */
export default {
  props: {
    ratio: {
      type: Number,
      default: 1 / 1,
    },
    value: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cropper: null,
      loading: false,
      conWidth: 850, // 裁剪范围宽度，根据图片宽高动态计算
    }
  },
  watch: {
    value(visible) {
      if (visible) {
        this.init(this.img)
      }
    },
  },
  methods: {
    init(imgUrl) {
      this.$nextTick(() => {
        const cropperCon = this.$refs.cropper
        const img = new Image()
        img.style['max-width'] = '100%'
        cropperCon.appendChild(img)
        this.cropper = this.$cropper(img, {
          aspectRatio: this.ratio,
          viewMode: 1,
          center: false,
          scalable: false,
          cropBoxResizable: false,
          zoomable: false,
          zoomOnTouch: false,
          autoCropArea: 1,
          toggleDragModeOnDblclick: false,
          dragMode: 'move',
        })
        this.cropper.replace(this.img)
      })
    },
    handleCancel() {
      this.cropper.destroy()
      this.cropper = null
      this.$emit('input', false)
      this.$emit('cancel')
    },
    handleConfirm() {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // do something
        this.cropper.destroy()
        this.cropper = null
        this.$emit('getBlob', blob)
        this.$emit('input', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.cropper {
  width: 800px;
  height: 450px;
  margin: 0 auto;
}
</style>
