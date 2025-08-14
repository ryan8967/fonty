<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">🔥 Firebase Firestore 連線測試</h1>
        
        <!-- 登入狀態 -->
        <div class="mb-8 p-4 rounded-lg" :class="userState.isAuthenticated ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'">
          <h2 class="text-lg font-semibold mb-2">認證狀態</h2>
          <p v-if="userState.isAuthenticated" class="text-green-800">
            ✅ 已登入: {{ userState.user?.displayName || userState.user?.email }}
          </p>
          <p v-else class="text-red-800">❌ 未登入 - 請先登入測試</p>
          
          <button
            v-if="!userState.isAuthenticated"
            @click="userState.signInWithGoogle()"
            class="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Google 登入
          </button>
        </div>

        <!-- Firestore 測試 -->
        <div class="space-y-6">
          <div class="border-b pb-6">
            <h2 class="text-xl font-semibold mb-4">1. 測試寫入權限</h2>
            <button
              @click="testWrite"
              :disabled="!userState.isAuthenticated || isWriting"
              class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isWriting ? '寫入中...' : '測試寫入資料' }}
            </button>
            <p v-if="writeResult" class="mt-2 text-sm" :class="writeResult.success ? 'text-green-600' : 'text-red-600'">
              {{ writeResult.message }}
            </p>
          </div>

          <div class="border-b pb-6">
            <h2 class="text-xl font-semibold mb-4">2. 測試讀取權限</h2>
            <button
              @click="testRead"
              :disabled="!userState.isAuthenticated || isReading"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isReading ? '讀取中...' : '測試讀取資料' }}
            </button>
            <p v-if="readResult" class="mt-2 text-sm" :class="readResult.success ? 'text-green-600' : 'text-red-600'">
              {{ readResult.message }}
            </p>
          </div>

          <div>
            <h2 class="text-xl font-semibold mb-4">3. 測試防重複投票</h2>
            <div class="space-x-2">
              <button
                @click="testUserSurveyWrite"
                :disabled="!userState.isAuthenticated || isUserSurveyTesting"
                class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isUserSurveyTesting ? '測試中...' : '測試用戶投票記錄' }}
              </button>
              <button
                @click="testUserSurveyRead"
                :disabled="!userState.isAuthenticated || isUserSurveyReading"
                class="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isUserSurveyReading ? '檢查中...' : '檢查投票狀態' }}
              </button>
            </div>
            <p v-if="userSurveyResult" class="mt-2 text-sm" :class="userSurveyResult.success ? 'text-green-600' : 'text-red-600'">
              {{ userSurveyResult.message }}
            </p>
          </div>
        </div>

        <!-- 測試日誌 -->
        <div v-if="testLogs.length > 0" class="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 class="text-lg font-semibold mb-3">測試日誌</h3>
          <div class="space-y-1 max-h-64 overflow-y-auto">
            <div v-for="(log, index) in testLogs" :key="index" class="text-sm font-mono">
              <span class="text-gray-500">{{ log.time }}</span>
              <span :class="log.type === 'error' ? 'text-red-600' : log.type === 'success' ? 'text-green-600' : 'text-blue-600'">
                {{ log.message }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { collection, addDoc, getDocs, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '~/plugins/firebase.js'
import { userState } from '~/composables/useAuth.js'

const isWriting = ref(false)
const isReading = ref(false)
const isUserSurveyTesting = ref(false)
const isUserSurveyReading = ref(false)

const writeResult = ref(null)
const readResult = ref(null)
const userSurveyResult = ref(null)
const testLogs = ref([])

const addLog = (message, type = 'info') => {
  testLogs.value.unshift({
    time: new Date().toLocaleTimeString(),
    message,
    type
  })
}

const testWrite = async () => {
  if (!userState.isAuthenticated) return

  isWriting.value = true
  writeResult.value = null
  
  try {
    addLog('開始測試寫入...', 'info')
    
    const testData = {
      userId: userState.user.uid,
      userEmail: userState.user.email,
      userDisplayName: userState.user.displayName,
      response: 'very_interested',
      timestamp: serverTimestamp(),
      testMode: true
    }

    const docRef = await addDoc(collection(db, 'surveys'), testData)
    
    writeResult.value = {
      success: true,
      message: `✅ 寫入成功！文檔 ID: ${docRef.id}`
    }
    addLog(`寫入成功，文檔 ID: ${docRef.id}`, 'success')
    
  } catch (error) {
    console.error('寫入測試失敗:', error)
    writeResult.value = {
      success: false,
      message: `❌ 寫入失敗: ${error.message}`
    }
    addLog(`寫入失敗: ${error.message}`, 'error')
  } finally {
    isWriting.value = false
  }
}

const testRead = async () => {
  if (!userState.isAuthenticated) return

  isReading.value = true
  readResult.value = null
  
  try {
    addLog('開始測試讀取...', 'info')
    
    const querySnapshot = await getDocs(collection(db, 'surveys'))
    const docs = []
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() })
    })
    
    readResult.value = {
      success: true,
      message: `✅ 讀取成功！找到 ${docs.length} 筆資料`
    }
    addLog(`讀取成功，共 ${docs.length} 筆資料`, 'success')
    
  } catch (error) {
    console.error('讀取測試失敗:', error)
    readResult.value = {
      success: false,
      message: `❌ 讀取失敗: ${error.message}`
    }
    addLog(`讀取失敗: ${error.message}`, 'error')
  } finally {
    isReading.value = false
  }
}

const testUserSurveyWrite = async () => {
  if (!userState.isAuthenticated) return

  isUserSurveyTesting.value = true
  userSurveyResult.value = null
  
  try {
    addLog('測試用戶投票記錄寫入...', 'info')
    
    const userVoteData = {
      userId: userState.user.uid,
      hasVoted: true,
      response: 'very_interested',
      votedAt: serverTimestamp()
    }
    
    await setDoc(doc(db, 'user_surveys', userState.user.uid), userVoteData)
    
    userSurveyResult.value = {
      success: true,
      message: '✅ 用戶投票記錄寫入成功！'
    }
    addLog('用戶投票記錄寫入成功', 'success')
    
  } catch (error) {
    console.error('用戶投票記錄測試失敗:', error)
    userSurveyResult.value = {
      success: false,
      message: `❌ 用戶投票記錄失敗: ${error.message}`
    }
    addLog(`用戶投票記錄失敗: ${error.message}`, 'error')
  } finally {
    isUserSurveyTesting.value = false
  }
}

const testUserSurveyRead = async () => {
  if (!userState.isAuthenticated) return

  isUserSurveyReading.value = true
  
  try {
    addLog('檢查用戶投票狀態...', 'info')
    
    const userVoteRef = doc(db, 'user_surveys', userState.user.uid)
    const docSnap = await getDoc(userVoteRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      userSurveyResult.value = {
        success: true,
        message: `✅ 找到投票記錄！狀態: ${data.hasVoted ? '已投票' : '未投票'}`
      }
      addLog(`找到投票記錄，狀態: ${data.hasVoted ? '已投票' : '未投票'}`, 'success')
    } else {
      userSurveyResult.value = {
        success: true,
        message: '✅ 未找到投票記錄（用戶尚未投票）'
      }
      addLog('未找到投票記錄（用戶尚未投票）', 'info')
    }
    
  } catch (error) {
    console.error('檢查投票狀態失敗:', error)
    userSurveyResult.value = {
      success: false,
      message: `❌ 檢查失敗: ${error.message}`
    }
    addLog(`檢查投票狀態失敗: ${error.message}`, 'error')
  } finally {
    isUserSurveyReading.value = false
  }
}
</script>
