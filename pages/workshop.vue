<template>
  <div class="min-h-screen" :class="generatedImage ? 'bg-[#F8F3EA]' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'">
    <!-- 使用現有的 Navbar Component -->
    <Navbar />
    
    <div class="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-12">
      
      <!-- 第一階段：上傳/選擇 (當還沒有生成結果時顯示) -->
      <div v-if="!generatedImage" class="upload-stage">
        <!-- Header Section -->
        <div class="text-center mb-8 md:mb-12">
          <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            開始創作您的字型
          </h1>
          <p class="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6">
            拍一個字 → 自動生成整套字型，或選擇我們提供的範例開始創作
          </p>
          
          <!-- 選擇方式指示 -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 max-w-2xl mx-auto">
            <div class="flex items-center gap-3 bg-orange-50 px-6 py-3 rounded-full border border-orange-200">
              <div class="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <img src="/camera.png" alt="上傳" class="w-5 h-5 filter brightness-0 invert" />
              </div>
              <span class="font-medium text-slate-700">上傳手寫字</span>
            </div>
            
            <div class="text-slate-400 font-bold text-lg">或</div>
            
            <div class="flex items-center gap-3 bg-blue-50 px-6 py-3 rounded-full border border-blue-200 relative">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <span class="font-medium text-slate-700">選擇範例</span>
              <!-- 向下箭頭指示 -->
              <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content with padding bottom for fixed button -->
        <div class="grid lg:grid-cols-5 gap-8 lg:gap-6 pb-32">
          <!-- Left Column: Upload/Preview -->
          <div class="space-y-6 lg:col-span-2">
            <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
              <h2 class="text-xl md:text-2xl font-bold text-slate-800 mb-6 text-center">
                上傳您的手寫字
              </h2>
              
              <!-- Image Preview/Upload Area -->
              <div class="relative">
                <!-- Preview Image -->
                <div v-if="previewUrl" class="text-center">
                  <div class="relative inline-block">
                    <img
                      :src="previewUrl"
                      alt="Preview"
                      class="max-w-full h-48 md:h-64 object-contain rounded-2xl shadow-lg border border-gray-200"
                    />
                    <button
                      @click="clearPreview"
                      class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                    >
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Upload Area -->
                <div v-else class="text-center">
                  <label
                    for="file-upload"
                    class="group cursor-pointer block"
                  >
                    <div class="border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-12 hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-300 group-hover:scale-[1.02]">
                      <div class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img src="/camera.png" alt="Camera" class="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert" />
                      </div>
                      <p class="text-lg md:text-xl font-semibold text-slate-800 mb-2">點擊上傳圖片</p>
                      <p class="text-sm md:text-base text-slate-500">支援 JPG、PNG 格式，建議 1MB 以內</p>
                    </div>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    @change="onFileChange"
                    class="hidden"
                  />
                </div>
              </div>
            </div>

            <!-- Upload Button (when preview exists) -->
            <div v-if="!previewUrl" class="text-center">
              <label
                for="file-upload"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <img src="/upload.png" alt="Upload" class="w-5 h-5 mr-2" />
                選擇圖片
              </label>
            </div>
          </div>
          
          <!-- 分隔線和提示 (只在大螢幕顯示) -->
          <div class="hidden lg:flex flex-col items-center justify-center">
            <div class="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
            <div class="bg-white px-4 py-2 rounded-full shadow-md border border-gray-200 my-4">
              <span class="text-sm font-medium text-slate-600">或</span>
            </div>
            <div class="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
          </div>

          <!-- Right Column: Examples -->
          <div class="space-y-6 lg:col-span-2">
            <!-- 範例提示標籤 -->
            <div class="text-center mb-4">
              <div class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span>🎉 沒有手寫字？試試精選範例！</span>
              </div>
            </div>
            
            <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 relative">
              <!-- 脈衝邊框效果 -->
              <div class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 animate-pulse"></div>
              <div class="relative z-10">
                <h2 class="text-xl md:text-2xl font-bold text-slate-800 mb-4 text-center">
                  ✨ 選擇範例字型
                </h2>
                <p class="text-sm md:text-base text-slate-600 text-center mb-6">
                  從我們精選的範例中選擇一個開始創作，立即體驗字型生成的神奇！
                </p>
              
              <!-- Example Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                <div
                  v-for="i in 7"
                  :key="i"
                  @click="selectExample(i)"
                  :class="[
                    'relative cursor-pointer rounded-xl border-2 p-3 md:p-4 transition-all duration-200 hover:scale-105',
                    selectedExample === i
                      ? 'border-orange-500 bg-orange-50 shadow-lg'
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                  ]"
                >
                  <img
                    :src="`/ex${i}.png`"
                    :alt="`範例字型 ${i}`"
                    class="w-full h-16 md:h-20 object-contain mb-2"
                  />
                  <p class="text-xs md:text-sm font-medium text-slate-700 text-center">
                    範例 {{ i }}
                  </p>
                  
                  <!-- Selection Indicator -->
                  <div
                    v-if="selectedExample === i"
                    class="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center"
                  >
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 滑動提示 -->
        <div class="text-center mt-8 lg:hidden">
          <div class="inline-flex flex-col items-center gap-2 animate-bounce">
            <span class="text-sm font-medium text-slate-500">往下滑看更多範例</span>
            <svg class="w-6 h-6 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>

        <!-- Fixed Action Section at bottom -->
        <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 px-4 py-4">
          <div class="max-w-2xl mx-auto text-center">
            <div class="bg-white rounded-2xl p-4 md:p-6">
              <h3 class="text-lg md:text-xl font-bold text-slate-800 mb-3">
                準備生成您的字型了嗎？
              </h3>
              <p class="text-sm md:text-base text-slate-600 mb-4">
                {{ getActionDescription() }}
              </p>
              
              <button
                @click="handleGenerateClick"
                :disabled="!canGenerate || loading || !userState.isAuthenticated"
                :class="[
                  'inline-flex items-center px-6 py-3 md:px-8 md:py-4 font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-lg min-w-[180px] md:min-w-[200px] justify-center',
                  canGenerate && !loading && userState.isAuthenticated
                    ? 'bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white hover:from-[#2d5248] hover:to-[#4a9178] hover:shadow-xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <div v-if="loading" class="flex items-center">
                  <div class="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-3"></div>
                  生成中...
                </div>
                <div v-else-if="!userState.isAuthenticated" class="flex items-center">
                  <svg class="w-4 h-4 md:w-5 md:h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"/>
                  </svg>
                  請先登入
                </div>
                <div v-else class="flex items-center">
                  <img src="/pen-line.png" alt="Generate" class="w-4 h-4 md:w-5 md:h-5 mr-3 filter brightness-0 invert" />
                  生成字型
                </div>
              </button>
              
              <div v-if="!canGenerate" class="mt-3">
                <p class="text-xs md:text-sm text-orange-600 bg-orange-50 px-3 py-2 rounded-full inline-block">
                  請上傳圖片或選擇範例字型後繼續
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二階段：調整與風格融合 (當已有生成結果時顯示) -->
      <div v-else-if="generatedImage" class="edit-stage">
        <!-- Header Section -->
        <div class="pt-8 pb-6 px-8">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-3xl font-bold text-[#3A6B60] mb-2 underline">字型工坊</h1>
                <p class="text-[#3A6B60]">調整您的字型風格，或選擇不同的融合效果</p>
              </div>
              <div class="flex items-center gap-3">
                <!-- 返回按鈕 -->
                <button 
                  @click="resetToUpload" 
                  class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#3A6B60] rounded-xl border border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd"/>
                  </svg>
                  重新選擇圖片
                </button>
                
                <div v-if="blendLoading" class="flex items-center gap-2 text-[#3A6B60] bg-[#5EA897] bg-opacity-20 px-3 py-2 rounded-lg border border-[#5EA897]">
                  <div class="w-4 h-4 border-2 border-[#3A6B60] border-t-transparent rounded-full animate-spin"></div>
                  <span class="text-sm font-medium">AI 融合中</span>
                </div>
                <div v-else-if="blendedImage" class="flex items-center gap-2 text-[#3A6B60] bg-[#5EA897] bg-opacity-20 px-3 py-2 rounded-lg border border-[#5EA897]">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm font-medium">融合完成</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 調整介面 -->
        <div class="max-w-7xl mx-auto px-8 pb-20">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Left Column: Generated Result & Fine Adjustments -->
            <div class="space-y-6">
              <!-- 預覽卡片 -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="p-6">
                  <div class="flex items-center justify-between mb-4">
                    <h2 class="text-xl font-semibold text-[#3A6B60]">即時預覽</h2>
                    <div class="flex items-center gap-2">
                      <div class="w-2 h-2 bg-[#5EA897] rounded-full animate-pulse"></div>
                      <span class="text-sm text-[#3A6B60]">即時更新</span>
                    </div>
                  </div>
                  
                  <div
                    class="relative bg-white rounded-xl aspect-video flex items-center justify-center overflow-hidden transition-all duration-300 border border-gray-200"
                    :class="{ 'ring-2 ring-[#E29930] bg-orange-50 border-[#E29930]': blendLoading }"
                  >
                    <div v-if="blendLoading" class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                      <div class="text-center">
                        <div class="w-8 h-8 border-3 border-[#3A6B60] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <span class="text-[#3A6B60] font-medium">AI 正在融合中</span>
                      </div>
                    </div>
                    
                    <img
                      :src="blendedImage || generatedImage"
                      alt="Generated Font"
                      class="max-h-full max-w-full object-contain transition-all duration-500"
                      :class="{ 'scale-105': blendLoading }"
                    />
                  </div>
                </div>
              </div>

              <!-- 精細調整區域 -->
              <div v-if="isStyleSelected" class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-[#5EA897] bg-opacity-25 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-[#3A6B60]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#3A6B60]">精細調整</h3>
                    <p class="text-sm text-gray-600">微調字型的視覺效果</p>
                  </div>
                </div>

                <div class="space-y-8">
                  <!-- 筆觸粗細 -->
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-[#5EA897] rounded-full"></div>
                        <span class="font-medium text-[#3A6B60]">筆觸粗細</span>
                      </div>
                      <div class="flex items-center gap-2 text-sm">
                        <span class="text-gray-600">即時預覽</span>
                        <div class="w-2 h-2 bg-[#5EA897] rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <span class="text-sm text-gray-500 w-8 text-center">細</span>
                        <div class="flex-1 relative">
                          <input
                            type="range"
                            min="-1.5"
                            max="1.5"
                            step="0.1"
                            v-model.number="thickness"
                            class="w-full range-slider-teal"
                            :class="{ 'animate-pulse': blendLoading }"
                          />
                        </div>
                        <span class="text-sm text-gray-500 w-8 text-center">粗</span>
                      </div>
                      <div class="text-center">
                        <span class="inline-block bg-[#5EA897] bg-opacity-20 text-[#3A6B60] text-sm px-3 py-1 rounded-full font-medium">
                          {{ thickness.toFixed(2) }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- 風格融合比例 -->
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <div class="flex items-center gap-2">
                        <div class="w-3 h-3 bg-[#E29930] rounded-full"></div>
                        <span class="font-medium text-[#3A6B60]">風格融合比例</span>
                      </div>
                      <span class="text-xs text-[#E29930] bg-[#E29930] bg-opacity-20 px-2 py-1 rounded-full">
                        原圖 ← → {{ styleOption }}
                      </span>
                    </div>
                    
                    <div class="space-y-4">
                      <div class="flex items-center gap-4">
                        <span class="text-sm text-gray-500 w-12 text-center">原圖</span>
                        <div class="flex-1 relative">
                          <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.05"
                            v-model.number="alpha"
                            class="w-full range-slider-orange"
                          />
                        </div>
                        <span class="text-sm text-gray-500 w-12 text-center">風格</span>
                      </div>
                      <div class="text-center">
                        <span class="inline-block bg-[#E29930] bg-opacity-20 text-[#E29930] text-sm px-3 py-1 rounded-full font-medium">
                          {{ Math.round(alpha * 100) }}% 風格強度
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 重新生成按鈕 -->
              <div class="flex justify-center">
                <button
                  @click="blend"
                  :disabled="!isStyleSelected || blendLoading"
                  class="bg-[#E29930] hover:bg-[#d18825] text-white px-8 py-3 rounded-xl font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 flex items-center gap-3"
                  :class="{ 'opacity-50 cursor-not-allowed transform-none': !isStyleSelected || blendLoading }"
                >
                  <svg v-if="!blendLoading" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
                  </svg>
                  {{ blendLoading ? '融合中...' : '🎨 重新融合' }}
                </button>
              </div>
            </div>

            <!-- Right Column: Style Controls -->
            <div class="space-y-6">
              <!-- 快速開始卡片 -->
              <div class="bg-gradient-to-br from-[#5EA897] from-10% via-[#5EA897] via-30% to-[#3A6B60] to-90% rounded-2xl shadow-lg border border-[#5EA897] p-6 text-white">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">滿意目前效果？</h3>
                    <p class="text-sm text-white text-opacity-90">直接使用此字型生成完整字體包</p>
                  </div>
                </div>
                
                <button
                  class="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 backdrop-blur-sm border border-white border-opacity-30"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  直接生成字型
                </button>
              </div>

              <!-- 或者分隔線 -->
              <div class="relative flex items-center">
                <div class="flex-grow border-t border-gray-300"></div>
                <span class="flex-shrink mx-4 text-gray-500 bg-[#F8F3EA] px-2">或者</span>
                <div class="flex-grow border-t border-gray-300"></div>
              </div>

              <!-- 風格調整區域 -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center gap-3 mb-6">
                  <div class="w-8 h-8 bg-[#E29930] bg-opacity-25 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-[#E29930]" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h3 class="font-semibold text-[#3A6B60]">風格調整</h3>
                      <span class="bg-[#E29930] bg-opacity-20 text-[#E29930] text-xs px-2 py-1 rounded-full">進階功能</span>
                    </div>
                    <p class="text-sm text-gray-600 mt-1">選擇風格標籤來個性化你的字型</p>
                  </div>
                </div>

                <!-- 風格選項 -->
                <div class="space-y-4">
                  <div class="grid grid-cols-1 gap-3">
                    <div
                      v-for="option in styleOptions"
                      :key="option"
                      @click="selectStyleAndBlend(option)"
                      class="relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 group hover:scale-[1.02]"
                      :class="
                        styleOption === option
                          ? 'border-[#E29930] bg-[#E29930] bg-opacity-10'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                      "
                    >
                      <div class="text-center">
                        <div class="font-medium text-[#3A6B60] mb-1">{{ option }}</div>
                        <div v-if="styleOption === option" class="absolute -top-2 -right-2 w-6 h-6 bg-[#E29930] rounded-full flex items-center justify-center">
                          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- 回到原始字型按鈕 -->
                  <button
                    @click="styleOption = ''; blendedImage = ''"
                    class="w-full bg-gray-100 hover:bg-gray-200 text-[#3A6B60] font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"/>
                    </svg>
                    回到原始字型
                  </button>

                  <!-- 提示訊息 -->
                  <div class="p-3 bg-[#5EA897] bg-opacity-10 rounded-lg border border-[#5EA897] border-opacity-30">
                    <div class="flex items-center gap-2 text-sm text-[#3A6B60]">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
                      </svg>
                      <span>調整滑桿後會自動重新生成預覽效果</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { navigateTo } from 'nuxt/app'
import { userState } from '~/composables/useAuth.js'

// 暫時移除 middleware，先讓頁面正常運行
// definePageMeta({
//   middleware: 'auth'
// })

// State Management - 第一階段（上傳）
const file = ref(null)
const previewUrl = ref('')
const loading = ref(false)
const selectedExample = ref(null)

// State Management - 第二階段（調整）
const generatedImage = ref('')
const styleOption = ref('')  // 改為空字符串，表示未選中任何風格
const alpha = ref(0.5)
const thickness = ref(0)
const blendedImage = ref('')
const blendLoading = ref(false)

// 風格選項
const styleOptions = ['書法風', '簡約現代', '潑墨風', '潮流街頭', '可愛手繪']

// Computed Properties
const canGenerate = computed(() => {
  return previewUrl.value || selectedExample.value
})

const isStyleSelected = computed(() => {
  return styleOption.value !== ''
})

// Methods - 第一階段
const onFileChange = (event) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    
    // Clear selected example when uploading file
    selectedExample.value = null
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      previewUrl.value = e.target.result
    }
    reader.readAsDataURL(selectedFile)
  }
}

const clearPreview = () => {
  file.value = null
  previewUrl.value = ''
  selectedExample.value = null
  
  // Clear the file input
  const fileInput = document.getElementById('file-upload')
  if (fileInput) {
    fileInput.value = ''
  }
}

const selectExample = (index) => {
  console.log('selectExample 被調用，index:', index)
  
  // Clear uploaded file when selecting example
  file.value = null
  previewUrl.value = ''
  
  // Clear the file input
  const fileInput = document.getElementById('file-upload')
  if (fileInput) {
    fileInput.value = ''
  }
  
  // Set selected example
  selectedExample.value = index
  console.log('selectedExample.value 設置為:', selectedExample.value)
}

const getActionDescription = () => {
  if (previewUrl.value) {
    return '已上傳您的手寫字，點擊下方按鈕開始生成專屬字型'
  } else if (selectedExample.value) {
    return `已選擇範例字型 ${selectedExample.value}，點擊下方按鈕開始生成字型`
  }
  return '上傳您的手寫字或選擇範例字型，讓我們為您生成專屬的完整字型'
}

  const handleGenerateClick = () => {
    if (!userState.isAuthenticated) {
      // 顯示登入提示或直接跳轉到登入
      alert('請先登入再使用生成字型功能');
      return;
    }
    
    // 如果已登入，執行原本的生成邏輯
    generate();
  };

  const generate = async () => {
  if (!canGenerate.value || loading.value) return

  loading.value = true
  
  try {
    const API_BASE_URL = 'https://typersonal.dy6.click/8000'
    const formData = new FormData()
    
    // 添加字元參數 (固定為 '早')
    formData.append('character', '早')
    formData.append('sampling_step', '15')
    
    if (selectedExample.value) {
      // Handle example selection
      console.log('使用範例字型:', selectedExample.value)
      
      const exampleImageUrl = `/ex${selectedExample.value}.png`
      const response = await fetch(exampleImageUrl)
      if (!response.ok) throw new Error('無法載入範例圖片')
      
      const blob = await response.blob()
      const exampleFile = new File([blob], `example${selectedExample.value}.png`, { type: 'image/png' })
      formData.append('reference_image', exampleFile)
      
    } else if (file.value) {
      // Handle file upload
      console.log('使用上傳的圖片:', file.value.name)
      formData.append('reference_image', file.value)
    }
    
    // 呼叫 AI 生成 API
    const apiResponse = await fetch(`${API_BASE_URL}/ai/generate`, {
      method: 'POST',
      body: formData,
    })
    
    if (!apiResponse.ok) {
      throw new Error('伺服器回應失敗')
    }
    
    const result = await apiResponse.json()
    console.log('Generate successful:', result)
    
    // 確保 result.image 存在
    if (!result.image) {
      throw new Error('API 回應中沒有圖片資料')
    }
    
    // 設定生成的圖片 (進入第二階段)
    generatedImage.value = result.image
    console.log('進入第二階段，圖片:', result.image)
    
    // 同時儲存到 localStorage (為了相容性)
    localStorage.setItem('fonty_api_image', result.image)
    
  } catch (error) {
    console.error('Generation failed:', error)
    alert('生成失敗，請稍後再試：' + error.message)
  } finally {
    loading.value = false
  }
}

// Methods - 第二階段
const resetToUpload = () => {
  // 重置所有狀態，回到第一階段
  generatedImage.value = ''
  styleOption.value = ''
  blendedImage.value = ''
  file.value = null
  previewUrl.value = ''
  selectedExample.value = null
  
  // 清空文件輸入
  const fileInput = document.getElementById('file-upload')
  if (fileInput) {
    fileInput.value = ''
  }
}

// Methods - 風格選擇與融合
const selectStyleAndBlend = async (option) => {
  styleOption.value = option
  
  // 如果有生成的圖片，自動觸發融合
  if (generatedImage.value) {
    await blend()
  }
}

const blend = async () => {
  if (!styleOption.value || !generatedImage.value) return

  blendLoading.value = true
  
  try {
    const API_BASE_URL = 'https://typersonal.dy6.click/8000'
    
    // 取得生成的圖片作為 blob
    const blob = await fetch(generatedImage.value).then(res => res.blob())
    const formData = new FormData()
    
    formData.append('character', '早') // 使用相同的字元
    formData.append('style_option', styleOption.value)
    formData.append('alpha', alpha.value)
    formData.append('thickness', thickness.value)
    formData.append('image_a', blob, 'image_a.png')

    const response = await fetch(`${API_BASE_URL}/ai/blend`, {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) throw new Error('伺服器回應失敗')
    
    const result = await response.json()
    blendedImage.value = result.image
    console.log('Blend successful:', result)
    
  } catch (error) {
    console.error('Blend failed:', error)
    alert('融合失敗，請稍後重試：' + error.message)
  } finally {
    blendLoading.value = false
  }
}

// Watch thickness changes for auto-blend
watch(thickness, () => {
  if (styleOption.value && generatedImage.value) {
    blend()
  }
})

// SEO Meta
useSeoMeta({
  title: 'Typersonal - 字型工坊',
  description: '上傳您的手寫字或選擇範例字型，AI 將為您生成完整的個人化字型，並提供風格調整功能'
})
</script>

<style scoped>
/* Range Slider Styles - 參考 create.vue */
.range-slider-teal {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, #5EA897 50%, #5EA897 100%);
  outline: none;
}

.range-slider-teal::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3A6B60;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(58, 107, 96, 0.3);
  transition: all 0.2s ease;
}

.range-slider-teal::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(58, 107, 96, 0.4);
}

.range-slider-orange {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, #d1d5db 0%, #d1d5db 50%, #E29930 50%, #E29930 100%);
  outline: none;
}

.range-slider-orange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #E29930;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(226, 153, 48, 0.3);
  transition: all 0.2s ease;
}

.range-slider-orange::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(226, 153, 48, 0.4);
}

/* Firefox */
.range-slider-teal::-moz-range-thumb,
.range-slider-orange::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.range-slider-teal::-moz-range-thumb {
  background: #3A6B60;
  box-shadow: 0 2px 6px rgba(58, 107, 96, 0.3);
}

.range-slider-orange::-moz-range-thumb {
  background: #E29930;
  box-shadow: 0 2px 6px rgba(226, 153, 48, 0.3);
}
</style>
