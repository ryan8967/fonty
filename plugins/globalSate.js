export default defineNuxtPlugin(() => {
  // 只在客戶端執行，避免 SSR 錯誤
  if (process.client) {
    try {
      const cookieSecure = useRuntimeConfig().public?.cookieSecure || false
      const sideMenuCookie = useCookie('isSideMenuOpen', { 
        maxAge: 60 * 60, 
        secure: cookieSecure, 
        watch: false, // 避免 SSR 衝突
        default: () => false 
      })
    } catch (error) {
      console.error('Global state plugin error:', error)
    }
  }
})