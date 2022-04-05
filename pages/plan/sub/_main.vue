<template>
  <div class="list-con w-8/12 mx-auto mt-5 bg-white bg-opacity-50 h-full">
    <v-row align="center">
      <v-col :cols="6">
        <span class="text-4xl">ToDo List</span>
      </v-col>
      <v-col :cols="6" class="text-right">
        <v-btn color="primary" @click="visible = true">
          <span class="px-3">Make sub plan</span>
          <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <client-only>
      <v-row>
        <v-col :cols="4">
          <p class="list-con_title">资源池</p>
          <div class="list-con_item">
            <draggable
              v-model="taskList[0]"
              group="plan"
              :animation="150"
              class="h-full"
              :scroll="true"
              @change="(events) => handleChange(0, events)"
            >
              <div
                v-for="element in taskList[0]"
                :key="element.id"
                class="list-con_item__slider"
              >
                <v-row>
                  <v-col :cols="8" class="flex items-center">
                    <i class="list-con_item__dot"></i>
                    <span class="pl-1">{{ element.task }}</span>
                  </v-col>
                  <v-col :cols="4">
                    <v-checkbox
                      v-model="element.checked"
                      value="red"
                      hide-details
                      style="margin: 0"
                      @click="handleChange(1, { added: { element } }, true)"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </draggable>
          </div>
        </v-col>
        <v-col :cols="4">
          <p class="list-con_title">待办区</p>
          <div class="list-con_item">
            <draggable
              v-model="taskList[1]"
              group="plan"
              :animation="150"
              class="h-full"
              :scroll="true"
              @change="(events) => handleChange(1, events)"
            >
              <div
                v-for="element in taskList[1]"
                :key="element.id"
                class="list-con_item__slider"
              >
                <v-row>
                  <v-col :cols="8">
                    <span>{{ element.task }}</span>
                  </v-col>
                  <v-col :cols="4">
                    <v-checkbox
                      v-model="element.checked"
                      value="red"
                      hide-details
                      style="margin: 0"
                      @click="handleChange(2, { added: { element } }, true)"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </draggable>
          </div>
        </v-col>
        <v-col :cols="4">
          <p class="list-con_title">已完成</p>
          <div class="list-con_item">
            <draggable
              v-model="taskList[2]"
              group="plan"
              :animation="150"
              class="h-full"
              :scroll="true"
              @change="(events) => handleChange(2, events)"
            >
              <div
                v-for="element in taskList[2]"
                :key="element.id"
                class="list-con_item__slider"
              >
                <v-row>
                  <v-col :cols="8">
                    <span>{{ element.task }}</span>
                  </v-col>
                </v-row>
              </div>
            </draggable>
          </div>
        </v-col>
      </v-row>
    </client-only>
    <SubPlanDialog v-model="visible" @success="handleSuccess" />
  </div>
</template>

<script>
import SubPlanDialog from '@/components/plan/SubPlanDialog'
import { mapActions } from 'vuex'
export default {
  components: {
    SubPlanDialog,
  },
  async asyncData({ store, params }) {
    const { main: pid } = params
    const response = await store.dispatch('subPlan/getSubList', {
      pid,
    })
    const { code, result } = response
    const taskList = [[], [], []]
    if (code === 200) {
      result.forEach((item) => {
        item.checked = false
        taskList[item.status].push(item)
      })
    }
    return {
      visible: false,
      t: '',
      taskList,
    }
  },
  methods: {
    ...mapActions({
      getSubList: 'subPlan/getSubList',
      updateSubPlan: 'subPlan/updateSubPlan',
    }),
    async init() {
      const { main: pid } = this.$route.params
      const response = await this.getSubList({
        pid,
      })
      const { result } = response
      this.taskList = [[], [], []]
      result.forEach((item) => {
        item.checked = false
        this.taskList[item.status].push(item)
      })
    },
    handleSuccess() {
      this.init()
      // 列表刷新
    },
    /**
     * @param {boolean} byClick 表示通过点击事件触发，需要手动刷新列表
     * @param {number} type 表示当前对应容器编号，byClick为true时表示他的下一个目标容器编号
     * eg: 资源池(编号0)click -> handleChange(1,{added:{element}})
     * 相当于将资源池内的任务拖拽到待办区触发待办区added更新事件
     */
    async handleChange(type, events, byClick) {
      // 通过Draggable触发的都是更新状态操作
      if (events.added) {
        const { id, task } = events.added.element
        const response = await this.updateSubPlan({ id, task, status: type })
        const { result, code } = response
        if (code === 200 && result) {
          this.$message({
            type: 'success',
            message: '修改成功',
          })
          if (byClick) this.init()
        } else {
          this.$message({
            type: 'error',
            message: '修改失败',
          })
          this.init()
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.list-con_title {
  width: 300px;
  margin: 0 auto;
  font-weight: bold;
  padding: 10px 0;
}
.list-con_item {
  width: 300px;
  height: 500px;
  margin: 0 auto;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba($color: #999, $alpha: 0.2);
  overflow: hidden;
  &__dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #f00;
    border-radius: 50%;
  }
  &__slider {
    cursor: pointer;
    padding: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba($color: #999, $alpha: 0.2);
    border-radius: 5px;
    margin-bottom: 10px;
    // transition: all 500ms ease;
    &:hover {
      box-shadow: 0 0 10px rgba($color: #999, $alpha: 0.2);
    }
  }
}
</style>
