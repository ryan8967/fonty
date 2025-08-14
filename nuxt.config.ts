// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  
  // PWA 和移動端優化
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
      charset: 'utf-8',
      meta: [
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Typersonal' },
        { name: 'application-name', content: 'Typersonal' },
        { name: 'msapplication-TileColor', content: '#E29930' },
        { name: 'theme-color', content: '#E29930' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [
        { rel: 'manifest', href: '/manifest.json' },
        { rel: 'apple-touch-icon', href: '/typersonal3.png' }
      ]
    }
  },

  // 移動端優化的渲染選項
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  // 性能優化
  experimental: {
    payloadExtraction: false
  },
  
  // 組件自動導入
  components: {
    global: true,
    dirs: ['~/components']
  }
})
