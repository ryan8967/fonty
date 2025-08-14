<template>
  <div class="auth-container">
    <!-- 未登入狀態 - 現代化設計 -->
    <div v-if="!userState.isAuthenticated && !userState.isLoading" class="login-section">
      <button 
        @click="handleGoogleLogin"
        :disabled="isLoggingIn"
        class="google-login-btn group relative overflow-hidden"
      >
        <!-- Background Animation -->
        <div class="absolute inset-0 bg-gradient-to-r from-[#3A6B60] to-[#5EA897] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <!-- Content -->
        <div class="relative flex items-center gap-3">
          <svg class="w-5 h-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span class="font-semibold text-sm group-hover:text-white transition-colors duration-300">
            {{ isLoggingIn ? '登入中...' : 'Google 登入' }}
          </span>
        </div>
        
        <!-- Loading Spinner -->
        <div v-if="isLoggingIn" class="absolute inset-0 flex items-center justify-center bg-white/90">
          <div class="w-4 h-4 border-2 border-[#3A6B60] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </button>
    </div>

    <!-- 已登入狀態 - 精緻用戶資訊卡片 -->
    <div v-else-if="userState.isAuthenticated" class="user-profile group">
      <!-- 用戶頭像與狀態指示器 -->
      <div class="relative">
        <img 
          :src="userState.user?.photoURL || '/default-avatar.png'" 
          :alt="userState.user?.displayName || '用戶頭像'"
          class="w-12 h-12 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
        >
        <!-- 在線狀態指示器 -->
        <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </div>
      
      <!-- 用戶資訊 -->
      <div class="user-info flex-1 min-w-0">
        <p class="text-sm font-semibold text-[#3A6B60] truncate">
          {{ userState.user?.displayName || '用戶' }}
        </p>
        <p class="text-xs text-gray-500 truncate">
          {{ userState.user?.email }}
        </p>
      </div>

      <!-- 登出按鈕 -->
      <button 
        @click="handleLogout"
        class="logout-btn group/logout relative overflow-hidden"
        title="登出"
      >
        <div class="absolute inset-0 bg-red-500 opacity-0 group-hover/logout:opacity-100 transition-opacity duration-300"></div>
        <svg class="relative w-4 h-4 group-hover/logout:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
      </button>
    </div>

    <!-- 載入中狀態 - 優雅動畫 -->
    <div v-else class="loading-state">
      <div class="loading-spinner">
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
        <div class="spinner-ring"></div>
      </div>
      <span class="text-sm font-medium text-[#3A6B60]">檢查登入狀態...</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userState } from '~/composables/useAuth.js'

const isLoggingIn = ref(false)

const handleGoogleLogin = async () => {
  try {
    isLoggingIn.value = true
    await userState.signInWithGoogle()
  } catch (error) {
    console.error('登入錯誤:', error)
    alert('登入失敗，請稍後再試')
  } finally {
    isLoggingIn.value = false
  }
}

const handleLogout = async () => {
  try {
    await userState.signOutUser()
  } catch (error) {
    console.error('登出錯誤:', error)
    alert('登出失敗，請稍後再試')
  }
}
</script>

<style scoped>
/* Google 登入按鈕 */
.google-login-btn {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #3A6B60;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 12px;
  min-width: 160px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.google-login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: rgba(58, 107, 96, 0.3);
}

.google-login-btn:active {
  transform: translateY(0);
}

/* 用戶資訊卡片 */
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(94, 168, 151, 0.3);
  border-radius: 16px;
  padding: 12px 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-width: 280px;
}

.user-profile:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  border-color: rgba(94, 168, 151, 0.5);
}

/* 登出按鈕 */
.logout-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.logout-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

/* 載入中狀態 */
.loading-state {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(58, 107, 96, 0.2);
}

.loading-spinner {
  position: relative;
  width: 24px;
  height: 24px;
}

.spinner-ring {
  position: absolute;
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}

.spinner-ring:nth-child(1) {
  border-top-color: #3A6B60;
  animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
  border-right-color: #5EA897;
  animation-delay: 0.3s;
}

.spinner-ring:nth-child(3) {
  border-bottom-color: #E29930;
  animation-delay: 0.6s;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: rotate(180deg);
    opacity: 0.7;
  }
  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}

/* 響應式設計 */
@media (max-width: 768px) {
  .user-profile {
    max-width: 200px;
    padding: 8px 12px;
    gap: 8px;
  }
  
  .user-profile img {
    width: 32px;
    height: 32px;
  }
  
  .user-info p:first-child {
    font-size: 12px;
  }
  
  .user-info p:last-child {
    font-size: 10px;
  }
  
  .google-login-btn {
    min-width: 140px;
    padding: 10px 20px;
    font-size: 14px;
  }
}

/* Accessibility improvements */
.google-login-btn:focus,
.logout-btn:focus {
  outline: 2px solid #E29930;
  outline-offset: 2px;
}

/* Dark mode support (future enhancement) */
@media (prefers-color-scheme: dark) {
  .google-login-btn,
  .user-profile,
  .loading-state {
    background: rgba(0, 0, 0, 0.8);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .user-info p:first-child {
    color: #F8F3EA;
  }
}
</style>
