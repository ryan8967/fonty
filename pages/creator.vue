<template>
  <div class="min-h-screen bg-[#F8F3EA]">
    <Navbar />
    
    <div class="max-w-4xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
      <!-- Style Guide Modal -->
      <div v-if="showStyleGuide" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 md:p-8">
          <div class="text-center mb-6">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                      clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[#3A6B60] mb-2">尚未設定字型風格</h3>
            <p class="text-gray-600 mb-6">
              建議先前往工作坊創建您的專屬字型風格，將能獲得更好的生成效果
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                @click="goToWorkshop"
                class="px-6 py-2 bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white rounded-xl font-medium hover:from-[#2d5248] hover:to-[#4a9178] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                前往工作坊
              </button>
              <button
                @click="showStyleGuide = false"
                class="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                使用預設風格
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Header Section -->
      <div class="text-center mb-8">
        <h1 class="text-2xl md:text-4xl font-bold text-[#3A6B60] mb-4">
          生成文字圖片
        </h1>
        <p class="text-gray-600">使用您的專屬字型風格，生成一段文字圖片</p>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <!-- 輸入區域 -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-4">
            <label class="text-lg font-medium text-[#3A6B60]">輸入您想生成的文字</label>
            <span class="text-sm text-gray-500">{{ inputText.length }}/10</span>
          </div>
          <div class="relative">
            <input
              v-model="inputText"
              maxlength="10"
              type="text"
              class="w-full px-4 py-3 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5EA897] focus:border-[#5EA897] transition-colors duration-200"
              placeholder="請輸入文字（最多10個字）"
            />
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
              <template v-if="!fontData">未選擇字型風格</template>
              <template v-else>
                <span class="text-[#5EA897]">{{ fontData.styleOption || '原始風格' }}</span>
              </template>
            </div>
          </div>
        </div>

        <!-- 生成狀態 -->
        <div v-if="batching" class="mb-8">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium text-slate-700">生成進度</span>
            <span class="text-sm text-slate-500">{{ doneCount }}/{{ totalCharsToGenerate }}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-gradient-to-r from-[#3A6B60] to-[#5EA897] h-2 rounded-full transition-all duration-300"
                 :style="{ width: totalCharsToGenerate > 0 ? (doneCount / totalCharsToGenerate) * 100 + '%' : '0%' }"></div>
          </div>
          <div v-if="failures.length > 0" class="mt-2 text-red-500 text-sm">
            生成失敗的字元: {{ failures.join(', ') }}
          </div>
        </div>

        <!-- 預覽區域 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-[#3A6B60]">預覽效果</h3>
          
          <div v-if="!fontData" class="bg-orange-50 rounded-xl p-6">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-orange-200 rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                      clip-rule="evenodd"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-[#3A6B60] mb-2">尚未設定字型風格</h3>
              <p class="text-gray-600 mb-6">
                建議先前往工作坊創建您的專屬字型風格，將能獲得更好的生成效果
              </p>
              <NuxtLink 
                to="/workshop"
                class="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors duration-200"
              >
                <span>前往工作坊</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>

          <div v-else-if="!generatedImages.size" class="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <div class="animate-pulse text-gray-400">
              <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p>請輸入文字後點擊生成按鈕</p>
            </div>
          </div>

          <div v-else class="border border-gray-200 rounded-xl p-4">
            <div class="bg-white rounded-lg aspect-[3/1] flex items-center justify-center p-4 gap-2">
              <template v-for="char in inputText" :key="char">
                <img v-if="generatedImages.has(char)"
                  :src="generatedImages.get(char)"
                  :alt="char"
                  class="h-full object-contain"
                />
                <div v-else class="h-full aspect-square bg-gray-100 rounded flex items-center justify-center text-gray-400">
                  {{ char }}
                </div>
              </template>
            </div>
          </div>

          <!-- 操作按鈕 -->
          <div class="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              @click="generateText"
              :disabled="!canGenerate || batching"
              class="flex-1 bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white py-3 px-6 rounded-xl font-medium hover:from-[#2d5248] hover:to-[#4a9178] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <template v-if="batching">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                <span>生成中...</span>
              </template>
              <template v-else>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                </svg>
                <span>立即生成</span>
              </template>
            </button>

            <button
              v-if="generatedImages.size"
              @click="copyImage"
              class="flex-1 border-2 border-[#5EA897] text-[#5EA897] py-3 px-6 rounded-xl font-medium hover:bg-[#5EA897] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"/>
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"/>
              </svg>
              複製圖片
            </button>

            <button
              v-if="generatedImages.size"
              @click="downloadImage"
              class="flex-1 border-2 border-[#3A6B60] text-[#3A6B60] py-3 px-6 rounded-xl font-medium hover:bg-[#3A6B60] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"/>
              </svg>
              下載圖片
            </button>
          </div>
        </div>

        <!-- 提示信息 -->
        <div class="mt-8">
          <p class="text-sm text-gray-500 text-center">
            提示：生成的圖片可以直接用於社群媒體、簡報或其他創作中
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// State
const inputText = ref('')
const generatedImages = ref(new Map()) // 改用 Map 結構存儲生成的圖片
const fontData = ref(null)
const showStyleGuide = ref(false)
const batching = ref(false)
const doneCount = ref(0)
const failures = ref([])

// 從 localStorage 獲取字型數據
onMounted(() => {
  const workshopFontData = localStorage.getItem('workshop_font_data')
  if (workshopFontData) {
    try {
      const data = JSON.parse(workshopFontData)
      // 確保有混合後的圖片，這是用戶在工作坊最後確認的風格
      if (data.blendedImage) {
        fontData.value = data
      }
    } catch (error) {
      console.error('解析字型數據失敗:', error)
    }
  }
})

// 計算要生成的字元總數
const totalCharsToGenerate = computed(() => {
  return inputText.value ? new Set(inputText.value).size : 0
})

// 計算屬性
const canGenerate = computed(() => {
  return inputText.value.length > 0 && inputText.value.length <= 10 && fontData.value
})

// 生成文字圖片
const generateText = async () => {
  if (!canGenerate.value) return
  
  batching.value = true
  doneCount.value = 0
  failures.value = []
  generatedImages.value.clear()

  try {
    const API_BASE_URL = 'https://typersonal.dy6.click/8000'
    const uniqueChars = new Set(inputText.value)
    
    // 獲取參考圖片 blob
    const imageUrl = fontData.value.blendedImage || fontData.value.referenceImage
    if (!imageUrl) {
      throw new Error('未找到參考圖片')
    }

    // 獲取參考圖片 blob
    const imageResponse = await fetch(imageUrl)
    const imageBlob = await imageResponse.blob()
    const file = new File([imageBlob], 'reference.png', { type: 'image/png' })

    // 生成每個字元
    for (const char of uniqueChars) {
      if (generatedImages.value.has(char)) continue

      try {
        const formData = new FormData()
        formData.append('character', char)
        formData.append('sampling_step', '15')
        formData.append('reference_image', file)

        const response = await fetch(`${API_BASE_URL}/ai/generate`, {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error(`API 錯誤 ${response.status}:`, errorText)
          throw new Error(`生成字元 ${char} 失敗 (${response.status}): ${errorText}`)
        }

        const result = await response.json()
        if (!result.image) {
          throw new Error(`生成字元 ${char} 失敗: API 回傳資料缺少圖片`)
        }
        
        generatedImages.value.set(char, result.image)
        doneCount.value++

      } catch (error) {
        console.error(`生成字元 ${char} 失敗:`, error)
        failures.value.push(char)
      }
    }
  } catch (error) {
    console.error('生成文字失敗:', error)
  } finally {
    batching.value = false
  }
}

// 複製圖片到剪貼板
const copyImage = async () => {
  try {
    const response = await fetch(generatedImages.value.values().next().value)
    const blob = await response.blob()
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob
      })
    ])
    alert('圖片已複製到剪貼板')
  } catch (error) {
    console.error('複製圖片失敗:', error)
    alert('複製失敗，請稍後重試')
  }
}

// 下載圖片
const downloadImage = () => {
  try {
    const url = generatedImages.value.values().next().value
    const a = document.createElement('a')
    a.href = url
    a.download = `typersonal-text-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  } catch (error) {
    console.error('下載失敗:', error)
    alert('下載失敗，請稍後重試')
  }
}

// SEO Meta
useSeoMeta({
  title: 'Typersonal - 文字圖片生成',
  description: '使用您的專屬字型風格，生成一段文字圖片'
})
</script>
