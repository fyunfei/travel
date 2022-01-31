<template>
  <div class="list-con w-8/12 mx-auto mt-5 bg-white bg-opacity-50 h-full">
    <v-row align="center">
      <v-col :cols="6">
        <span class="text-4xl">ToDo List</span>
      </v-col>
      <v-col :cols="6" class="text-right">
        <v-btn color="primary">
          <span class="px-3">Make sub plan</span>
          <v-icon>mdi-arrow-right-thin-circle-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <client-only>
      <v-row>
        <v-col :cols="4">
          <div class="list-con_item">
            <draggable
              v-model="myArray"
              group="plan"
              :animation="150"
              class="h-full"
              :scroll="true"
            >
              <div
                v-for="element in myArray"
                :key="element.id"
                class="list-con_item__slider"
              >
                <v-row>
                  <v-col :cols="8">
                    <span>{{ element.name }}</span>
                  </v-col>
                  <v-col :cols="4">
                    <v-checkbox
                      v-model="t"
                      value="red"
                      hide-details
                      style="margin: 0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </draggable>
          </div>
        </v-col>
        <v-col :cols="4">
          <div class="list-con_item">
            <draggable
              v-model="myArray_1"
              group="plan"
              :animation="150"
              class="h-full"
              :scroll="true"
            >
              <div
                v-for="element in myArray_1"
                :key="element.id"
                class="list-con_item__slider"
              >
                <v-row>
                  <v-col :cols="8">
                    <span>{{ element.name }}</span>
                  </v-col>
                  <v-col :cols="4">
                    <v-checkbox
                      v-model="t"
                      value="red"
                      hide-details
                      style="margin: 0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </draggable>
          </div>
        </v-col>
        <v-col :cols="4">
          <div class="list-con_item">
            <draggable
              v-model="myArray_2"
              group="plan"
              :animation="150"
              class="h-full"
              :scroll="true"
            >
              <div
                v-for="element in myArray_2"
                :key="element.id"
                class="list-con_item__slider"
              >
                <v-row>
                  <v-col :cols="8">
                    <span>{{ element.name }}</span>
                  </v-col>
                  <v-col :cols="4">
                    <v-checkbox
                      v-model="t"
                      value="red"
                      hide-details
                      style="margin: 0"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </div>
            </draggable>
          </div>
        </v-col>
      </v-row>
    </client-only>
  </div>
</template>

<script>
export default {
  asyncData() {
    return {
      t: '',
      myArray: [
        {
          id: 1,
          name: 'zs',
        },
        {
          id: 2,
          name: 'Ws',
        },
      ],
      myArray_1: [
        {
          id: 3,
          name: 'zs',
        },
        {
          id: 4,
          name: 'Ws',
        },
      ],
      myArray_2: [
        {
          id: 5,
          name: 'zs',
        },
        {
          id: 6,
          name: 'Ws',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.list-con_item {
  width: 300px;
  height: 500px;
  margin: 0 auto;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba($color: #999, $alpha: 0.2);
  overflow: hidden;
  &__slider {
    cursor: pointer;
    padding: 10px;
    box-shadow: 0;
    // transition: all 500ms ease;
    &:hover {
      box-shadow: 0 0 10px rgba($color: #999, $alpha: 0.2);
    }
  }
}
</style>
