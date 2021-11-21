<template>
  <v-dialog :width="conWidth" :value="value" hide-overlay persistent>
    <v-card>
      <v-card-title>
        <span class="text-h6">裁剪图片</span>
      </v-card-title>
      <v-card-text>
        <div
          ref="cropperContainer"
          class="cropper-container"
          style="width: 500px"
        >
          <client-only>
            <VueCropper
              ref="cropper"
              :img="img"
              :auto-crop="true"
              :can-scale="false"
              :original="false"
              max-img-size="800"
              :center-box="true"
              :fixed="true"
              :fixed-number="[1, 1]"
            />
          </client-only>
        </div>
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
      loading: false,
      conWidth: 0, // 裁剪范围宽度，根据图片宽高动态计算
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
      const target = new Image()
      target.src = imgUrl
      target.onload = () => {
        const ele = this.$refs.cropperContainer
        ele.style.width = target.width > 500 ? '500px' : `${target.width}px`
        ele.style.height = target.height > 500 ? '500px' : `${target.height}px`
        this.conWidth = target.width + 200
      }
    },
    handleCancel() {
      this.$emit('input', false)
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$refs.cropper.getCropBlob((data) => {
        // do something
        this.$emit('getBlob', data)
        this.$emit('input', false)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.cropper-container {
  margin: 0 auto;
}
</style>
