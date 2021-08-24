// 注入到nuxt plugin中
import Vue from 'vue'
// import { VAlert } from 'vuetify/lib'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
import init from './message'
Vue.use(Vuetify)
// 插件需要将Vuetify作为内置属性传给组件内部
const vuetify = new Vuetify({
  theme: {
    dark: false,
    primary: colors.blue.darken2,
    accent: colors.grey.darken3,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
})
Vue.use(init(vuetify))
