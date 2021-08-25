import colors from 'vuetify/es5/util/colors'
export default {
  server: {
    host: '0.0.0.0',
    port: 8080,
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'travel_web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/core.scss',
    '@/assets/icon/iconfont.css',
    'material-design-icons-iconfont/dist/material-design-icons.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    /* {
      src: '@/plugins/mock',
      ssr: false,
    }, */
    {
      src: '@/plugins/wangeditor',
      ssr: false,
    },
    {
      src: '@/plugins/message/index',
      ssr: false,
    },
    {
      src: '@/plugins/vuetify',
    },
    {
      src: '@/plugins/axios',
    },
  ],
  loading: false,
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],
  vuetify: {
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
  },
  pageTransition: 'page',
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': {
      target: 'http://192.168.0.101:3000',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
