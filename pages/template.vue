<template>
  <div
    class="min-h-screen"
    :class="
      generatedAny
        ? 'bg-[#F8F3EA]'
        : 'bg-gradient-to-br from-orange-50 via-white to-amber-50'
    "
  >
    <Navbar />

    <div class="max-w-6xl mx-auto px-4 md:px-6 pt-20 md:pt-24 pb-28">
      <!-- Header -->
      <div class="text-center mb-6 md:mb-10">
        <h1
          class="text-2xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-3"
        >
          手寫風格卡片 / 情書 / 手帳 模板
        </h1>
        <p class="text-slate-600 max-w-3xl mx-auto leading-relaxed">
          選擇模板 → 勾選要生成的區塊 → 批量生字並轉 TTF →
          右側即時以字體渲染與匯出 PNG。
        </p>
      </div>

      <!-- 版面：左上 模板、左中 手寫風格、左下 編輯內容；右側 預覽，下方 下載 -->
      <div class="grid lg:grid-cols-12 gap-8 lg:gap-6">
        <!-- 左側 -->
        <div class="lg:col-span-5 space-y-6">
          <!-- 左上：模板選擇 -->
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8"
          >
            <h2 class="text-xl md:text-2xl font-bold text-slate-800 mb-4">
              選擇模板
            </h2>
            <div class="grid grid-cols-3 gap-3">
              <button
                v-for="tpl in templates"
                :key="tpl.id"
                @click="selectTemplate(tpl.id)"
                :class="[
                  'rounded-xl overflow-hidden border-2 transition-all duration-200 group',
                  currentTemplateId === tpl.id
                    ? 'border-[#E29930] ring-2 ring-[#E29930]/30'
                    : 'border-gray-200 hover:border-orange-300',
                ]"
              >
                <div class="relative aspect-[4/3]">
                  <img
                    :src="tpl.thumbnail"
                    :alt="tpl.name"
                    class="w-full h-full object-cover"
                  />
                  <div
                    class="absolute bottom-0 inset-x-0 bg-black/40 text-white text-xs md:text-sm px-2 py-1"
                  >
                    {{ tpl.name }}
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- 左中：手寫風格（批量產字 → 轉 TTF → 套用） -->
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl md:text-2xl font-bold text-slate-800">
                手寫風格
              </h2>
              <span
                v-if="hasFont"
                class="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700"
                >已生成字體</span
              >
              <span
                v-else
                class="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700"
                >尚未生成</span
              >
            </div>

            <div class="space-y-4">
              <div>
                <label class="text-sm text-slate-600 mb-1 block"
                  >上傳手寫參考（PNG）</label
                >
                <input
                  type="file"
                  accept="image/png"
                  @change="onRefImageChange"
                  class="block w-full text-sm"
                />
              </div>

              <div class="flex items-center gap-3">
                <label class="text-sm text-slate-600">取樣步數</label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  step="1"
                  v-model.number="samplingStep"
                  class="flex-1 range-slider-orange"
                />
                <span
                  class="text-xs bg-[#E29930]/10 text-[#E29930] px-2 py-1 rounded-full"
                  >{{ samplingStep }}</span
                >
              </div>

              <div class="text-xs text-slate-500">
                勾選了
                <span class="font-semibold">{{ selectedKeys.length }}</span> /
                {{ currentSlots.length }} 個區塊；將生成
                <span class="font-semibold">{{ uniqueChars.length }}</span>
                個字元。
              </div>

              <button
                @click="batchGenerateAndApplyFont"
                :disabled="
                  !referenceImage || batching || uniqueChars.length === 0
                "
                :class="[
                  'w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all',
                  !referenceImage || batching || uniqueChars.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-[#3A6B60] to-[#5EA897] text-white hover:shadow-lg hover:scale-[1.01]',
                ]"
              >
                <span
                  v-if="batching"
                  class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
                ></span>
                <span>
                  {{
                    batching
                      ? `生成中… (${doneCount} / ${uniqueChars.length})`
                      : "🎨 生成手寫字體並套用"
                  }}
                </span>
              </button>

              <div v-if="failures.length" class="text-xs text-red-600">
                以下字元產生失敗：{{ failures.join("") }}
              </div>
            </div>
          </div>

          <!-- 左下：編輯內容（含 全選 與 個別勾選） -->
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8"
          >
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl md:text-2xl font-bold text-slate-800">
                編輯內容
              </h2>
              <label
                class="inline-flex items-center gap-2 text-sm text-slate-600 select-none"
              >
                <input
                  type="checkbox"
                  v-model="allSelected"
                  class="w-4 h-4 accent-[#3A6B60]"
                />
                全選
              </label>
            </div>

            <div v-if="currentSlots.length" class="space-y-4">
              <div
                v-for="slot in currentSlots"
                :key="slot.key"
                class="space-y-2"
              >
                <div class="flex items-center justify-between">
                  <label class="text-sm text-slate-600">{{ slot.label }}</label>
                  <label
                    class="inline-flex items-center gap-2 text-xs text-slate-600 select-none"
                  >
                    <input
                      type="checkbox"
                      v-model="slotSelected[slot.key]"
                      class="w-4 h-4 accent-[#3A6B60]"
                    />
                    生成
                  </label>
                </div>
                <textarea
                  v-model="slotInputs[slot.key]"
                  :rows="slot.multiline ? 4 : 2"
                  class="w-full rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5EA897] focus:border-transparent text-slate-800 p-3"
                  :placeholder="slot.placeholder || ''"
                ></textarea>
                <div
                  class="flex items-center justify-between text-xs text-slate-500"
                >
                  <span
                    >固定位置 · {{ slot.align.toUpperCase() }} ·
                    {{ slot.fontSize }}px</span
                  >
                  <span class="text-slate-400">使用全域字體</span>
                </div>
              </div>
            </div>
            <div v-else class="text-sm text-slate-500">請先選擇模板</div>
          </div>
        </div>

        <!-- 右側：預覽 + 下載 -->
        <div class="lg:col-span-7 space-y-6">
          <!-- 即時預覽（右） -->
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6"
          >
            <div class="flex items-center justify-between mb-3">
              <h2 class="text-lg md:text-xl font-semibold text-[#3A6B60]">
                即時預覽
              </h2>
              <div class="flex items-center gap-2 text-xs text-[#3A6B60]">
                <div
                  class="w-2 h-2"
                  :class="[
                    hasFont ? 'bg-[#5EA897]' : 'bg-gray-300',
                    'rounded-full',
                    hasFont && 'animate-pulse',
                  ]"
                />
                <span
                  >已套用固定背景與固定文字位置{{
                    hasFont ? "（使用自製字體）" : ""
                  }}</span
                >
              </div>
            </div>

            <div
              ref="canvasWrap"
              class="relative w-full bg-white overflow-hidden rounded-xl border border-gray-200"
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
                  {{ slotInputs[slot.key] }}
                </div>
              </template>
            </div>
          </div>

          <!-- 下載圖片（下） -->
          <div
            class="bg-white rounded-3xl shadow-xl border border-gray-100 p-4 md:p-6"
          >
            <button
              @click="exportAsPNG"
              class="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold bg-white border border-gray-300 hover:bg-gray-50"
            >
              下載為 PNG 圖片
            </button>
            <div
              v-if="errorMsg"
              class="mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
            >
              {{ errorMsg }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 批次產字時的遮罩提示 -->
    <div
      v-if="batching"
      class="fixed inset-0 bg-black/10 pointer-events-none z-[60]"
    ></div>
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
import axios from "axios";

// ===== 服務端設定 =====
const API_BASE_URL = "https://typersonal.dy6.click/8000"; // 生成單字圖片 API
const CONVERTER_URL = "http://localhost:3001/convert"; // PNG → TTF 服務（請改為你的實際路徑）
const HAND_FONT_NAME = "HandGenLocal"; // 動態字體名稱

// ===== 模板（固定背景／位置／樣式） =====
const templates = [
  {
    id: "wedding",
    name: "結婚賀卡",
    thumbnail: "/cards/wedding_thumb.png",
    bg: "/cards/wedding_bg.png",
    aspect: "3 / 2",
    slots: [
      {
        key: "title",
        label: "標題",
        defaultText: "新婚誌喜",
        x: 50,
        y: 18,
        w: 70,
        align: "center",
        fontSize: 42,
      },
      {
        key: "body",
        label: "內容",
        defaultText: "願你們攜手共度美好人生，每一日都像今天一樣幸福。",
        x: 50,
        y: 50,
        w: 70,
        align: "center",
        fontSize: 22,
        multiline: true,
        lineHeight: 1.5,
      },
      {
        key: "sign",
        label: "署名",
        defaultText: "送上祝福：小明",
        x: 85,
        y: 82,
        w: 40,
        align: "right",
        fontSize: 18,
      },
      {
        key: "date",
        label: "日期",
        defaultText: "2025 / 08 / 15",
        x: 85,
        y: 88,
        w: 40,
        align: "right",
        fontSize: 14,
      },
    ],
  },
  {
    id: "love",
    name: "情書",
    thumbnail: "/cards/love_thumb.png",
    bg: "/cards/love_bg.png",
    aspect: "3 / 2",
    slots: [
      {
        key: "title",
        label: "稱呼",
        defaultText: "親愛的你：",
        x: 12,
        y: 15,
        w: 60,
        align: "left",
        fontSize: 28,
      },
      {
        key: "body",
        label: "內容",
        defaultText: "在每個清晨醒來時，我的第一個念頭都是你。",
        x: 12,
        y: 30,
        w: 76,
        align: "left",
        fontSize: 22,
        multiline: true,
        lineHeight: 1.6,
      },
      {
        key: "sign",
        label: "署名",
        defaultText: "永遠愛你的 · 我",
        x: 85,
        y: 65,
        w: 30,
        align: "right",
        fontSize: 18,
      },
      {
        key: "ps",
        label: "附註",
        defaultText: "P.S. 今晚 7 點見。",
        x: 12,
        y: 70,
        w: 60,
        align: "left",
        fontSize: 14,
      },
    ],
  },
  {
    id: "journal",
    name: "手寫帳",
    thumbnail: "/cards/journal_thumb.png",
    bg: "/cards/journal_bg.png",
    aspect: "4 / 3",
    slots: [
      {
        key: "title",
        label: "標題",
        defaultText: "今日待辦",
        x: 12,
        y: 22,
        w: 60,
        align: "left",
        fontSize: 26,
      },
      {
        key: "list",
        label: "清單",
        defaultText: "- 早起運動\n- 完成報告初稿\n- 晚上和朋友聚餐",
        x: 12,
        y: 35,
        w: 50,
        align: "left",
        fontSize: 20,
        multiline: true,
        lineHeight: 1.4,
      },
      {
        key: "memo",
        label: "備註",
        defaultText: "記得多喝水 💧",
        x: 70,
        y: 76,
        w: 26,
        align: "left",
        fontSize: 16,
      },
    ],
  },
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

// 動態字體
const ttfUrl = ref(null);
const hasFont = computed(() => !!ttfUrl.value);
const ttfReady = ref(false);
let prevTtfUrl = null;

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
  nextTick(() => updateContainRect());
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

// 上傳並生成字型
async function batchGenerateAndApplyFont() {
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

  const generatedFiles = [];

  for (const ch of uniqueChars.value) {
    try {
      const form = new FormData();
      form.append("character", ch);
      form.append("sampling_step", String(samplingStep.value));
      form.append("reference_image", referenceImage.value);

      const res = await fetch(`${API_BASE_URL}/ai/generate`, {
        method: "POST",
        body: form,
      });
      if (!res.ok) throw new Error("模型服務回應失敗");
      const data = await res.json();
      if (!data?.image) throw new Error("缺少 image URL");

      const imgResp = await fetch(data.image);
      if (!imgResp.ok) throw new Error("下載圖片失敗");
      const blob = await imgResp.blob();

      const filename = `${ch.codePointAt(0)}.png`;
      const file = new File([blob], filename, { type: "image/png" });
      generatedFiles.push(file);
    } catch (e) {
      console.error("生成失敗：", ch, e);
      failures.value.push(ch);
    } finally {
      doneCount.value += 1;
    }
  }

  if (!generatedFiles.length) {
    batching.value = false;
    alert("全部字元皆產生失敗，請稍後重試");
    return;
  }

  try {
    const fd = new FormData();
    for (const f of generatedFiles) fd.append("files", f);
    const convertRes = await axios.post(CONVERTER_URL, fd, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob",
    });
    const ttfBlob = new Blob([convertRes.data], {
      type: convertRes.headers["content-type"] || "font/ttf",
    });
    const url = URL.createObjectURL(ttfBlob);
    ttfUrl.value = url;
    await applyFontFace(url);
  } catch (err) {
    console.error("上傳轉檔失敗", err);
    errorMsg.value = "上傳轉檔失敗，請確認轉檔服務是否啟動並允許 CORS";
  } finally {
    batching.value = false;
  }
}

async function applyFontFace(url) {
  if (prevTtfUrl && prevTtfUrl !== url) URL.revokeObjectURL(prevTtfUrl);
  prevTtfUrl = url;
  const old = document.getElementById("hand-font-face");
  if (old) old.remove();
  const style = document.createElement("style");
  style.id = "hand-font-face";
  style.textContent = `@font-face { font-family: '${HAND_FONT_NAME}'; src: url('${url}') format('truetype'); font-display: swap; }`;
  document.head.appendChild(style);
  try {
    await document.fonts.load(`48px '${HAND_FONT_NAME}'`);
  } catch {
  } finally {
    ttfReady.value = true;
  }
}

watch(ttfUrl, async (url) => {
  if (url) await applyFontFace(url);
});

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

function updateContainRect() {
  nextTick(() => {
    const wrap = canvasWrap.value;
    if (!wrap || !bgMeta.w || !bgMeta.h) return;
    const cw = wrap.clientWidth,
      ch = wrap.clientHeight;
    const imgR = bgMeta.w / bgMeta.h,
      boxR = cw / ch;
    if (imgR > boxR) {
      const w = cw,
        h = cw / imgR;
      containRect.x = 0;
      containRect.y = (ch - h) / 2;
      containRect.w = w;
      containRect.h = h;
    } else {
      const h = ch,
        w = ch * imgR;
      containRect.x = (cw - w) / 2;
      containRect.y = 0;
      containRect.w = w;
      containRect.h = h;
    }
  });
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
  if (prevTtfUrl) URL.revokeObjectURL(prevTtfUrl);
});

