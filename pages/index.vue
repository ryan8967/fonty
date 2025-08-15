<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
    <!-- 使用現有的 Navbar Component -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative pt-16 md:pt-32 pb-8 md:pb-24 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-40"></div>
        <div class="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full blur-3xl opacity-30"></div>
        <div class="absolute top-40 right-1/3 w-72 h-72 bg-gradient-to-br from-[#3A6B60]/10 to-[#5EA897]/10 rounded-full blur-3xl opacity-25"></div>
      </div>
      
      <div class="relative max-w-6xl mx-auto px-4 md:px-6 text-center">
        <!-- Brand Identity -->
        <div class="mb-6 md:mb-16">
          <div class="inline-block mb-4 md:mb-10">
            <img src="/typersonal3.png" alt="Typersonal Logo" class="w-16 h-16 md:w-32 md:h-32 mx-auto object-contain">
          </div>
          
          <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-6 md:mb-8 font-medium px-4">
            {{ displayText }}<span class="animate-pulse text-orange-500">|</span>
          </p>
        </div>

        <!-- Typography Showcase -->
        <div class="mb-8 md:mb-16">
          <!-- 增強版字訂藝動畫 -->
          <div class="relative flex justify-center items-center space-x-4 sm:space-x-6 md:space-x-12 mb-6 md:mb-12">
            <!-- 背景裝飾 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/30 to-transparent blur-sm"></div>
            <div class="absolute -inset-4 bg-gradient-to-r from-[#3A6B60]/5 via-transparent to-[#5EA897]/5 rounded-3xl"></div>
            
            <!-- 字 -->
            <div class="char-container relative group select-none">
              <div class="absolute -inset-2 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="relative text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-slate-800 cursor-pointer transform transition-all duration-700 hover:scale-110 hover:rotate-3 hover:text-orange-600 select-none" 
                   style="animation: float1 4s ease-in-out infinite;">
                字
              </div>
              <!-- 裝飾元素 -->
              <div class="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-2 h-2 md:w-3 md:h-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full opacity-60 animate-ping"></div>
            </div>
            
            <!-- 訂 -->
            <div class="char-container relative group select-none">
              <div class="absolute -inset-2 bg-gradient-to-br from-[#3A6B60]/20 to-[#5EA897]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="relative text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-medium text-slate-600 cursor-pointer transform transition-all duration-700 hover:scale-110 hover:-rotate-2 hover:text-[#3A6B60] select-none" 
                   style="animation: float2 4s ease-in-out infinite 0.5s;">
                訂
              </div>
              <!-- 裝飾元素 -->
              <div class="absolute -bottom-0.5 -left-0.5 md:-bottom-1 md:-left-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-br from-[#3A6B60] to-[#5EA897] rounded-full opacity-70 animate-pulse"></div>
            </div>
            
            <!-- 藝 -->
            <div class="char-container relative group select-none">
              <div class="absolute -inset-2 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="relative text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-light text-slate-400 cursor-pointer transform transition-all duration-700 hover:scale-110 hover:rotate-1 hover:text-yellow-600 select-none" 
                   style="animation: float3 4s ease-in-out infinite 1s;">
                藝
              </div>
              <!-- 裝飾元素 -->
              <div class="absolute -top-0.5 left-1/2 md:-top-1 w-0.5 h-2 md:w-1 md:h-4 bg-gradient-to-t from-transparent to-yellow-500 rounded-full opacity-50 animate-bounce"></div>
            </div>
            
          </div>
          
          <!-- 底部描述文字 -->
          <div class="text-center">
            <p class="text-lg text-slate-600 mb-2">創意 × 技術 × 藝術</p>
            <div class="flex justify-center items-center space-x-2 text-sm text-slate-500">
              <span class="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full">字型設計</span>
              <span class="w-1 h-1 bg-[#3A6B60] rounded-full"></span>
              <span class="px-3 py-1 bg-gradient-to-r from-[#3A6B60]/10 to-[#5EA897]/10 rounded-full">AI 生成</span>
              <span class="w-1 h-1 bg-orange-400 rounded-full"></span>
              <span class="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full">個性化</span>
            </div>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="mb-12 md:mb-20">
          <div v-if="!user && !isLoading" class="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 mb-6 md:mb-8 px-4">
            <NuxtLink 
              to="/workshop" 
              class="group w-full sm:w-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
            >
              <span class="flex items-center justify-center space-x-3">
                <svg class="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <span>開始創作</span>
              </span>
            </NuxtLink>
            
            <button class="group w-full sm:w-auto bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white px-8 md:px-10 py-3 md:py-4 rounded-full font-bold text-lg md:text-xl shadow-2xl hover:shadow-[#3A6B60]/25 hover:scale-105 transition-all duration-300">
              <span class="flex items-center justify-center space-x-3">
                <svg class="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"/>
                </svg>
                <span>觀看演示</span>
              </span>
            </button>
          </div>
          
          <div v-else-if="user" class="max-w-md mx-auto">
            <div class="bg-white rounded-3xl p-8 shadow-xl border border-orange-100">
              <div class="mb-6">
                <img 
                  :src="user.photoURL || '/default-avatar.svg'" 
                  :alt="user.displayName || '使用者'"
                  class="w-20 h-20 rounded-full mx-auto border-4 border-orange-500 shadow-lg"
                >
              </div>
              <h2 class="text-2xl font-bold text-slate-800 mb-2">
                歡迎回來，{{ user.displayName || '創作者' }}！
              </h2>
              <p class="text-slate-600 mb-6">準備創造新的字型奇蹟嗎？</p>
              <div class="flex flex-col gap-3">
                <NuxtLink 
                  to="/create" 
                  class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-full font-semibold text-center hover:shadow-lg transition-all duration-200"
                >
                  字型工坊
                </NuxtLink>
                <NuxtLink 
                  to="/market" 
                  class="bg-white text-slate-700 px-6 py-3 rounded-full font-semibold border-2 border-orange-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 text-center"
                >
                  字型市場
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Trust Indicators -->
          <div class="text-center text-slate-500 text-sm mt-12">
            <p class="mb-6">免費開始，無需信用卡</p>
            <div class="flex flex-wrap items-center justify-center gap-8">
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>10,000+ 活躍用戶</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>99.9% 正常運行時間</span>
              </div>
              <div class="flex items-center space-x-2">
                <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span>專業級品質輸出</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 md:px-6">
        <div class="text-center mb-16 md:mb-20">
          <h2 class="text-3xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 md:mb-8">
            為什麼選擇 Typersonal
          </h2>
          <p class="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
            結合最先進的 AI 技術與直觀的設計工具，讓字型創作變得簡單而強大
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div class="group bg-gradient-to-br from-white to-orange-50 rounded-3xl p-10 border border-slate-100 hover:border-orange-200 hover:shadow-2xl transition-all duration-500">
            <div class="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-6">AI 智慧生成</h3>
            <p class="text-slate-600 leading-relaxed mb-6">運用先進的人工智慧技術，根據你的需求自動生成獨特字型，讓創作變得輕鬆有趣。</p>
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div class="h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full w-[95%] transition-all duration-1000"></div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-white to-[#3A6B60]/5 rounded-3xl p-10 border border-slate-100 hover:border-[#3A6B60]/30 hover:shadow-2xl hover:shadow-[#3A6B60]/10 transition-all duration-500">
            <div class="w-20 h-20 bg-gradient-to-br from-[#3A6B60] to-[#5EA897] rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-6">即時預覽</h3>
            <p class="text-slate-600 leading-relaxed mb-6">所見即所得的設計體驗，每一個調整都能即時看到效果，大幅提升創作效率。</p>
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div class="h-2 bg-gradient-to-r from-[#3A6B60] to-[#5EA897] rounded-full w-[92%] transition-all duration-1000"></div>
            </div>
          </div>

          <div class="group bg-gradient-to-br from-white to-amber-50 rounded-3xl p-10 border border-slate-100 hover:border-amber-200 hover:shadow-2xl transition-all duration-500">
            <div class="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"/>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-6">一鍵分享</h3>
            <p class="text-slate-600 leading-relaxed mb-6">完成創作後可一鍵分享到社群平台，或直接下載高品質字型檔案供商業使用。</p>
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div class="h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-[88%] transition-all duration-1000"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

<!-- Interactive Demo Section -->
<section id="demo" class="py-32 bg-gradient-to-br from-orange-50 via-white to-amber-50 relative overflow-hidden">
  <!-- 柔和背景光暈（更少、更淡） -->
  <div class="pointer-events-none absolute inset-0">
    <div class="absolute -top-10 left-1/3 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-orange-100/50 to-amber-100/30 blur-3xl"></div>
    <div class="absolute -bottom-10 right-1/3 w-[22rem] h-[22rem] rounded-full bg-gradient-to-br from-[#3A6B60]/10 to-[#5EA897]/10 blur-3xl"></div>
  </div>

  <div class="relative max-w-6xl mx-auto px-6">
    <!-- Header（極簡） -->
    <div class="text-center mb-16">
      <h2 class="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
        即時字型預覽
      </h2>
      <p class="mt-4 text-slate-500 text-base md:text-lg">
        自動輪播字型與品牌色，靜靜展示質感
      </p>
    </div>

    <!-- Minimal Preview Card -->
    <div class="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-[28px] shadow-[0_10px_40px_-10px_rgba(2,6,23,0.08)] overflow-hidden">
      <!-- 細框頂欄 -->
      <div class="flex items-center justify-between px-6 md:px-8 py-4 border-b border-slate-100">
        <div class="flex items-center gap-2">
          <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span class="text-sm text-slate-500">Live</span>
        </div>
        <span class="text-sm text-slate-400">Auto Preview</span>
      </div>

      <!-- 大字區（主角） -->
      <div class="relative p-10 md:p-16 isolate">
        <!-- 文字/字型切換過場（更順） -->
        <Transition name="fade-scale" mode="out-in">
          <div
            :key="currentFontIndex + '-' + currentAutoTextIndex"
            class="relative z-10 font-preview select-none text-center leading-[1.05] tracking-tight transition-all duration-1000"
            :style="autoFontStyle"
          >
            <div class="text-[9vw] md:text-[7vw] lg:text-[6vw]">
              {{ autoDisplayText }}
            </div>
          </div>
        </Transition>

        <!-- shimmer 放最底層，避免遮到任何互動元素 -->
        <div class="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>

        <!-- 次資訊（單行膠囊） -->
        <div class="relative z-10 mt-6 flex items-center justify-center gap-3">
          <span class="px-3 py-1 rounded-full border border-slate-200 text-xs text-slate-600 bg-white/70">
            {{ currentAutoFont.name }}
          </span>
          <span
            v-if="currentAutoFont.isHandwriting"
            class="px-2.5 py-1 rounded-full text-[11px] bg-orange-50 text-orange-600 border border-orange-200"
          >
            手寫
          </span>
        </div>
      </div>

      <!-- 底部輕量控制顯示 -->
      <div class="px-8 pb-10">
        <!-- 品牌色點（帶微縮放過場） -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <span
            v-for="(color, index) in demoColors"
            :key="index"
            class="w-7 h-7 rounded-full border transition-all duration-300 will-change-transform"
            :class="index === currentColorIndex ? 'scale-110 border-slate-400' : 'scale-100 border-slate-200'"
            :style="{ backgroundColor: color }"
          ></span>
        </div>

        <!-- 字重細條（修正圓點被裁、層級正確） -->
<!-- 字重細條（平滑補間 + 層級正確） -->
<div class="mx-auto max-w-2xl pt-3 pb-2">
  <div class="relative h-1.5 w-full rounded-full bg-slate-200 overflow-visible">
    <!-- 背景漸變進度條（會隨權重平滑伸縮） -->
    <div
      class="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-300 to-orange-500/80 transition-all duration-700 ease-out will-change-[width]"
      :style="{ width: `${(animatedFontWeight - 100) / 8}%` }"
    ></div>

    <!-- 透明擴大點擊層（預留互動） -->
    <div class="absolute inset-x-0 -top-2 -bottom-2"></div>

    <!-- 指示圓點（綁 animatedFontWeight，使用 left 動畫） -->
    <div
      class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-4 h-4 rounded-full bg-white border border-orange-500 shadow-sm transition-[left] duration-700 ease-out"
      :style="{ left: `${(animatedFontWeight - 100) / 8}%` }"
    ></div>
  </div>
  <div class="mt-2 text-center text-xs text-slate-400">
    Weight {{ animatedFontWeight }}
  </div>
</div>

      </div>
    </div>

    <!-- CTA（單主鍵 + 次要連結，留白大） -->
    <div class="text-center mt-16">
      <NuxtLink
        to="/font-preview"
        class="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold bg-slate-900 hover:opacity-90 transition"
      >
        進入字型預覽
        <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h9.586l-3.293-3.293a1 1 0 111.414-1.414l5.001 5a1 1 0 010 1.414l-5 5.001a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 01-1-1z" clip-rule="evenodd"/>
        </svg>
      </NuxtLink>
      <div class="mt-4">
        <NuxtLink to="/workshop" class="text-slate-500 hover:text-slate-700 text-sm underline-offset-4 hover:underline">
          先看看範例
        </NuxtLink>
      </div>
    </div>
  </div>
</section>



    <!-- Stats Section -->
    <section class="py-24 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-4xl font-bold mb-6">受到全球創作者信賴</h2>
          <p class="text-orange-100 text-xl">數據說明一切</p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8 text-center">
          <div class="group">
            <div class="text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ animatedStats[0] }}+
            </div>
            <div class="text-xl text-orange-100 mb-2 font-semibold">活躍用戶</div>
            <div class="text-orange-200 text-sm">來自全球的創作者</div>
          </div>
          
          <div class="group">
            <div class="text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ animatedStats[1] }}+
            </div>
            <div class="text-xl text-orange-100 mb-2 font-semibold">字型作品</div>
            <div class="text-orange-200 text-sm">已創建的字型數量</div>
          </div>
          
          <div class="group">
            <div class="text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              {{ animatedStats[2] }}%
            </div>
            <div class="text-xl text-orange-100 mb-2 font-semibold">滿意度</div>
            <div class="text-orange-200 text-sm">用戶推薦比例</div>
          </div>
          
          <div class="group">
            <div class="text-6xl font-black text-white mb-4 group-hover:scale-110 transition-transform duration-300">
              24/7
            </div>
            <div class="text-xl text-orange-100 mb-2 font-semibold">全天候</div>
            <div class="text-orange-200 text-sm">服務支援時間</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-32 bg-white">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <h2 class="text-5xl md:text-6xl font-black text-slate-800 mb-8">
          準備開始你的創作之旅？
        </h2>
        <p class="text-2xl text-slate-600 mb-16 leading-relaxed max-w-3xl mx-auto">
          加入數千位創作者，使用 AI 技術打造屬於你的獨特字型風格
        </p>
        
        <div v-if="!user" class="mb-16">
          <NuxtLink 
            to="/workshop" 
            class="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-16 py-5 rounded-full font-black text-2xl shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
          >
            免費開始創作
          </NuxtLink>
          <p class="text-slate-500 mt-6 text-lg">完全免費，無需信用卡</p>
        </div>
        
        <!-- Features Grid -->
        <div class="grid md:grid-cols-3 gap-8 mt-20">
          <div class="text-center p-8 bg-gradient-to-br from-white to-green-50 rounded-2xl border border-green-100">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 mb-3 text-lg">快速上手</h3>
            <p class="text-slate-600">5 分鐘即可創建你的第一個字型</p>
          </div>
          
          <div class="text-center p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl border border-blue-100">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 mb-3 text-lg">專業品質</h3>
            <p class="text-slate-600">商業級字型輸出，隨時可用</p>
          </div>
          
          <div class="text-center p-8 bg-gradient-to-br from-white to-purple-50 rounded-2xl border border-purple-100">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
              </svg>
            </div>
            <h3 class="font-bold text-slate-800 mb-3 text-lg">社群支持</h3>
            <p class="text-slate-600">活躍的創作者社群，互相學習</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Modern Footer -->
    <footer class="bg-slate-900 text-white">
      <div class="max-w-6xl mx-auto px-6 py-20">
        <div class="grid md:grid-cols-4 gap-12 mb-16">
          <!-- Brand Section -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-4 mb-8">
              <div class="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <img src="/typersonal2.png" alt="Typersonal" class="w-6 h-6 object-contain">
              </div>
              <div>
                <h3 class="text-2xl font-bold">Typersonal</h3>
                <p class="text-slate-400">AI 驅動的字型生成平台</p>
              </div>
            </div>
            <p class="text-slate-300 leading-relaxed mb-8 max-w-md text-lg">
              讓 AI 技術賦能您的創意，輕鬆創造獨特、美觀的字型設計。從概念到完成品，我們提供完整的字型創作解決方案。
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Product Links -->
          <div>
            <h4 class="text-white font-bold mb-6 text-lg">產品</h4>
            <ul class="space-y-4">
              <li><a href="/" class="text-slate-300 hover:text-white transition-colors">首頁</a></li>
              <li><a href="/create" class="text-slate-300 hover:text-white transition-colors">字型創作</a></li>
              <li><a href="/market" class="text-slate-300 hover:text-white transition-colors">字型市集</a></li>
              <li><a href="/workshop" class="text-slate-300 hover:text-white transition-colors">上傳字型</a></li>
            </ul>
          </div>

          <!-- Support Links -->
          <div>
            <h4 class="text-white font-bold mb-6 text-lg">支援</h4>
            <ul class="space-y-4">
              <li><a href="#" class="text-slate-300 hover:text-white transition-colors">使用教學</a></li>
              <li><a href="#" class="text-slate-300 hover:text-white transition-colors">常見問題</a></li>
              <li><a href="#" class="text-slate-300 hover:text-white transition-colors">聯絡我們</a></li>
              <li><a href="#" class="text-slate-300 hover:text-white transition-colors">回報問題</a></li>
            </ul>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="border-t border-slate-800 pt-8">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="text-slate-400 mb-4 md:mb-0">
              © 2025 Typersonal. 保留所有權利。
            </div>
            <div class="flex items-center space-x-8">
              <a href="#" class="text-slate-400 hover:text-white transition-colors">隱私政策</a>
              <a href="#" class="text-slate-400 hover:text-white transition-colors">服務條款</a>
              <a href="#" class="text-slate-400 hover:text-white transition-colors">Cookie 政策</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";

// 設置頁面元數據
useHead({
  title: 'Typersonal - AI 驅動的字型生成平台',
  meta: [
    { name: 'description', content: '使用 AI 技術創造獨特的字型設計，讓每個人都能輕鬆創作專業級字型。' },
    { name: 'keywords', content: '字型設計, AI字型, 字體創作, 字型生成器, 個性化字體' },
    { property: 'og:title', content: 'Typersonal - AI 驅動的字型生成平台' },
    { property: 'og:description', content: '使用 AI 技術創造獨特的字型設計，讓每個人都能輕鬆創作專業級字型。' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ]
})

// 認證狀態 - 先設為 null，在客戶端初始化
const user = ref(null)
const isLoading = ref(true)

// 客戶端初始化認證
onMounted(async () => {
  if (process.client) {
    try {
      const { useAuth } = await import('~/composables/useAuth.js')
      const auth = useAuth()
      user.value = auth.user
      isLoading.value = auth.isLoading
    } catch (error) {
      console.error('Authentication initialization failed:', error)
      isLoading.value = false
    }
  } else {
    isLoading.value = false
  }
})

// 打字機效果
const texts = [
  "創造獨特字型風格",
  "AI 智慧字型生成", 
  "個性化字體設計",
  "字型個人化工具"
]
const displayText = ref("")
const currentTextIndex = ref(0)
const currentCharIndex = ref(0)
const isDeleting = ref(false)

// 現代化演示樣式 - 簡化版自動演示
const demoText = ref("繁體字型預覽")
const previewMode = ref('single') // 'single' 或 'paragraph'
const selectedStyle = ref(0)
const modernDemoStyles = ref([
  { 
    name: "優雅細線",
    css: { 
      fontSize: "3rem", 
      fontWeight: "300", 
      color: "#ea580c",
      letterSpacing: "0.05em"
    } 
  },
  { 
    name: "經典粗體",
    css: { 
      fontSize: "3rem", 
      fontWeight: "700", 
      color: "#f59e0b",
      textShadow: "0 4px 12px rgba(245, 158, 11, 0.3)"
    } 
  },
  { 
    name: "現代襯線",
    css: { 
      fontSize: "3rem", 
      fontWeight: "400", 
      color: "#d97706",
      fontFamily: "Georgia, serif"
    } 
  }
])

// 自動演示變數
const currentAutoTextIndex = ref(0)
const currentFontIndex = ref(0)
const currentColorIndex = ref(0)
const autoFontWeight = ref(400)
const autoShadowIntensity = ref(30)

// 自動演示文字
const autoTexts = ref([
  '繁體中文',
  '手寫溫度', 
  '創意靈感',
  'AI智慧',
  '書法藝術'
])

// 演示字型 - 簡潔的手寫風格顯示
const previewFonts = ref([
  { name: '手寫風1', category: '經典風格', isHandwriting: true },
  { name: '手寫風2', category: '流暢筆觸', isHandwriting: true },
  { name: '手寫風3', category: '藝術風格', isHandwriting: true },
  { name: '手寫風4', category: '優雅手寫', isHandwriting: true },
  { name: '手寫風5', category: '現代手感', isHandwriting: true },
  { name: '手寫風6', category: '進階版本', isHandwriting: true }
])

// 演示顏色 - 符合網站整體色系的和諧配色
const demoColors = ref([
  '#E29930', // 主要橙色 - 網站品牌色
  '#3A6B60', // 深藍綠色 - 網站輔助色
  '#5EA897', // 淺藍綠色 - 網站漸變色
  '#D48826', // 深橙色 - 橙色變化
  '#2D5A52'  // 更深藍綠 - 穩重色調
])

// 手寫字型列表（用於自動演示）
const autoFontFamilies = ref([
  { name: "手寫風1", css: "'Jason Handwriting 1', '華文行楷', cursive" },
  { name: "手寫風2", css: "'Jason Handwriting 2', '華文行楷', cursive" },
  { name: "手寫風3", css: "'Jason Handwriting 3', '華文行楷', cursive" },
  { name: "手寫風4", css: "'Jason Handwriting 4', '華文行楷', cursive" },
  { name: "手寫風5", css: "'Jason Handwriting 5', '華文行楷', cursive" },
  { name: "手寫風6", css: "'Jason Handwriting 5p', '華文行楷', cursive" },
  { name: "思源黑體", css: "'Noto Sans TC', 'Microsoft JhengHei', '微軟正黑體', sans-serif" },
  { name: "思源宋體", css: "'Noto Serif TC', 'Times New Roman', '新細明體', serif" }
])

// 計算自動演示的字型樣式
const autoFontStyle = computed(() => ({
  fontFamily: autoFontFamilies.value[currentFontIndex.value]?.css,
  fontWeight: autoFontWeight.value,
  color: demoColors.value[currentColorIndex.value],
  textShadow: autoShadowIntensity.value > 30 
    ? `0 4px 12px ${demoColors.value[currentColorIndex.value]}30` 
    : 'none',
  transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
}))

// 當前自動字型
const currentAutoFont = computed(() => autoFontFamilies.value[currentFontIndex.value] || autoFontFamilies.value[0])

// 自動顯示文字
const autoDisplayText = computed(() => autoTexts.value[currentAutoTextIndex.value])

// 即時字型控制
const fontWeight = ref(400)
const letterSpacing = ref(0.1)
const lineHeight = ref(1.2)
const selectedFontIndex = ref(0)
const selectedTextColor = ref('#E29930')
const textShadowIntensity = ref(30)
const textTransform = ref('none')

// 支援繁體中文的字型選項，包含豐富的手寫體
const fontFamilies = ref([
  {
    name: "思源黑體",
    css: "'Noto Sans TC', 'Microsoft JhengHei', sans-serif",
    preview: "繁體中文預覽",
    description: "現代無襯線字型，清晰易讀",
    isHandwriting: false
  },
  {
    name: "思源宋體",
    css: "'Noto Serif TC', 'Ming', serif", 
    preview: "繁體中文預覽",
    description: "優雅的襯線字型",
    isHandwriting: false
  },
  {
    name: "微軟正黑體",
    css: "'Microsoft JhengHei', '微軟正黑體', sans-serif",
    preview: "繁體中文預覽", 
    description: "Windows 系統預設字型",
    isHandwriting: false
  },
  {
    name: "華康手札體",
    css: "'DFKai-SB', '標楷體', cursive",
    preview: "繁體中文預覽",
    description: "傳統手寫風格",
    isHandwriting: true
  },
  {
    name: "書法家行書",
    css: "'LiHei Pro', '蘋果儷中黑', cursive",
    preview: "繁體中文預覽",
    description: "流暢的行書風格", 
    isHandwriting: true
  },
  {
    name: "手寫體",
    css: "'Kalam', '華文行楷', cursive",
    preview: "繁體中文預覽",
    description: "自然手寫感",
    isHandwriting: true
  },
  {
    name: "文鼎UD晶熙黑體",
    css: "'AR UDJingxihei', 'Microsoft JhengHei', sans-serif",
    preview: "繁體中文預覽",
    description: "現代圓潤設計",
    isHandwriting: false
  },
  {
    name: "儷宋體",
    css: "'LiSong Pro', '細明體', serif",
    preview: "繁體中文預覽", 
    description: "經典宋體設計",
    isHandwriting: false
  },
  {
    name: "娃娃體",
    css: "'童趣體', '華康娃娃體', fantasy",
    preview: "繁體中文預覽",
    description: "可愛童趣風格",
    isHandwriting: true
  },
  {
    name: "草書體", 
    css: "'草書', '華文草書', cursive",
    preview: "繁體中文預覽",
    description: "飄逸草書風格",
    isHandwriting: true
  },
  {
    name: "隸書體",
    css: "'隸書', '華文隸書', serif",
    preview: "繁體中文預覽",
    description: "古典隸書風格",
    isHandwriting: false
  },
  {
    name: "楷體",
    css: "'楷體', 'DFKai-SB', serif",
    preview: "繁體中文預覽",
    description: "工整楷書風格",
    isHandwriting: true
  }
])

// 文字顏色選項
const textColors = ref([
  { name: '橙色', value: '#ea580c' },
  { name: '藍色', value: '#2563eb' },
  { name: '綠色', value: '#059669' },
  { name: '紫色', value: '#9333ea' },
  { name: '紅色', value: '#dc2626' },
  { name: '黃色', value: '#d97706' },
  { name: '灰色', value: '#4b5563' },
  { name: '黑色', value: '#1f2937' }
])

// 快速測試範例
const quickTestSamples = ref([
  { text: '繁體中文', description: '基礎測試', mode: 'single' },
  { text: '你好世界', description: '常用詞彙', mode: 'single' },
  { text: '設計師', description: '專業術語', mode: 'single' },
  { text: '創意靈感', description: '抽象概念', mode: 'single' },
  { text: 'Hello 中文', description: '中英混合', mode: 'single' },
  { text: '2025年', description: '數字測試', mode: 'single' },
  { text: '字型設計是一門結合藝術與技術的專業領域，它要求設計師具備深厚的文字美學素養。', description: '長文本測試', mode: 'paragraph' },
  { text: '臺灣繁體', description: '地區用字', mode: 'single' },
  { text: '書法藝術', description: '傳統文化', mode: 'single' },
  { text: 'AI智慧', description: '現代科技', mode: 'single' },
  { text: '永無島', description: '創意詞彙', mode: 'single' },
  { text: '手寫溫度', description: '情感表達', mode: 'single' }
])

// 字型對比功能
const showComparison = ref(false)
const comparisonFont1 = ref(0) // 思源黑體
const comparisonFont2 = ref(3) // 華康手札體

// 計算當前選中的字型
const selectedFont = computed(() => fontFamilies.value[selectedFontIndex.value])

// ---- 平滑補間用的動畫字重 ----
const animatedFontWeight = ref(autoFontWeight.value)

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/**
 * 將 animatedFontWeight 在 duration 內從目前值補間到 target
 */
const tweenToWeight = (target, duration = 700) => {
  const start = performance.now()
  const from = animatedFontWeight.value
  const delta = target - from

  const step = (now) => {
    const p = Math.min((now - start) / duration, 1)
    animatedFontWeight.value = Math.round(from + delta * easeOutCubic(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// 當 autoFontWeight 改變（你的定時器會換值），用補間慢慢滑過去
watch(autoFontWeight, (to) => {
  tweenToWeight(to, 700) // 700ms 可自行調整
})


// 計算完整的字型樣式
const computedFontStyle = computed(() => {
  const shadowIntensity = textShadowIntensity.value / 100
  const shadowBlur = Math.floor(shadowIntensity * 20)
  const shadowOffset = Math.floor(shadowIntensity * 5)
  
  return {
    fontFamily: selectedFont.value.css,
    fontWeight: fontWeight.value,
    letterSpacing: `${letterSpacing.value}em`,
    lineHeight: lineHeight.value,
    color: selectedTextColor.value,
    textTransform: textTransform.value,
    textShadow: shadowIntensity > 0.1 
      ? `${shadowOffset}px ${shadowOffset}px ${shadowBlur}px rgba(0,0,0,0.3)` 
      : 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
})

// 互動式字型預覽控制項 (保留原有功能)
const demoThickness = ref(50)
const demoBlendRatio = ref(50)
const selectedStyleTags = ref(['現代', '優雅'])

// 可選擇的風格標籤
const styleTagOptions = ['現代', '優雅', '粗體', '細線', '襯線', '無襯線', '手寫', '藝術']

// 風格標籤切換
const toggleStyleTag = (tag) => {
  const index = selectedStyleTags.value.indexOf(tag)
  if (index > -1) {
    selectedStyleTags.value.splice(index, 1)
  } else if (selectedStyleTags.value.length < 3) {
    selectedStyleTags.value.push(tag)
  }
}

// 統計數據
const animatedStats = ref([0, 0, 0])

// 打字機效果實現
const typeWriter = () => {
  const current = texts[currentTextIndex.value]
  
  if (!isDeleting.value && currentCharIndex.value <= current.length) {
    displayText.value = current.slice(0, currentCharIndex.value)
    currentCharIndex.value++
  } else if (isDeleting.value && currentCharIndex.value >= 0) {
    displayText.value = current.slice(0, currentCharIndex.value)
    currentCharIndex.value--
  } else if (!isDeleting.value && currentCharIndex.value > current.length) {
    setTimeout(() => {
      isDeleting.value = true
    }, 2000)
  } else if (isDeleting.value && currentCharIndex.value < 0) {
    isDeleting.value = false
    currentTextIndex.value = (currentTextIndex.value + 1) % texts.length
    currentCharIndex.value = 0
  }
}

// 統計數字動畫
const animateStats = () => {
  const targets = [10000, 50000, 99]
  targets.forEach((target, index) => {
    const increment = target / 100
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedStats.value[index] = target
        clearInterval(timer)
      } else {
        animatedStats.value[index] = Math.floor(current)
      }
    }, 20)
  })
}

onMounted(() => {
  // 啟動打字機效果
  setInterval(typeWriter, 100)
  
  // 延遲啟動統計動畫
  setTimeout(animateStats, 1000)

  // 自動演示功能
  // 文字輪播
  setInterval(() => {
    currentAutoTextIndex.value = (currentAutoTextIndex.value + 1) % autoTexts.value.length
  }, 3000)

  // 字型輪播
  setInterval(() => {
    currentFontIndex.value = (currentFontIndex.value + 1) % previewFonts.value.length
  }, 4000)

  // 顏色輪播
  setInterval(() => {
    currentColorIndex.value = (currentColorIndex.value + 1) % demoColors.value.length
  }, 2500)

  // 字重動畫
  setInterval(() => {
    const weights = [300, 400, 500, 600, 700, 800]
    const randomWeight = weights[Math.floor(Math.random() * weights.length)]
    autoFontWeight.value = randomWeight
  }, 3500)

  // 陰影動畫
  setInterval(() => {
    autoShadowIntensity.value = Math.floor(Math.random() * 60) + 20
  }, 4500)
})
</script>

<style>
/* 平滑滾動 */
html {
  scroll-behavior: smooth;
}

/* 自訂滾動條 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #ea580c, #f59e0b);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, #c2410c, #d97706);
}

/* 動畫優化 */
* {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* 浮動動畫 */
@keyframes float1 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  25% {
    transform: translateY(-10px) rotate(2deg);
  }
  50% {
    transform: translateY(-5px) rotate(0deg);
  }
  75% {
    transform: translateY(-15px) rotate(-2deg);
  }
}

@keyframes float2 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-15px) rotate(-3deg);
  }
  66% {
    transform: translateY(-8px) rotate(1deg);
  }
}

@keyframes float3 {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  20% {
    transform: translateY(-8px) rotate(1deg);
  }
  40% {
    transform: translateY(-12px) rotate(-1deg);
  }
  60% {
    transform: translateY(-6px) rotate(2deg);
  }
  80% {
    transform: translateY(-10px) rotate(0deg);
  }
}

@keyframes glow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(234, 88, 12, 0.3), 0 0 40px rgba(234, 88, 12, 0.1);
  }
  50% {
    text-shadow: 0 0 30px rgba(234, 88, 12, 0.5), 0 0 60px rgba(234, 88, 12, 0.2);
  }
}

