<template>
  <div
    class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50"
  >
    <Navbar />

    <div class="max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-28">
      <!-- Header Section -->
      <div class="text-center mb-8 md:mb-12">
        <div class="inline-block mb-6">
          <div class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <svg class="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
            </svg>
          </div>
        </div>
        
        <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 leading-tight">
          手寫風格
          <span class="bg-gradient-to-r from-[#E29930] to-[#D48826] bg-clip-text text-transparent">模板創作</span>
        </h1>
        <p class="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          選擇模板 → 上傳手寫字 → 生成字型 → 即時預覽與下載
        </p>
        
        <!-- 進度指示器 -->
        <div class="flex items-center justify-center gap-2 mt-6">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#E29930] rounded-full"></div>
            <span class="text-sm text-slate-500">選擇模板</span>
          </div>
          <div class="w-8 h-1 bg-gradient-to-r from-[#E29930] to-gray-200 rounded-full"></div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span class="text-sm text-slate-400">生成字型</span>
          </div>
          <div class="w-8 h-1 bg-gradient-to-r from-gray-200 to-gray-200 rounded-full"></div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
            <span class="text-sm text-slate-400">下載成品</span>
          </div>
        </div>
      </div>

      <!-- 主要內容區域 -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-10">
        <!-- 左側控制面板 -->
        <div class="lg:col-span-5 space-y-6">
          <!-- 模板選擇 -->
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-[#3A6B60] to-[#5EA897] rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h2 class="text-xl md:text-2xl font-bold text-slate-800">選擇模板</h2>
            </div>
            
            <div class="grid grid-cols-3 gap-4">
              <button
                v-for="tpl in templates"
                :key="tpl.id"
                @click="selectTemplate(tpl.id)"
                :class="[
                  'group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105',
                  currentTemplateId === tpl.id
                    ? 'border-[#E29930] ring-4 ring-[#E29930]/20 shadow-2xl'
                    : 'border-gray-200 hover:border-[#E29930]/50 hover:shadow-lg',
                ]"
              >
                <div class="relative aspect-[4/3]">
                  <img
                    :src="tpl.thumbnail"
                    :alt="tpl.name"
                    class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div class="absolute bottom-0 inset-x-0 p-3">
                    <div class="text-white text-sm md:text-base font-semibold text-center">{{ tpl.name }}</div>
                  </div>
                  
                  <!-- 選中指示器 -->
                  <div v-if="currentTemplateId === tpl.id" 
                       class="absolute top-3 right-3 w-6 h-6 bg-[#E29930] rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- 手寫風格生成 -->
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <h2 class="text-xl md:text-2xl font-bold text-slate-800">手寫風格</h2>
              </div>
              
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" :class="hasGeneratedFonts ? 'bg-green-500 animate-pulse' : 'bg-amber-400'"></div>
                <span class="text-sm font-medium" :class="hasGeneratedFonts ? 'text-green-600' : 'text-amber-600'">
                  {{ hasGeneratedFonts ? '已生成' : '待生成' }}
                </span>
              </div>
            </div>

            <div class="space-y-6">
              <!-- 上傳區域 -->
              <div class="space-y-3">
                <label class="text-sm font-medium text-slate-700">上傳手寫參考圖片</label>
                <div class="relative">
                  <input
                    type="file"
                    accept="image/png"
                    @change="onRefImageChange"
                    class="hidden"
                    id="ref-image-upload"
                  />
                  <label
                    for="ref-image-upload"
                    class="group cursor-pointer block"
                  >
                    <div class="border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-[#E29930] hover:bg-[#E29930]/5 transition-all duration-300 group-hover:scale-[1.02]">
                      <div class="text-center">
                        <div class="w-12 h-12 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                          </svg>
                        </div>
                        <p class="text-sm font-medium text-slate-700 mb-1">點擊上傳 PNG 圖片</p>
                        <p class="text-xs text-slate-500">建議使用清晰的手寫字圖片</p>
                      </div>
                    </div>
                  </label>
                </div>
                
                <!-- 已上傳的圖片預覽 -->
                <div v-if="referenceImage" class="mt-3 p-3 bg-green-50 rounded-xl border border-green-200">
                  <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <span class="text-sm font-medium text-green-700">{{ referenceImage.name }}</span>
                  </div>
                </div>
              </div>

              <!-- 取樣步數控制 -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="text-sm font-medium text-slate-700">AI 生成品質</label>
                  <span class="text-xs bg-[#E29930]/10 text-[#E29930] px-2 py-1 rounded-full font-medium">
                    {{ samplingStep }}
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  v-model.number="samplingStep"
                  class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-slider-orange"
                />
                <div class="flex justify-between text-xs text-slate-500">
                  <span>快速</span>
                  <span>高品質</span>
                </div>
              </div>

              <!-- 生成狀態 -->
              <div class="bg-slate-50 rounded-xl p-4">
                <div class="text-xs text-slate-600 mb-2">
                  將生成 <span class="font-semibold text-[#E29930]">{{ uniqueChars.length }}</span> 個字元
                  <span class="text-slate-400">（已勾選 {{ selectedKeys.length }}/{{ currentSlots.length }} 個區塊）</span>
                </div>
                
                <!-- 生成按鈕 -->
                <button
                  @click="batchGenerateFonts"
                  :disabled="!referenceImage || batching || uniqueChars.length === 0"
                  :class="[
                    'w-full group relative overflow-hidden rounded-xl font-semibold transition-all duration-300',
                    !referenceImage || batching || uniqueChars.length === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white hover:shadow-xl hover:scale-[1.02] active:scale-98',
                  ]"
                >
                  <div class="relative z-10 flex items-center justify-center gap-3 px-6 py-4">
                    <div v-if="batching" class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                    </svg>
                    <span>
                      {{ batching ? `生成中… (${doneCount}/${uniqueChars.length})` : "🎨 生成手寫字體" }}
                    </span>
                  </div>
                  
                  <!-- 進度條背景 -->
                  <div v-if="batching" 
                       class="absolute inset-0 bg-gradient-to-r from-[#5EA897] to-[#3A6B60] transition-all duration-300"
                       :style="{ width: `${(doneCount / uniqueChars.length) * 100}%` }">
                  </div>
                </button>
              </div>

              <!-- 錯誤提示 -->
              <div v-if="failures.length" class="bg-red-50 border border-red-200 rounded-xl p-4">
                <div class="flex items-center gap-2 mb-2">
                  <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-sm font-medium text-red-700">生成失敗的字元</span>
                </div>
                <p class="text-sm text-red-600">{{ failures.join("") }}</p>
              </div>
            </div>
          </div>

          <!-- 內容編輯 -->
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-[#5EA897] to-[#3A6B60] rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.49 3.17c-.38-.38-1.01-.38-1.39 0L2.89 10.7a.98.98 0 000 1.39l7.21 7.53c.38.38 1.01.38 1.39 0l7.21-7.53c.38-.38.38-1.01 0-1.39L11.49 3.17zM12 5.5l5.5 5.75L12 17 6.5 11.25 12 5.5z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h2 class="text-xl md:text-2xl font-bold text-slate-800">編輯內容</h2>
              </div>
              
              <label class="inline-flex items-center gap-2 text-sm font-medium text-slate-600 select-none cursor-pointer">
                <input
                  type="checkbox"
                  v-model="allSelected"
                  class="w-4 h-4 accent-[#3A6B60] rounded"
                />
                全選
              </label>
            </div>

            <div v-if="currentSlots.length" class="space-y-4">
              <div
                v-for="slot in currentSlots"
                :key="slot.key"
                class="space-y-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
              >
                <div class="flex items-center justify-between">
                  <label class="text-sm font-semibold text-slate-700">{{ slot.label }}</label>
                  <label class="inline-flex items-center gap-2 text-xs text-slate-600 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      v-model="slotSelected[slot.key]"
                      class="w-3 h-3 accent-[#3A6B60] rounded"
                    />
                    生成
                  </label>
                </div>
                
                <textarea
                  v-model="slotInputs[slot.key]"
                  :rows="slot.multiline ? 3 : 2"
                  class="w-full rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#5EA897] focus:border-transparent text-slate-800 p-3 text-sm resize-none transition-all duration-200"
                  :placeholder="slot.placeholder || `輸入${slot.label}...`"
                ></textarea>
                
                <div class="flex items-center justify-between text-xs text-slate-500">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-1 bg-slate-200 rounded-full">{{ slot.align.toUpperCase() }}</span>
                    <span class="px-2 py-1 bg-slate-200 rounded-full">{{ slot.fontSize }}px</span>
                  </div>
                  <span class="text-slate-400">使用生成字體</span>
                </div>
              </div>
            </div>
            
            <div v-else class="text-center py-8 text-slate-500">
              <svg class="w-12 h-12 mx-auto mb-3 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
              </svg>
              <p class="text-sm">請先選擇模板</p>
            </div>
          </div>
        </div>

        <!-- 右側預覽區域 -->
        <div class="lg:col-span-7 space-y-6">
          <!-- 即時預覽 -->
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-xl flex items-center justify-center">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <h2 class="text-xl md:text-2xl font-bold text-slate-800">即時預覽</h2>
              </div>
              
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" :class="hasGeneratedFonts ? 'bg-green-500 animate-pulse' : 'bg-amber-400'"></div>
                <span class="text-xs font-medium" :class="hasGeneratedFonts ? 'text-green-600' : 'text-amber-600'">
                  {{ hasGeneratedFonts ? "使用生成字體" : "使用預設字體" }}
                </span>
              </div>
            </div>

            <div
              ref="canvasWrap"
              class="relative w-full bg-white overflow-hidden rounded-2xl border-2 border-slate-200 shadow-lg"
              :style="{ aspectRatio: computedAspect }"
            >
              <img
                v-if="currentTemplate.bg"
                ref="bgEl"
                :src="currentTemplate.bg"
                class="absolute inset-0 w-full h-full object-contain select-none"
                alt="背景"
                @load="onBgLoad"
              />

              <template v-for="slot in currentSlots" :key="slot.key">
                <div
                  class="absolute text-slate-800 whitespace-pre-wrap"
                  :style="slotStyle(slot, true)"
                >
                  <!-- 如果有生成的字體，使用圖片字體 -->
                  <template v-if="hasGeneratedFonts && slotInputs[slot.key]">
                    <template v-for="(char, index) in (slotInputs[slot.key] || '').split('')" :key="index">
                      <img 
                        v-if="generatedFontImages.get(char)" 
                        :src="generatedFontImages.get(char)" 
                        :alt="char"
                        class="inline-block align-text-bottom"
                        :style="{
                          height: `${slot.fontSize}px`,
                          width: 'auto',
                          verticalAlign: 'baseline',
                          lineHeight: '1'
                        }"
                      />
                      <span v-else class="inline-block" :style="{ fontSize: `${slot.fontSize}px` }">{{ char }}</span>
                    </template>
                  </template>
                  
                  <!-- 沒有生成字體時，使用預設文字 -->
                  <span v-else :style="{ fontSize: `${slot.fontSize}px` }">
                    {{ slotInputs[slot.key] }}
                  </span>
                </div>
              </template>
              
              <!-- 預覽遮罩 -->
              <div v-if="!currentTemplate.bg" class="absolute inset-0 flex items-center justify-center bg-slate-100">
                <div class="text-center text-slate-400">
                  <svg class="w-16 h-16 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                  </svg>
                  <p class="text-sm">選擇模板以開始預覽</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 下載區域 -->
          <div class="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 p-6 md:p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-xl flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                </svg>
              </div>
              <h2 class="text-xl md:text-2xl font-bold text-slate-800">下載成品</h2>
            </div>

            <div class="space-y-4">
              <button
                @click="exportAsPNG"
                :disabled="!hasGeneratedFonts"
                :class="[
                  'w-full group relative overflow-hidden rounded-xl font-semibold transition-all duration-300',
                  hasGeneratedFonts
                    ? 'bg-gradient-to-r from-[#E29930] to-[#D48826] text-white hover:shadow-xl hover:scale-[1.02] active:scale-98'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                ]"
              >
                <div class="relative z-10 flex items-center justify-center gap-3 px-6 py-4">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <span>
                    {{ hasGeneratedFonts ? "下載高解析度 PNG" : "請先生成字體" }}
                  </span>
                </div>
              </button>
              
              <div class="text-center">
                <p class="text-xs text-slate-500 mb-2">支援高解析度輸出，完美呈現手寫風格</p>
                <div class="flex items-center justify-center gap-2 text-xs text-slate-400">
                  <span class="px-2 py-1 bg-slate-100 rounded-full">PNG 格式</span>
                  <span class="px-2 py-1 bg-slate-100 rounded-full">高解析度</span>
                  <span class="px-2 py-1 bg-slate-100 rounded-full">即時預覽</span>
                </div>
              </div>
            </div>

            <!-- 錯誤提示 -->
            <div v-if="errorMsg" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                </svg>
                <span class="text-sm text-red-700">{{ errorMsg }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成進度遮罩 -->
    <div
      v-if="batching"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm pointer-events-none z-[60]"
    >
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full mx-4">
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-[#E29930] to-[#D48826] rounded-full flex items-center justify-center mx-auto mb-4">
            <div class="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">正在生成字體</h3>
          <p class="text-sm text-slate-600 mb-4">AI 正在為您創建獨特的手寫風格</p>
          
          <!-- 進度條 -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div class="bg-gradient-to-r from-[#E29930] to-[#D48826] h-2 rounded-full transition-all duration-300"
                 :style="{ width: `${(doneCount / uniqueChars.length) * 100}%` }">
            </div>
          </div>
          
          <p class="text-sm text-slate-500">{{ doneCount }} / {{ uniqueChars.length }} 字元完成</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";

// 導入 html2canvas
import html2canvas from 'html2canvas';

// ===== 服務端設定 =====
const API_BASE_URL = "https://typersonal.dy6.click/8000"; // 生成單字圖片 API

// ===== 模板（固定背景／位置／樣式） =====
// 重新設計美觀的賀卡模板
const templates = [
  {
    id: "wedding",
    name: "結婚賀卡",
    aspect: "4 / 3",
    bg: "/cards/wedding_bg.png",
    slots: [
      {
        key: "title",
        label: "標題",
        x: 50,
        y: 15,
        w: 40,
        fontSize: 32,
        fontWeight: "bold",
        align: "center",
        color: "#8B4513",
        defaultText: "新婚快樂"
      },
      {
        key: "message",
        label: "祝福語",
        x: 20,
        y: 45,
        w: 60,
        fontSize: 24,
        lineHeight: 1.5,
        align: "center",
        color: "#2F4F4F",
        defaultText: "願你們白頭偕老\n永結同心"
      },
      {
        key: "signature",
        label: "簽名",
        x: 70,
        y: 75,
        w: 20,
        fontSize: 20,
        align: "right",
        color: "#8B4513",
        defaultText: "祝福者"
      }
    ]
  },
  {
    id: "love",
    name: "情書",
    aspect: "3 / 4",
    bg: "/cards/love_bg.png",
    slots: [
      {
        key: "greeting",
        label: "問候",
        x: 20,
        y: 20,
        w: 60,
        fontSize: 28,
        fontWeight: "bold",
        align: "center",
        color: "#DC143C",
        defaultText: "親愛的"
      },
      {
        key: "content",
        label: "內容",
        x: 15,
        y: 40,
        w: 70,
        fontSize: 22,
        lineHeight: 1.6,
        align: "left",
        color: "#2F4F4F",
        defaultText: "每一天都因為有你\n而變得更加美好"
      },
      {
        key: "ending",
        label: "結尾",
        x: 60,
        y: 75,
        w: 30,
        fontSize: 20,
        align: "center",
        color: "#DC143C",
        defaultText: "愛你的我"
      }
    ]
  },
  {
    id: "journal",
    name: "手寫帳",
    aspect: "16 / 9",
    bg: "/cards/journal_bg.png",
    slots: [
      {
        key: "date",
        label: "日期",
        x: 10,
        y: 10,
        w: 25,
        fontSize: 18,
        align: "left",
        color: "#2F4F4F",
        defaultText: "2024年12月"
      },
      {
        key: "entry",
        label: "日記內容",
        x: 15,
        y: 30,
        w: 70,
        fontSize: 20,
        lineHeight: 1.4,
        align: "left",
        color: "#2F4F4F",
        defaultText: "今天的心情很好\n記錄下這美好的一天"
      }
    ]
  }
];

// ===== 狀態 =====
const currentTemplateId = ref("wedding");
const errorMsg = ref("");

// 產字參數與結果
const samplingStep = ref(15);
const referenceImage = ref(null);
const batching = ref(false);
const doneCount = ref(0);
const failures = ref([]);

// 生成的字體圖片
const generatedFontImages = ref(new Map()); // char -> imageUrl
const hasGeneratedFonts = computed(() => generatedFontImages.value.size > 0);

// 欄位內容 & 勾選狀態
const slotInputs = reactive({});
const slotSelected = reactive({}); // key -> boolean（是否要生成）

const generatedAny = computed(() =>
  Object.values(slotInputs).some((v) => (v || "").length > 0)
);
const currentTemplate = computed(
  () => templates.find((t) => t.id === currentTemplateId.value) || { slots: [] }
);
const currentSlots = computed(() => currentTemplate.value.slots || []);

const allSelected = computed({
  get() {
    return (
      currentSlots.value.length > 0 &&
      currentSlots.value.every((s) => !!slotSelected[s.key])
    );
  },
  set(v) {
    currentSlots.value.forEach((s) => (slotSelected[s.key] = !!v));
  },
});

const selectedKeys = computed(() =>
  currentSlots.value.filter((s) => !!slotSelected[s.key]).map((s) => s.key)
);

// 簡化模板選擇函數
function selectTemplate(id) {
  currentTemplateId.value = id;
  const tpl = templates.find((t) => t.id === id);
  if (!tpl) return;

  // 重設輸入與勾選
  const newInputs = {};
  Object.keys(slotInputs).forEach((k) => delete slotInputs[k]);
  Object.keys(slotSelected).forEach((k) => delete slotSelected[k]);
  for (const s of tpl.slots) {
    newInputs[s.key] = s.defaultText || "";
    slotSelected[s.key] = true; // 預設全選
  }
  Object.assign(slotInputs, newInputs);
  
  nextTick(() => {
    updateContainRect();
  });
}

// 從被勾選的欄位收集唯一字元
const uniqueChars = computed(() => {
  let s = "";
  for (const k of selectedKeys.value) s += slotInputs[k] || "";
  const arr = Array.from(s || "").filter((ch) => ch && ch.trim().length);
  return Array.from(new Set(arr));
});

function onRefImageChange(e) {
  const f = e.target.files?.[0] || null;
  if (f && f.type !== "image/png") {
    alert("請上傳 PNG 檔");
    e.target.value = "";
    referenceImage.value = null;
    return;
  }
  referenceImage.value = f;
}

// 批量生成字型圖片
async function batchGenerateFonts() {
  if (!referenceImage.value) {
    alert("請先上傳你的手寫字（PNG）");
    return;
  }
  if (selectedKeys.value.length === 0) {
    alert("請先勾選欲生成的區塊");
    return;
  }
  if (uniqueChars.value.length === 0) {
    alert("勾選的區塊沒有可生成的字");
    return;
  }

  batching.value = true;
  doneCount.value = 0;
  failures.value = [];
  errorMsg.value = "";
  
  // 清空之前的生成結果
  generatedFontImages.value.clear();
  
  console.log(`開始生成 ${uniqueChars.value.length} 個字元:`, uniqueChars.value);

  for (const ch of uniqueChars.value) {
    try {
      const form = new FormData();
      form.append("character", ch);
      form.append("sampling_step", String(samplingStep.value));
      form.append("reference_image", referenceImage.value);

      console.log(`正在生成字元: ${ch}`);
      
      const res = await fetch(`${API_BASE_URL}/ai/generate`, {
        method: "POST",
        body: form,
      });
      
      if (!res.ok) throw new Error("模型服務回應失敗");
      const data = await res.json();
      if (!data?.image) throw new Error("缺少 image URL");

      // 將生成的圖片URL存儲到Map中
      generatedFontImages.value.set(ch, data.image);
      console.log(`字元 ${ch} 生成成功:`, data.image);
      
    } catch (e) {
      console.error("生成失敗：", ch, e);
      failures.value.push(ch);
    } finally {
      doneCount.value += 1;
    }
  }

  if (generatedFontImages.value.size === 0) {
    errorMsg.value = "全部字元皆產生失敗，請稍後重試";
  } else {
    errorMsg.value = "";
    console.log(`成功生成 ${generatedFontImages.value.size} 個字元:`, Array.from(generatedFontImages.value.keys()));
    
    // 強制更新預覽
    await nextTick();
    updateContainRect();
  }

  batching.value = false;
}

// ===== 預覽與匯出 =====
const canvasWrap = ref(null);
const bgEl = ref(null);
const bgMeta = reactive({ w: 0, h: 0 });
const containRect = reactive({ x: 0, y: 0, w: 0, h: 0 });

const computedAspect = computed(() => {
  if (bgMeta.w > 0 && bgMeta.h > 0) return `${bgMeta.w} / ${bgMeta.h}`;
  return currentTemplate.value.aspect || "3 / 2";
});

function onBgLoad(e) {
  const img = e.target;
  bgMeta.w = img.naturalWidth;
  bgMeta.h = img.naturalHeight;
  updateContainRect();
}

function onResize() {
  updateContainRect();
}

onMounted(() => {
  selectTemplate(currentTemplateId.value);
  window.addEventListener("resize", onResize);
  updateContainRect();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

// 移除舊的 Canvas 相關函數，因為現在使用 HTML2Canvas
// 使用生成的字體圖片繪製文字
// async function drawTextBlockWithGeneratedFonts(ctx, text, x, y, w, slot) {
//   if (!text) return;
//   
//   const fontSize = slot.fontSize || 20;
//   const scale = 3; // 放大倍數
//   const scaledFontSize = fontSize * scale;
//   
//   ctx.textBaseline = "top";
//   ctx.textAlign = slot.align;
//   
//   const lines = (text || "").split("\n");
//   const lh = (slot.lineHeight ? slot.lineHeight : 1.4) * scaledFontSize;
//   
//   let currentY = y;
//   
//   for (const line of lines) {
//     const words = line.split("");
//     let currentX = x;
//     
//     if (slot.align === "center") {
//       currentX = x + w / 2;
//     } else if (slot.align === "right") {
//       currentX = x + w;
//     }
//     
//     for (const char of words) {
//       if (char.trim() === "") {
//         // 空格處理
//         const spaceWidth = scaledFontSize * 0.5;
//         currentX += spaceWidth;
//         continue;
//       }
//       
//       if (generatedFontImages.value.has(char)) {
//         // 使用生成的字體圖片
//         const img = new Image();
//         img.crossOrigin = "anonymous";
//         await new Promise((resolve, reject) => {
//           img.onload = resolve;
//           img.onerror = reject;
//           img.src = generatedFontImages.value.get(char);
//         });
//         
//         const charWidth = (img.width / img.height) * scaledFontSize;
//         ctx.drawImage(img, currentX, currentY, charWidth, scaledFontSize);
//         currentX += charWidth;
//       } else {
//         // 沒有生成的字體圖片，使用預設字體
//         ctx.font = `${scaledFontSize}px Arial`;
//         ctx.fillStyle = "#1f2937";
//         ctx.fillText(char, currentX, currentY);
//         currentX += ctx.measureText(char).width;
//       }
//     }
//     
//     currentY += lh;
//   }
// }

// 移除舊的圖片繪製函數
// async function drawImageScaled(ctx, src, x, y, w, h) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => {
//       ctx.drawImage(img, x, y, w, h);
//       resolve();
//     };
//     img.onerror = reject;
//     img.src = src;
//   });
// }

// 簡化座標計算，確保預覽正常顯示
function slotStyle(slot, asText = false) {
  const rect = containRect;
  const { x, y, w } = slotPixelsForRect(slot, rect);
  
  const style = { 
    position: 'absolute',
    top: `${y}px`, 
    width: `${w}px`,
    zIndex: 10
  };
  
  if (slot.align === 'center') { 
    style.left = `${x}px`; 
    style.transform = 'translateX(-50%)'; 
    style.textAlign = 'center'; 
  }
  else if (slot.align === 'right') { 
    style.left = `${x}px`; 
    style.transform = 'translateX(-100%)'; 
    style.textAlign = 'right'; 
  }
  else { 
    style.left = `${x}px`; 
    style.textAlign = 'left'; 
  }
  
  if (asText) {
    style.fontSize = (slot.fontSize || 20) + 'px';
    style.lineHeight = String(slot.lineHeight || 1.3);
    style.whiteSpace = 'pre-wrap';
    style.color = slot.color || '#1f2937';
    style.fontWeight = slot.fontWeight || 'normal';
    
    // 如果有生成的字體，使用圖片字體
    if (hasGeneratedFonts.value) {
      style.fontFamily = 'Arial, sans-serif'; // 備用字體
    }
  }
  
  return style;
}

// 簡化座標計算函數
function slotPixelsForRect(slot, rect) {
  const xPct = slot.x / 100;
  const yPct = slot.y / 100;
  const wPct = slot.w / 100;
  
  const x = rect.x + rect.w * xPct;
  const y = rect.y + rect.h * yPct;
  const w = rect.w * wPct;
  
  return { x, y, w };
}

// 簡化背景圖片計算函數
function calcContainRect(boxW, boxH, imgW, imgH) {
  if (!imgW || !imgH) return { x: 0, y: 0, w: boxW, h: boxH };
  
  const imgR = imgW / imgH;
  const boxR = boxW / boxH;
  
  if (imgR > boxR) {
    const w = boxW;
    const h = boxW / imgR;
    return { x: 0, y: (boxH - h) / 2, w, h };
  } else {
    const h = boxH;
    const w = boxH * imgR;
    return { x: (boxW - w) / 2, y: 0, w, h };
  }
}

// 簡化更新容器尺寸函數
function updateContainRect() {
  nextTick(() => {
    const wrap = canvasWrap.value;
    if (!wrap || !bgMeta.w || !bgMeta.h) return;
    
    const cw = wrap.clientWidth;
    const ch = wrap.clientHeight;
    const imgR = bgMeta.w / bgMeta.h;
    const boxR = cw / ch;
    
    if (imgR > boxR) {
      const w = cw;
      const h = cw / imgR;
      containRect.x = 0;
      containRect.y = (ch - h) / 2;
      containRect.w = w;
      containRect.h = h;
    } else {
      const h = ch;
      const w = ch * imgR;
      containRect.x = (cw - w) / 2;
      containRect.y = 0;
      containRect.w = w;
      containRect.h = h;
    }
  });
}

// 輸出圖片

// 使用 HTML2Canvas 下載，確保與預覽完全一致
async function exportAsPNG() {
  if (!hasGeneratedFonts.value) {
    alert("請先生成字體");
    return;
  }

  try {
    // 獲取預覽容器
    const previewContainer = canvasWrap.value;
    if (!previewContainer) {
      throw new Error("無法找到預覽容器");
    }

    // 顯示載入狀態
    errorMsg.value = "正在生成圖片...";
    
    // 使用 HTML2Canvas 截圖，確保與預覽完全一致
    const canvas = await html2canvas(previewContainer, {
      scale: 2, // 2x 縮放，提高圖片品質
      useCORS: true, // 允許跨域圖片
      allowTaint: true, // 允許外部圖片
      backgroundColor: null, // 保持透明背景
      width: previewContainer.scrollWidth,
      height: previewContainer.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: previewContainer.scrollWidth,
      windowHeight: previewContainer.scrollHeight
    });

    // 下載圖片
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `card_${currentTemplateId.value}_${new Date().getTime()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    errorMsg.value = "";
    console.log("圖片匯出成功！使用 HTML2Canvas 確保與預覽完全一致");
  } catch (error) {
    console.error("匯出失敗:", error);
    errorMsg.value = "匯出失敗：" + error.message;
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// 移除舊的圖片繪製函數
// async function drawImageScaled(ctx, src, x, y, w, h) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => {
//       ctx.drawImage(img, x, y, w, h);
//       resolve();
//     };
//     img.onerror = reject;
//     img.src = src;
//   });
// }
</script>

<style scoped>
/* 範圍滑塊樣式 */
.range-slider-orange {
  -webkit-appearance: none;
  appearance: none;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(
    to right,
    #d1d5db 0%,
    #d1d5db 50%,
    #e29930 50%,
    #e29930 100%
  );
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.range-slider-orange:hover {
  background: linear-gradient(
    to right,
    #d1d5db 0%,
    #d1d5db 50%,
    #d48826 50%,
    #d48826 100%
  );
}

.range-slider-orange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e29930, #d48826);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(226, 153, 48, 0.4);
  transition: all 0.2s ease;
}

.range-slider-orange::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(226, 153, 48, 0.6);
}

.range-slider-orange::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e29930, #d48826);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(226, 153, 48, 0.4);
  transition: all 0.2s ease;
}

.range-slider-orange::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(226, 153, 48, 0.6);
}

/* 自定義動畫 */
@keyframes scale-98 {
  0% { transform: scale(1); }
  100% { transform: scale(0.98); }
}

.active\:scale-98:active {
  animation: scale-98 0.1s ease-out;
}

/* 玻璃擬態效果 */
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}

/* 漸變文字效果 */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}

/* 懸停效果 */
.group:hover .group-hover\:scale-110 {
  transform: scale(1.1);
}

.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* 進度條動畫 */
@keyframes progress-glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.progress-glow {
  animation: progress-glow 2s ease-in-out infinite;
}

/* 響應式設計優化 */
@media (max-width: 1024px) {
  .lg\:grid-cols-12 {
    grid-template-columns: 1fr;
  }
  
  .lg\:col-span-5,
  .lg\:col-span-7 {
    grid-column: span 1;
  }
}

/* 深色模式支援 */
@media (prefers-color-scheme: dark) {
  .bg-white\/80 {
    background-color: rgba(30, 41, 59, 0.8);
  }
  
  .border-white\/20 {
    border-color: rgba(255, 255, 255, 0.1);
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
  
  .bg-slate-50 {
    background-color: rgba(30, 41, 59, 0.5);
  }
  
  .border-slate-200 {
    border-color: rgba(148, 163, 184, 0.3);
  }
}

/* 動畫優化 */
.transition-all {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.duration-300 {
  transition-duration: 300ms;
}

/* 陰影效果 */
.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* 邊框圓角 */
.rounded-2xl {
  border-radius: 1rem;
}

.rounded-3xl {
  border-radius: 1.5rem;
}

/* 字體優化 */
.font-semibold {
  font-weight: 600;
}

.font-bold {
  font-weight: 700;
}

/* 間距優化 */
.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-3 > * + * {
  margin-top: 0.75rem;
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
}
</style>
