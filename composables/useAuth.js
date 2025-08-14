import { reactive, computed } from 'vue'
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, googleProvider } from '~/plugins/firebase.js'

// 全域用戶狀態
export const userState = reactive({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  
  // Google 登入
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      this.user = {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL
      }
      this.isAuthenticated = true
      console.log('Google 登入成功:', this.user)
      return result
    } catch (error) {
      console.error('Google 登入失敗:', error)
      throw error
    }
  },
  
  // 登出
  async signOutUser() {
    try {
      await signOut(auth)
      this.user = null
      this.isAuthenticated = false
      console.log('登出成功')
    } catch (error) {
      console.error('登出失敗:', error)
      throw error
    }
  },
  
  // 初始化身份驗證監聽器
  initAuthListener() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.user = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL
        }
        this.isAuthenticated = true
      } else {
        this.user = null
        this.isAuthenticated = false
      }
      this.isLoading = false
    })
  }
})

// 導出 useAuth composable
export default function useAuth() {
  return {
    user: computed(() => userState.user),
    isAuthenticated: computed(() => userState.isAuthenticated),
    isLoading: computed(() => userState.isLoading),
    signInWithGoogle: userState.signInWithGoogle,
    signOutUser: userState.signOutUser
  }
}

// 在應用程式啟動時初始化
if (process.client) {
  userState.initAuthListener()
}
