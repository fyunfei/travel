<template>
  <v-dialog v-model="visible" width="500">
    <!--  <template #activator="{ on }">
      <slot @click.native="visible = true" v-on="on"></slot>
    </template> -->
    <template #activator="{ on, attrs }">
      <v-btn fab dark small v-bind="attrs" color="indigo" v-on="on">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card class="title-container">
      <v-text-field maxlength="25" counter placeholder="请输入游记标题" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style lang="scss" scoped>
.title-container {
  padding: 10px;
}
</style>
