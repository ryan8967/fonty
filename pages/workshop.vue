<template>
  <div class="min-h-screen"
    :class="generatedImage ? 'bg-[#F8F3EA]' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'">
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
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span class="font-medium text-slate-700">選擇範例</span>
              <!-- 向下箭頭指示 -->
              <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <svg class="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
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
              <!-- 將字元輸入整合到上傳區域內 -->
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl md:text-2xl font-bold text-slate-800">
                  上傳您的手寫字
                </h2>
                <div class="relative">
                  <input id="character-input" v-model="inputCharacter" type="text" maxlength="1"
                    class="w-16 text-center text-xl font-medium py-2 px-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 bg-gray-50"
                    placeholder="早" />
                  <div class="absolute -bottom-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span class="text-xs text-gray-500">預覽字元</span>
                  </div>
                </div>
              </div>

              <!-- Image Preview/Upload Area -->
              <div class="relative">
                <!-- Preview Image -->
                <div v-if="previewUrl" class="text-center">
                  <div class="relative inline-block">
                    <img :src="previewUrl" alt="Preview"
                      class="max-w-full h-48 md:h-64 object-contain rounded-2xl shadow-lg border border-gray-200" />
                    <button @click="clearPreview"
                      class="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 flex items-center justify-center">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                <!-- Upload Area -->
                <div v-else class="text-center">
                  <label for="file-upload" class="group cursor-pointer block">
                    <div
                      class="border-2 border-dashed border-gray-300 rounded-2xl p-8 md:p-12 hover:border-orange-400 hover:bg-orange-50/30 transition-all duration-300 group-hover:scale-[1.02]">
                      <div
                        class="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img src="/camera.png" alt="Camera"
                          class="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert" />
                      </div>
                      <p class="text-lg md:text-xl font-semibold text-slate-800 mb-2">點擊上傳圖片</p>
                      <p class="text-sm md:text-base text-slate-500">支援 JPG、PNG 格式，建議 1MB 以內</p>
                    </div>
                  </label>
                  <input id="file-upload" type="file" accept="image/*" @change="onFileChange" class="hidden" />
                </div>
              </div>
            </div>

            <!-- Upload Button (when preview exists) -->
            <div v-if="!previewUrl" class="text-center">
              <label for="file-upload"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:from-orange-600 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer">
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
              <div
                class="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>🎉 沒有手寫字？試試精選範例！</span>
              </div>
            </div>

            <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8 relative">
              <!-- 脈衝邊框效果 -->
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl opacity-20 animate-pulse">
              </div>
              <div class="relative z-10">
                <h2 class="text-xl md:text-2xl font-bold text-slate-800 mb-4 text-center">
                  ✨ 選擇範例字型
                </h2>
                <p class="text-sm md:text-base text-slate-600 text-center mb-6">
                  從我們精選的範例中選擇一個開始創作，立即體驗字型生成的神奇！
                </p>

                <!-- Example Grid -->
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                  <div v-for="i in 7" :key="i" @click="selectExample(i)" :class="[
                    'relative cursor-pointer rounded-xl border-2 p-3 md:p-4 transition-all duration-200 hover:scale-105 bg-white',
                    selectedExample === i
                      ? 'border-orange-500 shadow-lg ring-2 ring-orange-200'
                      : 'border-gray-200 hover:border-orange-300 hover:shadow-md'
                  ]">
                    <img :src="`/ex${i}.png`" :alt="`範例字型 ${i}`" class="w-full h-16 md:h-20 object-contain mb-2" />
                    <p class="text-xs md:text-sm font-medium text-slate-700 text-center">
                      範例 {{ i }}
                    </p>

                    <!-- Selection Indicator -->
                    <div v-if="selectedExample === i"
                      class="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd" />
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
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd" />
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

              <button @click="handleGenerateClick" :disabled="!canGenerate || loading || !userState.isAuthenticated"
                :class="[
                  'inline-flex items-center px-6 py-3 md:px-8 md:py-4 font-bold text-base md:text-lg rounded-full transition-all duration-300 shadow-lg min-w-[180px] md:min-w-[200px] justify-center',
                  canGenerate && !loading && userState.isAuthenticated
                    ? 'bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white hover:from-[#2d5248] hover:to-[#4a9178] hover:shadow-xl hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]">
                <div v-if="loading" class="flex items-center">
                  <div class="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white mr-3"></div>
                  生成中...
                </div>
                <div v-else-if="!userState.isAuthenticated" class="flex items-center">
                  <svg class="w-4 h-4 md:w-5 md:h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clip-rule="evenodd" />
                  </svg>
                  請先登入
                </div>
                <div v-else class="flex items-center">
                  <img src="/pen-line.png" alt="Generate"
                    class="w-4 h-4 md:w-5 md:h-5 mr-3 filter brightness-0 invert" />
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
      <div v-else-if="generatedImage" class="edit-stage min-h-screen">
        <!-- Header Section -->
        <div class="pt-4 md:pt-8 pb-3 md:pb-6 px-4 md:px-8">
          <div class="max-w-7xl mx-auto">
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-2xl md:text-3xl font-bold text-[#3A6B60] mb-1 md:mb-2">字型工坊</h1>
                <p class="text-sm text-[#3A6B60]">調整字型風格</p>
              </div>
              <button @click="resetToUpload"
                class="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-[#3A6B60] rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-200 flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clip-rule="evenodd" />
                </svg>
                返回
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Optimized Layout -->
        <div class="md:hidden px-4 h-[calc(100vh-8rem)] flex flex-col">
          <!-- Preview Area -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-lg font-semibold text-[#3A6B60]">即時預覽</h2>
              <div class="flex items-center gap-2">
                <div class="w-1.5 h-1.5 bg-[#5EA897] rounded-full animate-pulse"></div>
                <span class="text-xs text-[#3A6B60]">即時更新</span>
              </div>
            </div>

            <div class="relative bg-white rounded-lg aspect-[4/3] flex items-center justify-center overflow-hidden border border-gray-200"
              :class="{ 'ring-2 ring-[#E29930] bg-orange-50 border-[#E29930]': blendLoading }">
              <div v-if="blendLoading" class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                <div class="text-center">
                  <div class="w-6 h-6 border-3 border-[#3A6B60] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <span class="text-[#3A6B60] text-sm font-medium">AI 融合中</span>
                </div>
              </div>
              <img :src="blendedImage || generatedImage" alt="Generated Font" class="max-h-full max-w-full object-contain" />
            </div>
          </div>

          <!-- Controls Area -->
          <div class="flex-1 overflow-y-auto">
            <!-- Style Selection -->
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-4">
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                  <div class="w-7 h-7 bg-[#E29930] bg-opacity-25 rounded-lg flex items-center justify-center">
                    <svg class="w-4 h-4 text-[#E29930]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="font-semibold text-[#3A6B60] text-base">選擇風格</h3>
                    <p class="text-xs text-gray-600">選擇想要的風格並調整參數</p>
                  </div>
                </div>
                <div v-if="styleOption" class="text-xs px-2 py-1 bg-[#E29930] bg-opacity-10 text-[#E29930] rounded-full">
                  {{ styleOption }}
                </div>
              </div>

              <!-- Style Grid -->
              <div class="grid grid-cols-5 gap-2 mb-4">
                <button v-for="(option, index) in styleOptions" :key="option"
                  @click="selectStyleAndBlend(option)"
                  class="aspect-square rounded-lg flex flex-col items-center justify-center transition-all duration-200 border-2"
                  :class="[
                    styleOption === option
                      ? 'border-[#E29930] bg-[#E29930] bg-opacity-10'
                      : 'border-gray-200'
                  ]">
                  <div class="text-[#3A6B60] mb-1">
                    <!-- Icons for different styles -->
                    <svg v-if="index === 0" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    <svg v-else-if="index === 1" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <svg v-else-if="index === 2" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                    <svg v-else-if="index === 3" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div class="text-xs font-medium text-[#3A6B60]">{{ option }}</div>
                </button>
              </div>

              <!-- Adjustment Controls -->
              <div class="space-y-4">
                <!-- 筆觸粗細 -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#5EA897]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.535 2.808l5.657 5.657-8.485 8.485-5.657-5.657 8.485-8.485zm-1.414 1.414L6.707 11.636l2.828 2.829 7.414-7.414-2.828-2.829zM6 16h9v2H6v-2z" />
                      </svg>
                      <span class="text-sm font-medium text-[#3A6B60]">筆觸粗細</span>
                    </div>
                    <span class="text-xs bg-[#5EA897] bg-opacity-20 text-[#3A6B60] px-2 py-0.5 rounded-full">
                      {{ thickness.toFixed(1) }}
                    </span>
                  </div>
                  <input type="range" min="-1.5" max="1.5" step="0.1" v-model.number="thickness"
                    class="w-full range-slider-teal" />
                </div>

                <!-- 風格強度 -->
                <div>
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center gap-2">
                      <svg class="w-4 h-4 text-[#E29930]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8h10v2H7v-2z" />
                      </svg>
                      <span class="text-sm font-medium text-[#3A6B60]">風格強度</span>
                    </div>
                    <span class="text-xs bg-[#E29930] bg-opacity-20 text-[#E29930] px-2 py-0.5 rounded-full">
                      {{ Math.round(alpha * 100) }}%
                    </span>
                  </div>
                  <input type="range" min="0" max="1" step="0.05" v-model.number="alpha"
                    class="w-full range-slider-orange" />
                </div>
              </div>
            </div>
          </div>

          <!-- Fixed Bottom Buttons -->
          <div class="sticky bottom-0 left-0 right-0 p-4 bg-[#F8F3EA] border-t border-gray-200">
            <div class="flex gap-3">
              <button @click="blend" :disabled="!isStyleSelected || blendLoading"
                class="flex-1 bg-[#E29930] hover:bg-[#d18825] text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm"
                :class="{ 'opacity-50 cursor-not-allowed': !isStyleSelected || blendLoading }">
                <svg v-if="!blendLoading" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 2a1 1 0 011-1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                </svg>
                {{ blendLoading ? '融合中...' : '重新融合' }}
              </button>
              <button @click="startPreview"
                class="flex-1 bg-[#3A6B60] hover:bg-[#2d5248] text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                </svg>
                立即應用
              </button>
            </div>
          </div>
        </div>

        <!-- Desktop Layout -->
        <div class="hidden md:block max-w-7xl mx-auto px-8 pb-16">
          <div class="grid grid-cols-2 gap-8">
            <!-- Left Column: Preview -->
            <div class="space-y-6">
              <!-- Preview Card -->
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
                    class="relative bg-white rounded-xl aspect-[4/3] flex items-center justify-center overflow-hidden transition-all duration-300 border border-gray-200"
                    :class="{ 'ring-2 ring-[#E29930] bg-orange-50 border-[#E29930]': blendLoading }">
                    <div v-if="blendLoading"
                      class="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                      <div class="text-center">
                        <div
                          class="w-8 h-8 border-3 border-[#3A6B60] border-t-transparent rounded-full animate-spin mx-auto mb-3">
                        </div>
                        <span class="text-[#3A6B60] font-medium">AI 正在融合中</span>
                      </div>
                    </div>

                    <img :src="blendedImage || generatedImage" alt="Generated Font"
                      class="max-h-full max-w-full object-contain transition-all duration-500"
                      :class="{ 'scale-105': blendLoading }" />
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3">
                <button @click="blend" :disabled="!isStyleSelected || blendLoading"
                  class="flex-1 bg-[#E29930] hover:bg-[#d18825] text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                  :class="{ 'opacity-50 cursor-not-allowed': !isStyleSelected || blendLoading }">
                  <svg v-if="!blendLoading" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M4 2a1 1 0 011-1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" />
                  </svg>
                  {{ blendLoading ? '融合中...' : '重新融合' }}
                </button>
                <button @click="startPreview"
                  class="flex-1 bg-[#3A6B60] hover:bg-[#2d5248] text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" />
                  </svg>
                  立即應用
                </button>
              </div>
            </div>

            <!-- Right Column: Controls -->
            <div class="space-y-6">
              <!-- Style Selection -->
              <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-[#E29930] bg-opacity-25 rounded-lg flex items-center justify-center">
                      <svg class="w-5 h-5 text-[#E29930]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 class="font-semibold text-[#3A6B60] text-lg">風格選擇</h3>
                      <p class="text-sm text-gray-600">選擇合適的風格並調整參數</p>
                    </div>
                  </div>
                  <div v-if="styleOption"
                    class="text-sm px-3 py-1.5 bg-[#E29930] bg-opacity-10 text-[#E29930] rounded-full font-medium">
                    {{ styleOption }}
                  </div>
                </div>

                <!-- Style Grid -->
                <div class="grid grid-cols-5 gap-3 mb-6">
                  <button v-for="(option, index) in styleOptions" :key="option" @click="selectStyleAndBlend(option)"
                    class="aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 border-2 hover:scale-105"
                    :class="[
                      styleOption === option
                        ? 'border-[#E29930] bg-[#E29930] bg-opacity-10'
                        : 'border-gray-200 hover:border-gray-300'
                    ]">
                    <!-- Style Icons -->
                    <div class="text-[#3A6B60] mb-2">
                      <!-- Different icons for different styles -->
                      <svg v-if="index === 0" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      <svg v-else-if="index === 1" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                      <svg v-else-if="index === 2" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <svg v-else-if="index === 3" class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <svg v-else class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <div class="text-sm font-medium text-[#3A6B60]">{{ option }}</div>
                  </button>
                </div>

                <!-- Adjustment Controls -->
                <div class="space-y-6">
                  <!-- 筆觸粗細 -->
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-[#5EA897]" viewBox="0 0 24 24" fill="currentColor">
                          <path
                            d="M15.535 2.808l5.657 5.657-8.485 8.485-5.657-5.657 8.485-8.485zm-1.414 1.414L6.707 11.636l2.828 2.829 7.414-7.414-2.828-2.829zM6 16h9v2H6v-2z" />
                        </svg>
                        <span class="font-medium text-[#3A6B60]">筆觸粗細</span>
                      </div>
                      <span class="text-sm bg-[#5EA897] bg-opacity-20 text-[#3A6B60] px-3 py-1 rounded-full">
                        {{ thickness.toFixed(1) }}
                      </span>
                    </div>
                    <input type="range" min="-1.5" max="1.5" step="0.1" v-model.number="thickness"
                      class="w-full range-slider-teal" />
                  </div>

                  <!-- 風格強度 -->
                  <div>
                    <div class="flex items-center justify-between mb-3">
                      <div class="flex items-center gap-2">
                        <svg class="w-5 h-5 text-[#E29930]" viewBox="0 0 24 24" fill="currentColor">
                          <path
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-5-8h10v2H7v-2z" />
                        </svg>
                        <span class="font-medium text-[#3A6B60]">風格強度</span>
                      </div>
                      <span class="text-sm bg-[#E29930] bg-opacity-20 text-[#E29930] px-3 py-1 rounded-full">
                        {{ Math.round(alpha * 100) }}%
                      </span>
                    </div>
                    <input type="range" min="0" max="1" step="0.05" v-model.number="alpha"
                      class="w-full range-slider-orange" />
                  </div>
                </div>
              </div>

              <!-- Additional Info Card -->
              <div
                class="bg-gradient-to-br from-[#5EA897] from-10% via-[#5EA897] via-30% to-[#3A6B60] to-90% rounded-2xl shadow-lg p-6 text-white">
                <div class="flex items-center gap-3 mb-4">
                  <div class="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold">調整提示</h3>
                    <p class="text-sm text-white text-opacity-90">調整完成後點擊預覽按鈕查看效果</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Survey Modal -->
    <div v-if="showSurveyModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] px-4"
      @click.self="closeSurveyModal">
      <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
        <div class="text-center mb-8">
          <!-- 調查問卷圖標 -->
          <div
            class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd" />
            </svg>
          </div>

          <h3 class="text-2xl font-bold text-slate-800 mb-4">💭 快速調查問卷</h3>
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <p class="text-sm text-blue-800 font-medium mb-2">📋 幫助我們了解用戶需求</p>
            <p class="text-xs text-blue-600">本調查純粹用於產品開發研究，不涉及任何購買行為</p>
          </div>
          <p class="text-slate-600 text-lg leading-relaxed mb-4">
            感謝您體驗我們的字型生成技術！
          </p>
          <p class="text-slate-600 text-base leading-relaxed">
            我們正在研究推出<span class="font-semibold text-[#3A6B60]">完整版字型包</span>的可行性
          </p>
          <p class="text-slate-600 text-base leading-relaxed mt-2">
            包含<span class="font-semibold text-[#E29930]">3000+ 常用漢字</span>，預計定價 <span
              class="text-lg font-bold text-[#E29930]">NT$99</span>
          </p>
          <p class="text-sm text-gray-500 mt-3 italic">
            ❓ 想了解您對這樣的產品是否有興趣
          </p>
        </div>

        <div class="space-y-4">
          <!-- 有興趣選項 - 調查問卷風格 -->
          <button @click="handleSurveyResponse(true)" :disabled="isSubmitting" :class="[
            'w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 group',
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          ]">
            <div v-if="isSubmitting" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <svg v-else class="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor"
              viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <div class="text-left">
              <div class="text-lg">✅ 很有興趣！</div>
              <div class="text-sm text-white text-opacity-90">這個價位可以接受</div>
            </div>
          </button>

          <!-- 普通興趣選項 -->
          <button @click="handleSurveyResponse('maybe')" :disabled="isSubmitting" :class="[
            'w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 hover:shadow-lg hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-2',
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          ]">
            <div v-if="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd" />
            </svg>
            <div>
              <div class="text-base">🤔 有點興趣，但需要考慮</div>
            </div>
          </button>

          <!-- 沒興趣選項 - 設計得較小但仍然友好 -->
          <button @click="handleSurveyResponse(false)" :disabled="isSubmitting" :class="[
            'w-full bg-gray-100 hover:bg-gray-200 text-slate-600 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2',
            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
          ]">
            <div v-if="isSubmitting" class="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-600"></div>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293-1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd" />
            </svg>
            完全沒興趣
          </button>
        </div>

        <!-- 小字提示 -->
        <div class="mt-6 space-y-2">
          <p class="text-xs text-gray-400 text-center">
            📝 此為匿名市場調查，僅用於了解用戶需求，不會有任何後續聯繫或付費要求
          </p>
          <div v-if="userState.isAuthenticated"
            class="flex items-center justify-center gap-2 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-full">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clip-rule="evenodd" />
            </svg>
            每個帳號僅能參與一次調查，已與您的帳號綁定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { navigateTo } from 'nuxt/app'
import { userState } from '~/composables/useAuth.js'
import { useSurvey } from '~/composables/useSurvey.js'

// 暫時移除 middleware，先讓頁面正常運行
// definePageMeta({
//   middleware: 'auth'
// })

// Initialize survey composable
const { hasVoted, isSubmitting, isChecking, checkUserHasVoted, submitSurveyResponse } = useSurvey()

// State Management - 第一階段（上傳）
const file = ref(null)
const previewUrl = ref('')
const loading = ref(false)
const selectedExample = ref(null)
const inputCharacter = ref('早')  // 新增：使用者輸入的字元

// State Management - 第二階段（調整）
const generatedImage = ref('')
const styleOption = ref('')  // 改為空字符串，表示未選中任何風格
const alpha = ref(0.5)
const thickness = ref(0)
const blendedImage = ref('')
const blendLoading = ref(false)

// State Management - 第三階段（生成與問卷）
const finalGenerating = ref(false)
const finalGenerated = ref(false)
const showSurveyModal = ref(false)
const surveyCompleted = ref(false)
const jumpCountdown = ref(0) // 新增：跳轉倒計時

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
    console.warn('請先登入再使用生成字型功能');
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

    // 添加字元參數
    formData.append('character', inputCharacter.value)
    formData.append('sampling_step', '15')

    if (selectedExample.value) {
      // Handle example selection
      const exampleImageUrl = `/ex${selectedExample.value}.png`
      const response = await fetch(exampleImageUrl)
      if (!response.ok) throw new Error('無法載入範例圖片')

      const blob = await response.blob()
      const exampleFile = new File([blob], `example${selectedExample.value}.png`, { type: 'image/png' })
      formData.append('reference_image', exampleFile)

    } else if (file.value) {
      // Handle file upload
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

    // 確保 result.image 存在
    if (!result.image) {
      throw new Error('API 回應中沒有圖片資料')
    }

    // 設定生成的圖片 (進入第二階段)
    generatedImage.value = result.image

    // 同時儲存到 localStorage (為了相容性)
    localStorage.setItem('fonty_api_image', result.image)

  } catch (error) {
    console.error('Generation failed:', error)
    console.error('生成失敗，請稍後再試：' + error.message)
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

  // 重置第三階段狀態
  finalGenerating.value = false
  finalGenerated.value = false
  showSurveyModal.value = false
  surveyCompleted.value = false
  jumpCountdown.value = 0 // 重置跳轉倒計時

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

    formData.append('character', inputCharacter.value) // 使用相同的字元
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

  } catch (error) {
    console.error('Blend failed:', error)
    console.error('融合失敗，請稍後重試：' + error.message)
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

// Methods - 第三階段：最終生成與問卷
const generateFinalFont = async () => {
  if (finalGenerating.value || finalGenerated.value) return

  finalGenerating.value = true

  try {
    // 模擬完整字型生成過程（實際上會調用不同的 API）
    await new Promise(resolve => setTimeout(resolve, 3000)) // 3秒模擬生成時間

    finalGenerated.value = true

    // 等待一段時間後檢查用戶投票狀態並顯示問卷
    setTimeout(async () => {
      if (userState.isAuthenticated) {
        // 檢查用戶是否已經投過票
        const userHasVoted = await checkUserHasVoted()

        if (!userHasVoted) {
          // 用戶未投票，顯示問卷
          showSurveyModal.value = true
        } else {
          // 用戶已投票，直接跳轉
          startJumpCountdown()
        }
      } else {
        // 未登入用戶直接跳轉
        startJumpCountdown()
      }
    }, 2000)

  } catch (error) {
    console.error('Final font generation failed:', error)
    console.error('字型生成失敗，請稍後再試：' + error.message)
    // 即使失敗也要跳轉到 template 頁面
    setTimeout(() => {
      startJumpCountdown()
    }, 1000)
  } finally {
    finalGenerating.value = false
  }
}

const handleSurveyResponse = async (response) => {
  if (isSubmitting.value) return

  try {
    // 轉換回應為標準格式
    let responseType = ''
    if (response === true) {
      responseType = 'very_interested'
    } else if (response === 'maybe') {
      responseType = 'maybe_interested'
    } else {
      responseType = 'not_interested'
    }

    // 提交到 Firebase
    await submitSurveyResponse(responseType)

    surveyCompleted.value = true
    showSurveyModal.value = false

    // 顯示感謝訊息
    let message = ''
    if (response === true) {
      message = '🎉 謝謝您的回饋！您的意見對我們很重要，我們會持續改進產品品質！'
    } else if (response === 'maybe') {
      message = '🤔 謝謝您的誠實回饋！我們會根據用戶意見調整產品規劃！'
    } else {
      message = '😊 謝謝您參與調查！每個用戶的想法都幫助我們了解市場需求！'
    }

    setTimeout(() => {
      console.log(message)
      // 問卷完成後，跳轉到 template 頁面
      navigateToTemplate()
    }, 500)

  } catch (error) {
    console.error('提交問卷失敗:', error)

    if (error.message.includes('已經投過票')) {
      console.log('⚠️ 您已經參與過這個調查了，感謝您的支持！')
    } else if (error.message.includes('未登入')) {
      console.log('⚠️ 請先登入後再參與調查')
    } else {
      console.error('❌ 提交失敗，請稍後再試')
    }

    // 即使失敗也關閉模態框避免重複嘗試
    showSurveyModal.value = false

    // 即使問卷失敗，也跳轉到 template 頁面
    setTimeout(() => {
      navigateToTemplate()
    }, 1000)
  }
}

// 新增：跳轉到 template 頁面的函數
const navigateToTemplate = () => {
  // 將字型圖片數據存儲到 localStorage，供 template 頁面使用
  const fontData = {
    referenceImage: generatedImage.value,
    blendedImage: blendedImage.value || generatedImage.value,
    styleOption: styleOption.value,
    alpha: alpha.value,
    thickness: thickness.value,
    timestamp: Date.now()
  }

  localStorage.setItem('workshop_font_data', JSON.stringify(fontData))

  // 跳轉到 template 頁面
  navigateTo('/template')
}

const closeSurveyModal = () => {
  // 如果用戶關閉彈窗而沒有選擇，也標記為完成以避免重複顯示
  surveyCompleted.value = true
  showSurveyModal.value = false

  // 關閉問卷後，也跳轉到 template 頁面
  setTimeout(() => {
    navigateToTemplate()
  }, 500)
}

// 新增：開始跳轉倒計時的函數
const startJumpCountdown = () => {
  // 直接跳轉，不需要倒計時
  navigateToTemplate()
}

// 新增：開始預覽字型風格的函數
const startPreview = () => {
  console.log('🚀 立即應用函數被調用')
  console.log('📸 當前字型狀態:')
  console.log('- character:', inputCharacter.value)
  console.log('- generatedImage:', generatedImage.value)
  console.log('- blendedImage:', blendedImage.value)
  console.log('- styleOption:', styleOption.value)
  console.log('- alpha:', alpha.value)
  console.log('- thickness:', thickness.value)
  
  // 將字型圖片數據存儲到 localStorage，供 template 頁面使用
  const fontData = {
    character: inputCharacter.value,
    referenceImage: generatedImage.value,
    blendedImage: blendedImage.value || generatedImage.value,
    styleOption: styleOption.value,
    alpha: alpha.value,
    thickness: thickness.value,
    timestamp: Date.now()
  }

  console.log('💾 準備存儲到 localStorage 的數據:', fontData)

  localStorage.setItem('workshop_font_data', JSON.stringify(fontData))

  console.log('✅ 數據已存儲到 localStorage')
  console.log('🔄 準備跳轉到 template 頁面')

  // 跳轉到 template 頁面
  navigateTo('/template')
}

// 組件掛載時檢查用戶投票狀態
onMounted(async () => {
  // 如果用戶已登入，檢查是否已投票
  if (userState.isAuthenticated && userState.user?.uid) {
    await checkUserHasVoted()

    // 開發調試：在 console 顯示投票狀態
    console.log('📊 用戶投票狀態:', {
      hasVoted: hasVoted.value,
      userUID: userState.user.uid,
      userEmail: userState.user.email
    })
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