/* 響應式字體 */
@media (max-width: 768px) {
  .text-9xl {
    font-size: 3rem;
    line-height: 1;
  }
  
  .text-8xl {
    font-size: 2.5rem;
    line-height: 1;
  }
  
  .text-7xl {
    font-size: 2rem;
    line-height: 1.1;
  }
}

/* 手機端優化 */
@media (max-width: 640px) {
  .char-container {
    margin: 0 0.25rem;
  }
  
  .char-container .relative {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  /* 觸控優化 */
  .nav-link,
  .group {
    min-height: 44px;
    min-width: 44px;
  }
  
  /* 首頁垂直間距優化 */
  .hero-section {
    padding-top: 4rem;
    padding-bottom: 2rem;
  }
  
  /* CTA 按鈕優化 */
  .cta-button {
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    width: 100%;
  }
}

/* 自定義滑桿樣式 */
.slider-thumb-orange::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ea580c, #fb923c);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
  transition: all 0.2s ease;
}

.slider-thumb-orange::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(234, 88, 12, 0.4);
}

.slider-thumb-orange::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #fed7aa, #ea580c);
}

.slider-thumb-purple::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #9333ea, #c084fc);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
  transition: all 0.2s ease;
}

.slider-thumb-purple::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(147, 51, 234, 0.4);
}

