// import colors from 'vuetify/es5/util/colors'
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
      src: '@/plugins/axios',
    },
    {
      src: '@/plugins/wangeditor',
      ssr: false,
    },
    {
      src: '@/plugins/message/index',
      ssr: true,
    },
    {
      src: '@/plugins/draggable',
      ssr: false,
    },
    /*     {
      src: '@/plugins/vuetify',
    }, */
    {
      src: '@/plugins/cropper',
      ssr: false,
    },
    {
      src: '@/plugins/lazyload',
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
  vuetify: {
    theme: {
      dark: false,
      options: {
        cspNonce: 'vuetify',
      },
      themes: {
        light: {
          primary: '#6c36ff',
        },
        dark: {
          primary: '#6c36ff',
        },
      },
    },
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],
  ],

  pageTransition: 'page',
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },
  proxy: {
    '/api/': {
      target: 'http://192.168.0.103:3000',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    vendor: ['vue-cropper'],
  },
}
