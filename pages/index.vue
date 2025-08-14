<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
    <!-- 使用現有的 Navbar Component -->
    <Navbar />

    <!-- Hero Section -->
    <section class="relative pt-32 pb-24 overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full blur-3xl opacity-40"></div>
        <div class="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full blur-3xl opacity-30"></div>
        <div class="absolute top-40 right-1/3 w-72 h-72 bg-gradient-to-br from-[#3A6B60]/10 to-[#5EA897]/10 rounded-full blur-3xl opacity-25"></div>
      </div>
      
      <div class="relative max-w-6xl mx-auto px-6 text-center">
        <!-- Brand Identity -->
        <div class="mb-16">
          <div class="inline-block mb-10">
            <img src="/typersonal3.png" alt="Typersonal Logo" class="w-32 h-32 mx-auto object-contain">
          </div>
          
          <!-- <h1 class="text-7xl md:text-8xl font-black mb-8 tracking-tight">
            <span class="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              字訂藝
            </span>
          </h1>
           -->
          <!-- <p class="text-2xl md:text-3xl text-slate-700 mb-6 font-semibold">
            AI 驅動的個性化字型設計
          </p> -->
          
          <p class="text-3xl md:text-4xl lg:text-5xl text-slate-700 max-w-4xl mx-auto leading-relaxed mb-8 font-medium">
            {{ displayText }}<span class="animate-pulse text-orange-500">|</span>
          </p>
        </div>

        <!-- Typography Showcase -->
        <div class="mb-16">
          <!-- 增強版字訂藝動畫 -->
          <div class="relative flex justify-center items-center space-x-8 md:space-x-12 mb-12">
            <!-- 背景裝飾 -->
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-orange-50/30 to-transparent blur-sm"></div>
            <div class="absolute -inset-4 bg-gradient-to-r from-[#3A6B60]/5 via-transparent to-[#5EA897]/5 rounded-3xl"></div>
            
            <!-- 字 -->
            <div class="char-container relative group">
              <div class="absolute -inset-2 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="relative text-6xl md:text-9xl font-black text-slate-800 cursor-pointer transform transition-all duration-700 hover:scale-110 hover:rotate-3 hover:text-orange-600" 
                   style="animation: float1 4s ease-in-out infinite;">
                字
              </div>
              <!-- 裝飾元素 -->
              <div class="absolute -top-2 -right-2 w-3 h-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full opacity-60 animate-ping"></div>
            </div>
            
            <!-- 訂 -->
            <div class="char-container relative group">
              <div class="absolute -inset-2 bg-gradient-to-br from-[#3A6B60]/20 to-[#5EA897]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="relative text-6xl md:text-9xl font-medium text-slate-600 cursor-pointer transform transition-all duration-700 hover:scale-110 hover:-rotate-2 hover:text-[#3A6B60]" 
                   style="animation: float2 4s ease-in-out infinite 0.5s;">
                訂
              </div>
              <!-- 裝飾元素 -->
              <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-[#3A6B60] to-[#5EA897] rounded-full opacity-70 animate-pulse"></div>
            </div>
            
            <!-- 藝 -->
            <div class="char-container relative group">
              <div class="absolute -inset-2 bg-gradient-to-br from-amber-400/20 to-yellow-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div class="relative text-6xl md:text-9xl font-light text-slate-400 cursor-pointer transform transition-all duration-700 hover:scale-110 hover:rotate-1 hover:text-yellow-600" 
                   style="animation: float3 4s ease-in-out infinite 1s;">
                藝
              </div>
              <!-- 裝飾元素 -->
              <div class="absolute -top-1 left-1/2 w-1 h-4 bg-gradient-to-t from-transparent to-yellow-500 rounded-full opacity-50 animate-bounce"></div>
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
        <div class="mb-20">
          <div v-if="!user && !isLoading" class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <NuxtLink 
              to="/upload" 
              class="group bg-gradient-to-r from-orange-500 to-amber-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-orange-500/25 hover:scale-105 transition-all duration-300"
            >
              <span class="flex items-center space-x-3">
                <svg class="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                </svg>
                <span>開始創作</span>
              </span>
            </NuxtLink>
            
            <button class="group bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white px-10 py-4 rounded-full font-bold text-xl shadow-2xl hover:shadow-[#3A6B60]/25 hover:scale-105 transition-all duration-300">
              <span class="flex items-center space-x-3">
                <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
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
    <section id="features" class="py-32 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-20">
          <h2 class="text-5xl md:text-6xl font-black text-slate-800 mb-8">
            為什麼選擇 Typersonal
          </h2>
          <p class="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            結合最先進的 AI 技術與直觀的設計工具，讓字型創作變得簡單而強大
          </p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
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

    <!-- Demo Section -->
    <section id="demo" class="py-32 bg-gradient-to-br from-orange-50 to-amber-50">
      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-5xl font-black text-slate-800 mb-8">即時字型預覽</h2>
          <p class="text-xl text-slate-600">輸入文字，立即看到不同字型風格的魔法效果</p>
        </div>
        
        <div class="bg-white rounded-3xl shadow-2xl p-12 mb-12 border border-slate-100">
          <div class="mb-12">
            <input 
              v-model="demoText" 
              type="text" 
              placeholder="輸入你想要預覽的文字..."
              class="w-full text-3xl text-center py-6 px-8 bg-orange-50 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-200"
              maxlength="20"
            >
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              v-for="(style, index) in modernDemoStyles" 
              :key="index"
              class="text-center p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer"
              :class="selectedStyle === index ? 'border-orange-500 bg-orange-50 shadow-lg' : 'border-slate-200 hover:border-slate-300'"
              @click="selectedStyle = index"
            >
              <div 
                class="text-5xl mb-4 transition-all duration-300"
                :style="style.css"
              >
                {{ demoText || '字型預覽' }}
              </div>
              <p class="text-sm font-semibold text-slate-600">{{ style.name }}</p>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <p class="text-slate-600 mb-8 text-lg">點擊不同字型樣式體驗效果變化</p>
          <button class="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all duration-200">
            探索更多字型
          </button>
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
            to="/upload" 
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
              <li><a href="/upload" class="text-slate-300 hover:text-white transition-colors">上傳字型</a></li>
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
import { ref, onMounted } from "vue";

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

// 現代化演示樣式
const demoText = ref("Hello 世界")
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

@keyframes tealGlow {
  0%, 100% {
    text-shadow: 0 0 20px rgba(58, 107, 96, 0.3), 0 0 40px rgba(58, 107, 96, 0.1);
  }
  50% {
    text-shadow: 0 0 30px rgba(58, 107, 96, 0.5), 0 0 60px rgba(58, 107, 96, 0.2);
  }
}

/* 響應式字體 */
@media (max-width: 768px) {
  .text-9xl {
    font-size: 4rem;
  }
  
  .text-8xl {
    font-size: 3rem;
  }
  
  .text-7xl {
    font-size: 2.5rem;
  }
}
</style>
