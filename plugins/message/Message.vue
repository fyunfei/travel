<template>
  <div class="message-container">
    <v-alert
      :value="visible"
      dense
      :width="width"
      :type="type"
      transition="scale-transition"
    >
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'info', // success info warning error
      duration: 1500,
      width: 500,
      message: '',
      visible: false,
    }
  },
  methods: {
    init(opt) {
      for (const key in opt) {
        this[key] = opt[key]
      }
    },
    show() {
      this.visible = true
    },
    hidden() {
      this.visible = false
    },
  },
}
</script>

<style lang="scss" scoped>
.message-container {
  display: flex;
  position: fixed;
  top: 10px;
  left: 0;
  right: 0;
  justify-content: center;
}
</style>