function slotStyle(slot, asText = false) {
  const rect = containRect; // 畫面上的 contain 矩形（你原本就有維護）
  const { x, y, w } = slotPixelsForRect(slot, rect);
  const style = { top: `${y}px`, width: `${w}px` };
  if (slot.align === 'center') { style.left = `${x}px`; style.transform = 'translateX(-50%)'; style.textAlign = 'center'; }
  else if (slot.align === 'right') { style.left = `${x}px`; style.transform = 'translateX(-100%)'; style.textAlign = 'right'; }
  else { style.left = `${x}px`; style.textAlign = 'left'; }
  if (asText) {
    style.fontSize = (slot.fontSize || 20) + 'px';
    style.lineHeight = String(slot.lineHeight || 1.3);
    style.whiteSpace = 'pre-wrap';
    if (hasFont.value) style.fontFamily = `'${HAND_FONT_NAME}', ui-serif, Georgia, serif`;
  }
  return style;
}

// 輸出圖片
function calcContainRect(boxW, boxH, imgW, imgH) {
  const imgR = imgW / imgH;
  const boxR = boxW / boxH;
  if (imgR > boxR) {
    const w = boxW;
    const h = Math.round(boxW / imgR);
    return { x: 0, y: Math.round((boxH - h) / 2), w, h };
  } else {
    const h = boxH;
    const w = Math.round(boxH * imgR);
    return { x: Math.round((boxW - w) / 2), y: 0, w, h };
  }
}

