// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss'],
  
  // SSR 設定優化
  ssr: true,
  
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
        { rel: 'apple-touch-icon', href: '/typersonal3.png', sizes: '180x180' },
        { rel: 'icon', type: 'image/png', href: '/typersonal3.png' }
      ]
    }
  },

  // 移動端優化的渲染選項
  nitro: {
    compressPublicAssets: true,
    minify: true
  },

  // 性能優化 - 修復實驗性功能問題
  experimental: {
    payloadExtraction: false,
    asyncContext: false
  },
  
  // 組件自動導入
  components: {
    global: true,
    dirs: ['~/components']
  },

  // 運行時配置
  runtimeConfig: {
    public: {
      cookieSecure: process.env.NODE_ENV === 'production'
    }
  }
})
