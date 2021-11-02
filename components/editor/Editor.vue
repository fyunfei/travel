<template>
  <div>
    <div id="toolbar"></div>
    <article id="article"></article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editor: null,
    }
  },
  mounted() {
    this.$nextTick(() => {
      const editor = this.$wangeditor('#toolbar', '#article')
      editor.create()
      this.editor = editor
      editor.config.onchange = (html) => {
        this.$emit('input', html)
      }
    })
  },
  beforeDestroy() {
    this.editor.destroy()
    this.editor = null
  },
}
</script>

<style lang="scss" scoped></style>
