<template>
  <v-dialog :width="500" :value="value" hide-overlay persistent class="z-50">
    <v-card>
      <v-card-title>创建子计划</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="params.valid">
          <v-text-field
            v-model="params.task"
            label="子计划主题"
            :rules="taskRules"
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
        task: '',
      },
      taskRules: [(v) => !!v || '您还没有写这次计划的主题呢'],
    }
  },
  methods: {
    ...mapActions({
      insertSubPlan: 'subPlan/insertSubPlan',
    }),
    handleCancel() {
      this.$refs.form.reset()
    },
    async handleConfirm() {
      this.$refs.form.validate()
      if (this.params.valid) {
        try {
          const { task } = this.params
          const { main: pid } = this.$route.params
          await this.insertSubPlan({ task, pid })
          this.$message({
            type: 'success',
            message: '子计划创建成功',
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
