<template>
  <div>
    <div id="toolbar"></div>
    <article id="article"></article>
  </div>
</template>

<script>
import UserApi from '@/api/user'
import { v4 as uuidv4 } from 'uuid'
export default {
  props: {
    guid: {
      type: String,
      default: uuidv4(),
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const editor = this.$wangeditor('#toolbar', '#article')
      editor.config.onchange = (html) => {
        this.$emit('input', html)
      }
      editor.config.customAlert = (message, type) => {
        // console.log(type, message)
        // 取消编辑器默认弹框
      }
      editor.config.uploadImgServer = UserApi.uploadEditor
      editor.config.uploadImgHeaders = {
        Authorization: `Bearer ${this.$cookiz.get('jwt_token')}`,
      }
      editor.config.uploadImgParams = {
        guid: this.guid,
      }
      editor.config.uploadFileName = 'file'
      editor.config.uploadImgHooks = {
        customInsert(insertImgFn, result) {
          insertImgFn(result.data[0].url)
        },
      }
      editor.create()
      editor.txt.html(this.value)
      this.editor = editor
    })
  },
  beforeDestroy() {
    this.editor.destroy()
    this.editor = null
  },
  methods: {
    getText() {
      return this.editor.txt.text()
    },
  },
}
</script>

<style lang="scss" scoped></style>
