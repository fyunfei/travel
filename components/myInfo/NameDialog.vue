<template>
  <v-dialog width="600" :value="value" hide-overlay persistent>
    <v-card>
      <v-card-title>
        <span class="text-h6">账户信息设置</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form
            ref="form"
            v-model="param.valid"
            class="login-wrap_form"
            lazy-validation
          >
            <v-row>
              <v-col :cols="24">
                <v-text-field
                  :value="userInfo.username"
                  color="#6c36ff"
                  label="用户名"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col :cols="24">
                <v-text-field
                  v-model="param.nickname"
                  color="#6c36ff"
                  label="昵称"
                  :error-messages="nickError"
                  @input="$v.param.nickname.$touch()"
                  @blur="$v.param.nickname.$touch()"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn coloe="#fff" :loading="loading" @click="handleCancel">
          取消
        </v-btn>
        <v-btn
          color="#6c36ff"
          class="login-wrap_btn"
          dark
          :loading="loading"
          @click="handleSave"
        >
          保存
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import placeholder from '@/config/default'
import { mapState, mapMutations } from 'vuex'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import UserApi from '@/api/user'
const { updateInfo } = UserApi
const { nickTip } = placeholder
export default {
  mixins: [validationMixin],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      param: {
        nickname: '',
      },
    }
  },
  validations: {
    param: {
      nickname: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    nickError() {
      const errors = []
      if (!this.$v.param.nickname.$dirty) return errors
      !this.$v.param.nickname.required && errors.push(nickTip)
      return errors
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.param.nickname = this.userInfo.nickname
      }
    },
  },
  methods: {
    ...mapMutations({
      changeUserInfo: 'user/changeUserInfo',
    }),
    handleSave() {
      this.loading = true
      this.$axios
        .$post(updateInfo, { nickname: this.param.nickname })
        .then((res) => {
          const { code, result, message } = res
          this.loading = false
          if (code === 200 && result) {
            this.changeUserInfo({ key: 'nickname', value: this.param.nickname })
            this.handleCancel()
            this.$message({
              type: 'success',
              message: '修改成功',
            })
          } else {
            this.$message({
              type: 'error',
              message,
            })
          }
        })
        .catch(() => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '修改失败',
          })
        })
      // this.loading = true
    },
    handleCancel() {
      this.$emit('input', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.login-wrap {
  &_form {
    width: 100%;
  }
}
</style>