.slider-thumb-purple::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #e9d5ff, #9333ea);
}

/* 藍色滑桿樣式 */
.slider-thumb-blue::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  cursor: pointer;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transition: all 0.2s ease;
}

.slider-thumb-blue::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
}

.slider-thumb-blue::-webkit-slider-track {
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, #dbeafe, #2563eb);
}

/* 浮動動畫 */
@keyframes float-slow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float-slow {
  animation: float-slow 6s ease-in-out infinite;
}

/* 新增 shimmer 動畫效果 */
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

/* 脈衝放大動畫 */
@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

.animate-pulse-scale {
  animation: pulse-scale 2s ease-in-out infinite;
}

/* 漸變文字動畫 */
@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background: linear-gradient(270deg, #ea580c, #f59e0b, #d97706, #ea580c);
  background-size: 400% 400%;
  animation: gradient-shift 4s ease infinite;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

/* 字型預覽區域優化 */
.font-preview {
  word-break: break-all;
  overflow-wrap: break-word;
  hyphens: auto;
}

/* 滾動條優化 */
.font-list::-webkit-scrollbar {
  width: 6px;
}

.font-list::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.font-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.font-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 響應式字型卡片 */
@media (max-width: 768px) {
  .font-card {
    padding: 0.75rem;
  }
  
  .font-preview-text {
    font-size: 3rem;
  }
}

/* 顏色選擇器動畫 */
.color-selector {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.color-selector:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 小屏幕設備優化 */
@media (max-width: 480px) {
  /* 更緊湊的間距 */
  .hero-section {
    padding-top: 3rem;
  }
  
  /* Logo 進一步縮小 */
  .mobile-logo {
    width: 3.5rem;
    height: 3.5rem;
  }
  
  /* 字體大小調整 */
  .hero-text {
    font-size: 1.125rem;
    line-height: 1.5;
  }
}

/* 平板優化 */
@media (min-width: 768px) and (max-width: 1024px) {
  .char-container .relative {
    font-size: 5rem;
  }
}

/* 字型/文字切換過場：淡入 + 微縮放 */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: opacity .32s cubic-bezier(0.2, 0, 0, 1),
              transform .32s cubic-bezier(0.2, 0, 0, 1);
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.995);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

</style>
