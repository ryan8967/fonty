export default defineNuxtRouteMiddleware((to, from) => {
  // 確保在客戶端運行，避免 SSR 錯誤
  if (process.client) {
    try {
      const isLoggedIn = localStorage.getItem('fonty_logged_in')
      
      if (!isLoggedIn || isLoggedIn !== 'true') {
        return navigateTo('/login')
      }
    } catch (error) {
      console.error('Auth middleware error:', error)
      return navigateTo('/login')
    }
  }
})
