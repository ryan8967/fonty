<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
    <!-- 導航欄 -->
    <Navbar />
    
    <!-- 頁面標題區域 -->
    <div class="relative overflow-hidden bg-white/80 backdrop-blur-md border-b border-white/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div class="text-center">
          <!-- 主圖標 -->
          <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#5EA897] to-[#3A6B60] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
          </div>
          
          <!-- 標題 -->
          <h1 class="text-2xl md:text-4xl font-bold text-slate-400 mb-3">
            選擇您的
            <span class="bg-gradient-to-r from-[#5EA897] to-[#3A6B60] bg-clip-text text-transparent">專屬模板</span>
          </h1>
          
          <!-- 副標題 -->
          <p class="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            從我們精心設計的模板中選擇，每個模板都經過精心設計，讓您的個人化創作更加完美
          </p>
          
          <!-- 進度指示器 -->
          <div class="flex items-center justify-center gap-2 mt-6">
            <div class="w-8 h-1 bg-gradient-to-r from-[#5EA897] to-gray-200 rounded-full"></div>
            <div class="w-8 h-1 bg-gradient-to-r from-[#5EA897] to-gray-200 rounded-full"></div>
            <div class="w-8 h-1 bg-gradient-to-r from-[#5EA897] to-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要內容區域 -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <!-- 模板網格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        
        <!-- 結婚賀卡模板 -->
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
          <div class="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <!-- 模板縮圖 -->
            <div class="relative overflow-hidden">
              <img 
                src="/cards/wedding_thumb.png" 
                alt="結婚賀卡模板"
                class="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              <!-- 漸變遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <!-- 模板標籤 -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-semibold rounded-full shadow-md">
                  熱門
                </span>
              </div>
              
              <!-- 模板類型圖標 -->
              <div class="absolute top-4 right-4">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 模板信息 -->
            <div class="p-4 md:p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg md:text-xl font-bold text-slate-800">結婚賀卡</h3>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span class="text-xs text-green-600 font-medium">推薦</span>
                </div>
              </div>
              
              <p class="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
                專為婚禮設計的優雅賀卡模板，包含標題、祝福語和簽名區域，讓您傳達最真摯的祝福
              </p>
              
              <!-- 模板特色 -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>3個文字區域</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>4:3 橫向比例</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>優雅婚禮風格</span>
                </div>
              </div>
              
              <!-- 選擇按鈕 -->
              <button
                @click="selectTemplate('wedding')"
                class="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-[#5EA897] to-[#3A6B60] text-white rounded-xl font-semibold hover:from-[#4a9178] hover:to-[#2d5248] transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>選擇此模板</span>
                <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 情書模板 -->
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
          <div class="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <!-- 模板縮圖 -->
            <div class="relative overflow-hidden">
              <img 
                src="/cards/love_thumb.png" 
                alt="情書模板"
                class="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              <!-- 漸變遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <!-- 模板標籤 -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-xs font-semibold rounded-full shadow-md">
                  浪漫
                </span>
              </div>
              
              <!-- 模板類型圖標 -->
              <div class="absolute top-4 right-4">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 模板信息 -->
            <div class="p-4 md:p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg md:text-xl font-bold text-slate-800">情書</h3>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>
                  <span class="text-xs text-rose-600 font-medium">浪漫</span>
                </div>
              </div>
              
              <p class="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
                充滿愛意的情書模板，適合表達內心深處的情感，包含問候、內容和結尾三個區域
              </p>
              
              <!-- 模板特色 -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>3個文字區域</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>3:4 縱向比例</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>溫馨浪漫風格</span>
                </div>
              </div>
              
              <!-- 選擇按鈕 -->
              <button
                @click="selectTemplate('love')"
                class="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>選擇此模板</span>
                <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 手寫帳模板 -->
        <div class="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
          <div class="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
            <!-- 模板縮圖 -->
            <div class="relative overflow-hidden">
              <img 
                src="/cards/journal_thumb.png" 
                alt="手寫帳模板"
                class="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              <!-- 漸變遮罩 -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              
              <!-- 模板標籤 -->
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-semibold rounded-full shadow-md">
                  實用
                </span>
              </div>
              
              <!-- 模板類型圖標 -->
              <div class="absolute top-4 right-4">
                <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- 模板信息 -->
            <div class="p-4 md:p-6">
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg md:text-xl font-bold text-slate-800">手寫帳</h3>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span class="text-xs text-blue-600 font-medium">實用</span>
                </div>
              </div>
              
              <p class="text-slate-600 text-sm md:text-base mb-4 leading-relaxed">
                適合日常記錄的手寫帳模板，包含日期、標題和內容區域，讓您的記錄更加整齊美觀
              </p>
              
              <!-- 模板特色 -->
              <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>3個文字區域</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>16:9 橫向比例</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-slate-500">
                  <svg class="w-3 h-3 text-[#5EA897]" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>簡潔實用風格</span>
                </div>
              </div>
              
              <!-- 選擇按鈕 -->
              <button
                @click="selectTemplate('journal')"
                class="w-full px-6 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.01] active:scale-99 shadow-md hover:shadow-lg flex items-center justify-center gap-3 group"
              >
                <span>選擇此模板</span>
                <svg class="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部說明 -->
      <div class="mt-16 md:mt-20 text-center">
        <div class="bg-white/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/40 shadow-lg">
          <div class="w-16 h-16 bg-gradient-to-br from-[#5EA897] to-[#3A6B60] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-md">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          
          <h3 class="text-xl md:text-2xl font-bold text-slate-900 mb-4 leading-tight">
            選擇模板後，您可以：
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div class="flex items-start gap-3 p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200/50 hover:border-[#5EA897]/30 transition-all duration-200 hover:shadow-md">
              <div class="w-8 h-8 bg-gradient-to-br from-[#5EA897] to-[#3A6B60] rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-left">
                <h4 class="font-bold text-slate-900 mb-1 text-base">編輯內容</h4>
                <p class="text-slate-700 text-sm leading-relaxed">在選定的模板中輸入您的文字內容，讓每個字都充滿個人特色</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3 p-3 bg-gradient-to-br from-amber-50 to-orange-100/50 rounded-xl border border-amber-200/50 hover:border-[#E29930]/30 transition-all duration-200 hover:shadow-md">
              <div class="w-8 h-8 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-left">
                <h4 class="font-bold text-slate-900 mb-1 text-base">生成字型</h4>
                <p class="text-slate-700 text-sm leading-relaxed">使用AI生成您專屬的手寫字型風格，創造獨一無二的視覺效果</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3 p-3 bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-xl border border-green-200/50 hover:border-[#5EA897]/30 transition-all duration-200 hover:shadow-md">
              <div class="w-8 h-8 bg-gradient-to-br from-[#5EA897] to-[#3A6B60] rounded-lg flex items-center justify-center flex-shrink-0 mt-1 shadow-md">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="text-left">
                <h4 class="font-bold text-slate-900 mb-1 text-base">下載成品</h4>
                <p class="text-slate-700 text-sm leading-relaxed">將完成的個人化作品下載為高品質圖片，永久保存您的創作</p>
              </div>
            </div>
          </div>
          
          <!-- 額外提示 -->
          <div class="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
            <div class="flex items-center justify-center gap-2 mb-2">
              <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <span class="text-base font-bold text-blue-800">開始您的創作之旅</span>
            </div>
            <p class="text-blue-700 text-sm leading-relaxed">
              每個模板都經過精心設計，確保最佳的視覺效果和用戶體驗。選擇您喜歡的模板，開始創造屬於您的個人化作品！
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 選擇模板函數 - 優化版本
function selectTemplate(templateId) {
  // 移除 console.log 以提高性能
  // console.log('選擇模板:', templateId);
  
  // 將選擇的模板ID存儲到localStorage，以便在template.vue中使用
  localStorage.setItem('selected_template_id', templateId);
  
  // 跳轉到template.vue頁面
  navigateTo('/template');
}

// 頁面標題
useHead({
  title: '選擇模板 - 個人化模板創作',
  meta: [
    { name: 'description', content: '從我們精心設計的模板中選擇，每個模板都經過精心設計，讓您的個人化創作更加完美' }
  ]
});

// 性能優化：延遲載入非關鍵資源
onMounted(() => {
  // 使用 requestIdleCallback 在瀏覽器空閒時預載入圖片
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const images = document.querySelectorAll('img[loading="lazy"]');
      images.forEach(img => {
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
      });
    });
  }
});
</script>

