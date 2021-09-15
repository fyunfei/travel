// 注入到nuxt plugin中
import Vue from 'vue'
// import { VAlert } from 'vuetify/lib'
import Vuetify from 'vuetify'
import init from './message'
Vue.use(Vuetify)
// 插件需要将Vuetify作为内置属性传给组件内部
const vuetify = new Vuetify({
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#6c36ff',
      },
      dark: {
        primary: '#6c36ff',
      },
    },
  },
})
Vue.use(init(vuetify))
