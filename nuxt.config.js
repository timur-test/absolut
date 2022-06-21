export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'absolute-help-fe-nuxt',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/styles.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/api.js',
    '~/plugins/helper.js',
    '~/plugins/global-components-registrator.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/dotenv',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/svg-sprite',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.SERVER_BASE_API_URL,
  },

  svgSprite: {
    input: '~/assets/svg/sprite',
  },

  styleResources: {
    scss: [
      '~/assets/styles/includes/_vars.scss',
      '~/assets/styles/includes/_mixins.scss',
      '~/assets/styles/includes/_grid.scss',
    ],
    hoistUseStatements: true, // Hoists the "@use" imports. Applies only to "sass", "scss" and "less". Default: false.
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 80,
  },
}