<style scoped>
/* 自定義動畫 - 優化版本 */
@keyframes scale-99 {
  0% { transform: scale(1); }
  100% { transform: scale(0.99); }
}

.active\:scale-99:active {
  animation: scale-99 0.1s ease-out;
}

/* 玻璃擬態效果 - 降低模糊強度 */
.backdrop-blur-md {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* 漸變文字效果 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* 懸停效果 - 減少變形幅度 */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* 陰影效果 - 減少陰影強度 */
.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 邊框圓角 */
.rounded-2xl {
  border-radius: 1rem;
}

/* 字體優化 */
.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

/* 間距優化 */
.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

/* 性能優化 */
* {
  will-change: auto;
}

/* 減少重繪 */
.group {
  transform: translateZ(0);
}

/* 優化動畫性能 */
.transition-all {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.transition-transform {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 響應式間距 */
@media (max-width: 768px) {
  .space-y-6 > * + * {
    margin-top: 1rem;
  }
  
  .space-y-4 > * + * {
    margin-top: 0.75rem;
  }
  
  .space-y-3 > * + * {
    margin-top: 0.5rem;
  }
  
  .space-y-2 > * + * {
    margin-top: 0.25rem;
  }
}

/* 動畫優化 */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-500 {
  transition-duration: 500ms;
}

.duration-700 {
  transition-duration: 700ms;
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .bg-white\/90 {
    background-color: rgba(30, 41, 59, 0.9);
  }
  
  .border-white\/30 {
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .text-slate-800 {
    color: #f1f5f9;
  }
  
  .text-slate-600 {
    color: #cbd5e1;
  }
  
  .text-slate-500 {
    color: #94a3b8;
  }
  
  .bg-white\/60 {
    background-color: rgba(30, 41, 59, 0.6);
  }
}

/* 響應式設計優化 */
@media (max-width: 1024px) {
  .lg\:grid-cols-3 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .md\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .lg\:grid-cols-3 {
    grid-template-columns: 1fr;
  }
}
</style>

