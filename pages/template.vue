<template>
  <div class="min-h-screen" :class="generatedAny ? 'bg-[#F8F3EA]' : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'">
    <!-- 側邊導覽可重用你的 Navbar -->
    <Navbar />

    <div class="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-28">
      <!-- Header -->
      <div class="text-center mb-6 md:mb-10">
        <h1 class="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3">
          手寫風格卡片 / 情書 / 手帳 模板
        </h1>
        <p class="text-slate-600 max-w-3xl mx-auto leading-relaxed">
          選擇一個模板 → 編輯固定位置文字 → 一鍵轉換成手寫風格。若您還沒有建立專屬手寫風格，先上傳一張手寫字參考照。
        </p>
      </div>

      <!-- 重新排版：左側（上/中/下），右側（預覽 + 下載） -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-6">
        <!-- 左側：上＝模板選擇；中＝手寫風格；下＝編輯內容 -->
        <div class="lg:col-span-5 space-y-6">
          <!-- 模板選擇（左上） -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 class="text-xl md:text-2xl font-bold text-slate-800 mb-4">選擇模板</h2>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="tpl in templates"
                :key="tpl.id"
                @click="selectTemplate(tpl.id)"
                :class="[
                  'rounded-xl overflow-hidden border-2 transition-all duration-200 group',
                  currentTemplateId === tpl.id ? 'border-[#E29930] ring-2 ring-[#E29930]/30' : 'border-gray-200 hover:border-orange-300'
                ]"
              >
                <div class="relative aspect-[4/3]">
                  <img :src="tpl.thumbnail" :alt="tpl.name" class="w-full h-full object-cover" />
                  <div class="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs md:text-sm px-2 py-1">{{ tpl.name }}</div>
                </div>
              </button>
            </div>
          </div>

          <!-- 手寫風格（左中）：整合原本建立/條件/一鍵生成按鈕 -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl md:text-2xl font-bold text-slate-800">手寫風格</h2>
              <span v-if="modelId" class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">已建立</span>
              <span v-else class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">尚未建立</span>
            </div>

            <div v-if="!modelId" class="space-y-4">
              <p class="text-sm text-slate-600">尚未建立您的手寫風格。請先上傳一張清晰的手寫字照片（黑白或高對比最佳）。</p>
              <input type="file" accept="image/*" @change="onRefImageChange" class="block w-full text-sm" />
              <button
                @click="createHandwritingModel"
                :disabled="!refImage || creatingModel"
                :class="[
                  'w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all',
                  (!refImage || creatingModel) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white hover:shadow-lg hover:scale-[1.01]'
                ]"
              >
                <span v-if="creatingModel" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>{{ creatingModel ? '建立中…' : '用手寫照建立風格' }}</span>
              </button>
              <p class="text-xs text-slate-500">建立成功後會儲存在本機（localStorage），下次可直接使用。</p>
            </div>

            <div v-else class="space-y-4">
              <div class="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-sm">
                ✅ 已偵測到手寫模型：<span class="font-mono">{{ modelId }}</span>
              </div>
              <div class="flex items-center gap-3">
                <label class="text-sm text-slate-600">風格強度</label>
                <input type="range" min="0" max="1" step="0.05" v-model.number="styleAlpha" class="flex-1 range-slider-orange" />
                <span class="text-xs bg-[#E29930]/10 text-[#E29930] px-2 py-1 rounded-full">{{ Math.round(styleAlpha*100) }}%</span>
              </div>
              <div class="flex items-center gap-3">
                <label class="text-sm text-slate-600">筆觸粗細</label>
                <input type="range" min="-1.5" max="1.5" step="0.1" v-model.number="thickness" class="flex-1 range-slider-teal" />
                <span class="text-xs bg-teal-600/10 text-teal-700 px-2 py-1 rounded-full">{{ thickness.toFixed(1) }}</span>
              </div>
              <!-- 將「全區塊套用手寫風格」放在這裡，維持原功能不變 -->
              <button
                @click="generateAll"
                :disabled="!modelId || busy"
                :class="[
                  'w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all',
                  (!modelId || busy) ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white hover:shadow-lg hover:scale-[1.01]'
                ]"
              >
                <span v-if="busy" class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                <span>{{ busy ? '生成中…' : '🎨 全區塊套用手寫風格' }}</span>
              </button>
            </div>
          </div>

          <!-- 編輯內容（左下） -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
            <h2 class="text-xl md:text-2xl font-bold text-slate-800 mb-4">編輯內容</h2>
            <div v-if="currentSlots.length" class="space-y-4">
              <div v-for="slot in currentSlots" :key="slot.key" class="space-y-2">
                <label class="text-sm text-slate-600">{{ slot.label }}</label>
                <textarea
                  v-model="slotInputs[slot.key]"
                  :rows="slot.multiline ? 4 : 2"
                  class="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5EA897] focus:border-transparent text-slate-800 p-3"
                  :placeholder="slot.placeholder || ''"
                ></textarea>
                <div class="flex items-center justify-between text-xs text-slate-500">
                  <span>固定位置 · {{ slot.align.toUpperCase() }} · {{ slot.fontSize }}px</span>
                  <button @click="generateOne(slot.key)" class="text-[#3A6B60] hover:underline" :disabled="!modelId || slotBusy[slot.key]">
                    <span v-if="slotBusy[slot.key]">生成中…</span>
                    <span v-else>只轉換此段</span>
                  </button>
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-slate-500">請先選擇模板</div>
          </div>
        </div>

        <!-- 右側：預覽（上） + 下載（下） -->
        <div class="lg:col-span-7 space-y-6">
          <!-- 即時預覽（右） -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6">
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-lg md:text-xl font-semibold text-[#3A6B60]">即時預覽</h2>
              <div class="flex items-center gap-2 text-xs text-[#3A6B60]">
                <div class="w-2 h-2 bg-[#5EA897] rounded-full animate-pulse" />
                <span>已套用固定背景與固定文字位置</span>
              </div>
            </div>

            <!-- 畫布容器：維持比例 3:2（可依模板微調） -->
            <div ref="canvasWrap" class="relative w-full bg-white overflow-hidden rounded-xl border border-gray-200" :style="{ aspectRatio: computedAspect }">
              <!-- 背景圖 -->
              <img v-if="currentTemplate.bg" ref="bgEl" :src="currentTemplate.bg" class="absolute inset-0 w-full h-full object-contain select-none" alt="背景" @load="onBgLoad" />

              <!-- 文字/手寫圖層 -->
              <template v-for="slot in currentSlots" :key="slot.key">
                <img
                  v-if="slotRenders[slot.key]"
                  :src="slotRenders[slot.key]"
                  class="absolute"
                  :style="slotStyle(slot)"
                  alt="handwrite"
                />
                <div v-else class="absolute text-slate-800 whitespace-pre-wrap" :style="slotStyle(slot, true)">
                  {{ slotInputs[slot.key] }}
                </div>
              </template>
            </div>
          </div>

          <!-- 下載圖片（置於預覽下方） -->
          <div class="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6">
            <button
              @click="exportAsPNG"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-white border border-gray-300 hover:bg-gray-50"
            >
              下載為 PNG 圖片
            </button>
            <div v-if="errorMsg" class="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{{ errorMsg }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 建立手寫模型或批次生成時的遮罩提示 -->
    <div v-if="creatingModel || busy" class="fixed inset-0 bg-black/10 pointer-events-none z-[60]"></div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { userState } from '~/composables/useAuth.js' // 可選：若需登入限制

// ===== 基本設定 =====
const API_BASE_URL = 'https://typersonal.dy6.click/8000' // 請依實際 API 調整
// 假設後端提供：
// 1) POST /ai/handwriting/train  multipart: { reference_image, notes? }
//    -> { model_id }
// 2) POST /ai/handwriting/text    multipart: { model_id, text, alpha, thickness }
//    -> { image: 'data:image/png;base64,...' }（透明背景 PNG 最佳）

// ===== 模板定義（固定背景、固定位置、固定樣式） =====
const templates = [
  {
    id: 'wedding',
    name: '結婚賀卡',
    thumbnail: '/cards/wedding_thumb.png',
    bg: '/cards/wedding_bg.png',
    aspect: '3 / 2',
    slots: [
      { key: 'title', label: '標題', defaultText: '新婚誌喜', x: 50, y: 18, w: 70, align: 'center', fontSize: 42 },
      { key: 'body', label: '內容', defaultText: '願你們攜手共度美好人生，每一日都像今天一樣幸福。', x: 50, y: 50, w: 70, align: 'center', fontSize: 22, multiline: true, lineHeight: 1.5 },
      { key: 'sign', label: '署名', defaultText: '送上祝福：小明', x: 75, y: 82, w: 40, align: 'right', fontSize: 18 },
      { key: 'date', label: '日期', defaultText: '2025 / 08 / 15', x: 75, y: 88, w: 40, align: 'right', fontSize: 14 }
    ]
  },
  {
    id: 'love',
    name: '情書',
    thumbnail: '/cards/love_thumb.png',
    bg: '/cards/love_bg.png',
    aspect: '3 / 2',
    slots: [
      { key: 'title', label: '稱呼', defaultText: '親愛的你：', x: 12, y: 15, w: 60, align: 'left', fontSize: 28 },
      { key: 'body', label: '內容', defaultText: '在每個清晨醒來時，我的第一個念頭都是你。', x: 12, y: 30, w: 76, align: 'left', fontSize: 22, multiline: true, lineHeight: 1.6 },
      { key: 'sign', label: '署名', defaultText: '永遠愛你的 · 我', x: 68, y: 80, w: 20, align: 'right', fontSize: 18 },
      { key: 'ps', label: '附註', defaultText: 'P.S. 今晚 7 點見。', x: 12, y: 88, w: 60, align: 'left', fontSize: 14 }
    ]
  },
  {
    id: 'journal',
    name: '手寫帳',
    thumbnail: '/cards/journal_thumb.png',
    bg: '/cards/journal_bg.png',
    aspect: '4 / 3',
    slots: [
      { key: 'title', label: '標題', defaultText: '今日待辦', x: 12, y: 10, w: 60, align: 'left', fontSize: 26 },
      { key: 'list', label: '清單', defaultText: '- 早起運動\n- 完成報告初稿\n- 晚上和朋友聚餐', x: 12, y: 22, w: 50, align: 'left', fontSize: 20, multiline: true, lineHeight: 1.4 },
      { key: 'memo', label: '備註', defaultText: '記得多喝水 💧', x: 70, y: 76, w: 20, align: 'left', fontSize: 16 }
    ]
  }
]

// ===== 狀態 =====
const currentTemplateId = ref('wedding')
const modelId = ref('')
const refImage = ref(null)
const creatingModel = ref(false)
const busy = ref(false)
const errorMsg = ref('')

const styleAlpha = ref(0.8)
const thickness = ref(0)

// 文字輸入與每個區塊的產圖結果
const slotInputs = reactive({})
const slotRenders = reactive({}) // key -> dataURL
const slotBusy = reactive({})

const generatedAny = computed(() => Object.values(slotRenders).some(Boolean))

const currentTemplate = computed(() => templates.find(t => t.id === currentTemplateId.value) || { slots: [] })
const currentSlots = computed(() => currentTemplate.value.slots || [])

function selectTemplate(id) {
  currentTemplateId.value = id

  // 1) 取到新模板
  const tpl = templates.find(t => t.id === id)
  if (!tpl) return

  // 2) 依新模板 slots 建立全新的預設輸入
  const newInputs = {}
  for (const s of tpl.slots) {
    newInputs[s.key] = s.defaultText || ''
  }

  // 3) 清空舊的 reactive 物件內容，然後覆寫（保留 reactivity）
  Object.keys(slotInputs).forEach(k => delete slotInputs[k])
  Object.assign(slotInputs, newInputs)

  // 4) 清空舊的生成結果與 busy 狀態，避免殘留錯位
  Object.keys(slotRenders).forEach(k => delete slotRenders[k])
  Object.keys(slotBusy).forEach(k => delete slotBusy[k])

  // 5) 重新計算可見矩形（背景比例/尺寸變了）
  nextTick(() => updateContainRect())
}

// 初始載入
onMounted(() => {
  const saved = localStorage.getItem('handwriting_model_id')
  if (saved) modelId.value = saved
  selectTemplate(currentTemplateId.value)
})

// 參考圖上傳
function onRefImageChange(e) {
  const f = e.target.files?.[0]
  if (f) refImage.value = f
}

// 建立手寫模型（第一次使用）
async function createHandwritingModel() {
  if (!refImage.value) return
  creatingModel.value = true
  errorMsg.value = ''
  try {
    const fd = new FormData()
    fd.append('reference_image', refImage.value)
    const resp = await fetch(`${API_BASE_URL}/ai/handwriting/train`, { method: 'POST', body: fd })
    if (!resp.ok) throw new Error('伺服器回應失敗')
    const data = await resp.json()
    if (!data.model_id) throw new Error('缺少 model_id')
    modelId.value = data.model_id
    localStorage.setItem('handwriting_model_id', data.model_id)
  } catch (err) {
    console.error(err)
    errorMsg.value = '建立手寫模型失敗：' + (err?.message || 'unknown')
  } finally {
    creatingModel.value = false
  }
}

// 生成單一欄位手寫圖
async function generateOne(key) {
  if (!modelId.value) return
  const text = slotInputs[key] || ''
  if (!text.trim()) return
  slotBusy[key] = true
  errorMsg.value = ''
  try {
    const fd = new FormData()
    fd.append('model_id', modelId.value)
    fd.append('text', text)
    fd.append('alpha', String(styleAlpha.value))
    fd.append('thickness', String(thickness.value))

    const resp = await fetch(`${API_BASE_URL}/ai/handwriting/text`, { method: 'POST', body: fd })
    if (!resp.ok) throw new Error('伺服器回應失敗')
    const data = await resp.json()
    if (!data.image) throw new Error('缺少 image')
    slotRenders[key] = data.image // 預期為透明 PNG dataURL
  } catch (err) {
    console.error(err)
    errorMsg.value = '生成手寫失敗：' + (err?.message || 'unknown')
  } finally {
    slotBusy[key] = false
  }
}

// 全部欄位一起生成
async function generateAll() {
  if (!modelId.value) return
  busy.value = true
  try {
    const tasks = currentSlots.value.map(s => generateOne(s.key))
    await Promise.allSettled(tasks)
  } finally {
    busy.value = false
  }
}

// 欄位定位樣式（百分比定位，寬度以 % 設定，字體大小以 px）
function slotStyle(slot, asText = false) {
  const xPct = slot.x / 100
  const yPct = slot.y / 100
  const wPct = slot.w / 100

  const baseX = containRect.x
  const baseY = containRect.y
  const baseW = containRect.w
  const baseH = containRect.h

  const pxX = baseX + baseW * xPct
  const pxY = baseY + baseH * yPct
  const pxW = baseW * wPct

  const style = {
    top: `${pxY}px`,
    width: `${pxW}px`
  }

  if (slot.align === 'center') {
    style.left = `${pxX}px`
    style.transform = 'translateX(-50%)'
    style.textAlign = 'center'
  } else if (slot.align === 'right') {
    style.left = `${pxX}px`
    style.transform = 'translateX(-100%)'
    style.textAlign = 'right'
  } else {
    style.left = `${pxX}px`
    style.textAlign = 'left'
  }

  if (asText) {
    style.fontSize = (slot.fontSize || 20) + 'px'
    style.lineHeight = String(slot.lineHeight || 1.3)
    style.whiteSpace = 'pre-wrap'
  }
  return style
}

// 將目前畫面匯出為 PNG（在前端使用 <canvas> 合成）
async function exportAsPNG() {
  const wrap = canvasWrap.value
  if (!wrap) return

  const rect = wrap.getBoundingClientRect()
  const scale = 3
  const W = Math.floor(rect.width * scale)
  const H = Math.floor(rect.height * scale)
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // 繪背景
  await drawImageScaled(ctx, currentTemplate.value.bg, 0, 0, W, H)

  // 繪每個 slot（優先圖片，否則用文字）
  for (const s of currentSlots.value) {
    const x = s.align === 'center' ? (s.x / 100 * W) : (s.align === 'left' ? (s.x / 100 * W) : (W - s.x / 100 * W))
    const y = s.y / 100 * H
    const w = s.w / 100 * W

    if (slotRenders[s.key]) {
      await drawImageFitting(ctx, slotRenders[s.key], x, y, w, s.align)
    } else {
      drawTextBlock(ctx, slotInputs[s.key] || '', x, y, w, s)
    }
  }

  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = `card_${currentTemplateId.value}.png`
  a.click()
}

const canvasWrap = ref(null)
const bgEl = ref(null)

// 背景原始尺寸
const bgMeta = reactive({ w: 0, h: 0 })
// 圖片在容器(object-contain)中的實際可見矩形
const containRect = reactive({ x: 0, y: 0, w: 0, h: 0 })

const computedAspect = computed(() => {
  if (bgMeta.w > 0 && bgMeta.h > 0) return `${bgMeta.w} / ${bgMeta.h}`
  return currentTemplate.value.aspect || '3 / 2'
})

function onBgLoad(e) {
  const img = e.target
  bgMeta.w = img.naturalWidth
  bgMeta.h = img.naturalHeight
  updateContainRect()
}

function updateContainRect() {
  nextTick(() => {
    const wrap = canvasWrap.value
    if (!wrap || !bgMeta.w || !bgMeta.h) return
    const cw = wrap.clientWidth
    const ch = wrap.clientHeight
    const imgR = bgMeta.w / bgMeta.h
    const boxR = cw / ch
    if (imgR > boxR) {
      const w = cw
      const h = cw / imgR
      containRect.x = 0
      containRect.y = (ch - h) / 2
      containRect.w = w
      containRect.h = h
    } else {
      const h = ch
      const w = ch * imgR
      containRect.x = (cw - w) / 2
      containRect.y = 0
      containRect.w = w
      containRect.h = h
    }
  })
}

function onResize() { updateContainRect() }

onMounted(() => { window.addEventListener('resize', onResize); updateContainRect() })
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

// 輔助：載入圖片並繪製
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function drawImageScaled(ctx, src, x, y, w, h) {
  if (!src) return
  const img = await loadImage(src)
  ctx.drawImage(img, x, y, w, h)
}

async function drawImageFitting(ctx, src, x, y, w, align) {
  const img = await loadImage(src)
  const ratio = img.height / img.width
  const h = w * ratio
  let dx = x, dy = y
  if (align === 'center') dx = x - w / 2
  if (align === 'right') dx = x - w
  ctx.drawImage(img, dx, dy, w, h)
}

function drawTextBlock(ctx, text, x, y, w, slot) {
  const fontSize = slot.fontSize || 20
  ctx.font = `${fontSize * 3}px ui-serif, Georgia, serif`
  ctx.fillStyle = '#1f2937'
  ctx.textBaseline = 'top'
  ctx.textAlign = slot.align
  let sx = x
  if (slot.align === 'center') sx = x
  if (slot.align === 'left') sx = x
  if (slot.align === 'right') sx = x

  const lines = (text || '').split('\n')
  const lh = (slot.lineHeight ? slot.lineHeight : 1.4) * fontSize * 3
  let yy = y
  for (const ln of lines) {
    const wrapped = wrapByMeasure(ctx, ln, w)
    for (const seg of wrapped) {
      ctx.fillText(seg, sx, yy)
      yy += lh
    }
  }
}

function wrapByMeasure(ctx, text, maxWidth) {
  const words = text.split('')
  const lines = []
  let buf = ''
  for (const ch of words) {
    const test = buf + ch
    if (ctx.measureText(test).width > maxWidth && buf) {
      lines.push(buf)
      buf = ch
    } else {
      buf = test
    }
  }
  if (buf) lines.push(buf)
  return lines
}
</script>

<style scoped>
/* 共用滑桿樣式（沿用你的風格） */
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
</style>