function slotPixelsForRect(slot, rect) {
  const xPct = slot.x / 100;
  const yPct = slot.y / 100;
  const wPct = slot.w / 100;
  const x = rect.x + rect.w * xPct;
  const y = rect.y + rect.h * yPct;
  const w = rect.w * wPct;
  return { x, y, w };
}

// 這邊字體會改變，晚點修復bug
async function exportAsPNG() {
  const wrap = canvasWrap.value;
  if (!wrap) return;

  // 確保字體載入完成，避免量測字寬時用到後備字體
  if (hasFont.value) {
    try { await document.fonts.load(`48px '${HAND_FONT_NAME}'`); } catch {}
  }

  // 以裝置像素比製作高解析輸出
  const rect = wrap.getBoundingClientRect();
  const dpr = Math.max(1, Math.ceil((window.devicePixelRatio || 1)));
  const scale = Math.max(2, dpr * 2); // 2x~4x 皆可，避免鋸齒
  const W = Math.floor(rect.width * scale);
  const H = Math.floor(rect.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // 1) 背景：使用與預覽相同的 object-contain 規則繪製
  const bgRect = calcContainRect(W, H, bgMeta.w, bgMeta.h);
  await drawImageScaled(ctx, currentTemplate.value.bg, bgRect.x, bgRect.y, bgRect.w, bgRect.h);

  // 2) 文字：以同一個 bgRect 做定位與寬度，確保與預覽一致
  for (const s of currentSlots.value) {
    const { x, y, w } = slotPixelsForRect(s, bgRect);
    drawTextBlock(ctx, slotInputs[s.key] || '', x, y, w, s);
  }

  // 3) 下載
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url; a.download = `card_${currentTemplateId.value}.png`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
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
async function drawImageScaled(ctx, src, x, y, w, h) {
  if (!src) return;
  const img = await loadImage(src);
  ctx.drawImage(img, x, y, w, h);
}

function drawTextBlock(ctx, text, x, y, w, slot) {
  const fontSize = slot.fontSize || 20;
  const fam = hasFont.value
    ? `'${HAND_FONT_NAME}', ui-serif, Georgia, serif`
    : "ui-serif, Georgia, serif";
  ctx.font = `${fontSize * 3}px ${fam}`;
  ctx.fillStyle = "#1f2937";
  ctx.textBaseline = "top";
  ctx.textAlign = slot.align;
  let sx = x;
  if (slot.align === "center") sx = x;
  if (slot.align === "left") sx = x;
  if (slot.align === "right") sx = x;
  const lines = (text || "").split("\n");
  const lh = (slot.lineHeight ? slot.lineHeight : 1.4) * fontSize * 3;
  let yy = y;
  for (const ln of lines) {
    const wrapped = wrapByMeasure(ctx, ln, w);
    for (const seg of wrapped) {
      ctx.fillText(seg, sx, yy);
      yy += lh;
    }
  }
}

function wrapByMeasure(ctx, text, maxWidth) {
  const words = text.split("");
  const lines = [];
  let buf = "";
  for (const ch of words) {
    const test = buf + ch;
    if (ctx.measureText(test).width > maxWidth && buf) {
      lines.push(buf);
      buf = ch;
    } else {
      buf = test;
    }
  }
  if (buf) lines.push(buf);
  return lines;
}
</script>

<style scoped>
.range-slider-teal {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    #d1d5db 0%,
    #d1d5db 50%,
    #5ea897 50%,
    #5ea897 100%
  );
  outline: none;
}
.range-slider-teal::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3a6b60;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(58, 107, 96, 0.3);
  transition: all 0.2s ease;
}
.range-slider-orange {
  -webkit-appearance: none;
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(
    to right,
    #d1d5db 0%,
    #d1d5db 50%,
    #e29930 50%,
    #e29930 100%
  );
  outline: none;
}
.range-slider-orange::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #e29930;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(226, 153, 48, 0.3);
  transition: all 0.2s ease;
}
</style>
