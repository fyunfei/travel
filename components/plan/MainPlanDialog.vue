<template>
  <v-dialog :width="500" :value="value" hide-overlay persistent class="z-50">
    <v-card>
      <v-card-title>创建主计划</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="params.valid">
          <v-text-field
            v-model="params.title"
            label="给这次旅行命个名吧"
            :rules="titleRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="params.address"
            label="这次我们要去的地方"
            :rules="addressRules"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="#fff" @click="handleCancel">取消</v-btn>
        <v-btn class="login-wrap_btn" color="primary" @click="handleConfirm"
          >保存</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { mapActions } from 'vuex'
export default {
  mixins: [validationMixin],
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      params: {
        valid: true,
        title: '',
        address: '',
      },
      titleRules: [(v) => !!v || '您还没有写这次计划的主题呢'],
      addressRules: [(v) => !!v || '您还没有选择目的地呢'],
    }
  },
  methods: {
    ...mapActions({
      insertMainPlan: 'mainPlan/insertMainPlan',
    }),
    handleCancel() {
      this.$refs.form.reset()
      this.$emit('input', false)
    },
    async handleConfirm() {
      this.$refs.form.validate()
      if (this.params.valid) {
        try {
          const { title, address } = this.params
          await this.insertMainPlan({ title, address })
          this.$message({
            type: 'success',
            message: '主计划创建成功',
          })
          this.$emit('input', false)
          this.$emit('success')
        } catch (message) {
          this.$message({
            type: 'error',
            message,
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
