<template>
  <v-dialog width="600" :value="value" hide-overlay persistent>
    <v-card>
      <v-card-title>
        <span class="text-h6">裁剪图片</span>
      </v-card-title>
      <v-card-text>
        <div ref="cropperContainer">
          <client-only>
            <VueCropper
              ref="cropper"
              :img="img"
              :auto-crop="true"
              :can-scale="false"
              :center-box="true"
              :fixed="true"
              :fixed-number="[1, 1]"
            />
          </client-only>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
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
      conWidth: 0, // 裁剪范围宽度，根据图片宽高动态计算
      conHeight: 0, // 裁剪范围高度，根据图片宽高动态计算
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
        ele.style.width = target.width + 'px'
        ele.style.height = target.height + 'px'
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
