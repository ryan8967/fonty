<template>
  <div class="max-w-6xl mx-auto px-6 py-12 space-y-10 text-gray-800 font-sans">
    <!-- Logo + 標題 -->
    <div class="flex items-center space-x-5 mb-6">
      <img
        src="/typersonal.png"
        alt="Typersonal Logo"
        class="w-32 h-32 object-contain"
      />
      <div>
        <h1
          class="text-4xl font-extrabold tracking-wide leading-tight text-orange-600"
        >
          AI 擴展生成字型
        </h1>
        <p class="text-sm text-gray-500">由字訂藝 Typersonal 提供</p>
      </div>
    </div>

    <!-- 表單區塊 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- 左欄 -->
      <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <div>
          <label class="block mb-1 font-semibold text-gray-700"
            >要生成的字</label
          >
          <input v-model="character" class="input" type="text" maxlength="1" />
        </div>

        <div>
          <label class="block mb-1 font-semibold text-gray-700"
            >精準度 (Sampling Step)</label
          >
          <input
            v-model.number="samplingStep"
            class="w-full accent-orange-500"
            type="range"
            min="10"
            max="30"
            step="5"
          />
          <div class="text-right text-sm text-gray-500 mt-1">
            目前值：{{ samplingStep }}
          </div>
        </div>

        <div>
          <label class="block mb-1 font-semibold text-gray-700"
            >上傳你的手寫字</label
          >
          <input
            type="file"
            accept="image/*"
            @change="onFileChange"
            class="text-sm text-gray-500"
          />
        </div>

        <div class="text-center">
          <button
            class="btn-primary w-full max-w-sm"
            :disabled="loading"
            @click="generate"
          >
            🚀 產生
          </button>
        </div>
      </div>

      <!-- 右欄 -->
      <div class="bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <div>
          <label class="block mb-1 font-semibold text-gray-700">生成結果</label>
          <div v-if="loading" class="text-gray-400">生成中...</div>
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="mt-2 rounded-lg border shadow-md max-w-full"
          />
        </div>

        <div class="pt-4 border-t">
          <label
            class="inline-flex items-center space-x-2 font-semibold text-gray-700"
          >
            <input
              type="checkbox"
              v-model="enableBlend"
              class="accent-yellow-500"
            />
            <span>啟用風格融合</span>
          </label>

          <div v-if="enableBlend" class="pt-4 space-y-5">
            <div>
              <label class="block font-medium text-gray-700"
                >選擇融合風格</label
              >
              <select v-model="styleOption" class="input">
                <option
                  v-for="style in styleOptions"
                  :key="style"
                  :value="style"
                >
                  {{ style }}
                </option>
              </select>
            </div>

            <div>
              <label class="block font-medium text-gray-700"
                >融合比例 (0=A, 1=B)</label
              >
              <input
                type="range"
                v-model.number="alpha"
                min="0"
                max="1"
                step="0.05"
                class="w-full accent-yellow-500"
              />
              <div class="text-right text-sm text-gray-500 mt-1">
                目前值：{{ alpha }}
              </div>
            </div>

            <div>
              <label class="block font-medium text-gray-700">粗細調整</label>
              <input
                type="range"
                v-model.number="thickness"
                min="-1.5"
                max="1.5"
                step="0.1"
                class="w-full accent-yellow-500"
              />
              <div class="text-right text-sm text-gray-500 mt-1">
                目前值：{{ thickness }}
              </div>
            </div>

            <button
              class="btn-secondary w-full"
              :disabled="loading"
              @click="blend"
            >
              🎨 融合預覽
            </button>

            <div v-if="blendImageUrl">
              <label class="block mt-3 font-medium text-gray-700"
                >融合輸出</label
              >
              <img
                :src="blendImageUrl"
                class="rounded-lg border shadow-md mt-2 max-w-full"
              />
            </div>
          </div>

          <div class="pt-4 border-t text-center">
            <button
              class="btn-primary w-full max-w-sm"
              :disabled="!imageUrl || ttfLoading"
              @click="uploadGeneratedToLocal"
            >
              {{ ttfLoading ? "轉換中…" : "產生字型檔" }}
            </button>
            <div v-if="ttfUrl" class="mt-3">
              <a
                :href="ttfUrl"
                download="fontpico.ttf"
                class="underline text-orange-600 font-semibold"
              >
                ⬇️ 重新下載 fontpico.ttf
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

// ✅ 改為你的正式 Cloudflare 代理域名，前後端都走 HTTPS 避免混合內容問題
const API_BASE_URL = "https://typersonal.dy6.click/8000";

const character = ref("體");
const samplingStep = ref(15);
const referenceImage = ref(null);
const imageUrl = ref("");
const loading = ref(false);
const ttfLoading = ref(false);
const ttfUrl = ref(null);

const enableBlend = ref(false);
const styleOption = ref("書法風");
const alpha = ref(0.5);
const thickness = ref(0);
const blendImageUrl = ref("");
const styleOptions = ["書法風", "簡約現代", "潑墨風", "潮流街頭", "可愛手繪"];

const uploading = ref(false);

function onFileChange(e) {
  referenceImage.value = e.target.files[0] || null;
}

async function generate() {
  if (character.value.length !== 1) {
    alert("請輸入單一字元");
    return;
  }
  if (!referenceImage.value) {
    alert("請上傳手寫字圖片");
    return;
  }

  const form = new FormData();
  form.append("character", character.value);
  form.append("sampling_step", samplingStep.value);
  form.append("reference_image", referenceImage.value);

  // 生成
  loading.value = true;
  try {
    const res = await fetch(`${API_BASE_URL}/ai/generate`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error("伺服器回應失敗");
    const data = await res.json();
    imageUrl.value = data.image;
    blendImageUrl.value = "";
  } catch (err) {
    alert("發生錯誤，請檢查伺服器");
    console.error(err);
  } finally {
    loading.value = false;
  }
}

async function blend() {
  if (!enableBlend.value || !imageUrl.value) return;

  try {
    const blob = await fetch(imageUrl.value).then((res) => res.blob());
    const form = new FormData();
    form.append("character", character.value);
    form.append("style_option", styleOption.value);
    form.append("alpha", alpha.value);
    form.append("thickness", thickness.value);
    form.append("image_a", blob, "image_a.png");

    const res = await fetch(`${API_BASE_URL}/ai/blend`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) throw new Error("伺服器回應失敗");
    const data = await res.json();
    blendImageUrl.value = data.image;
  } catch (err) {
    alert("融合失敗，請稍後重試");
    console.error("融合失敗", err);
  }
}

async function uploadGeneratedToLocal() {
  if (!imageUrl.value) {
    alert("請先產生圖片");
    return;
  }
  ttfLoading.value = true;
  ttfUrl.value = null;
  try {
    // ① 下載模型圖片
    const resp = await fetch(imageUrl.value);
    if (!resp.ok) throw new Error("下載生成圖片失敗");
    const blob = await resp.blob();

    // ② 用 codePoint 命名，例如 39636.png
    const filename = `${character.value.codePointAt(0)}.png`;
    const file = new File([blob], filename, { type: "image/png" });

    // ③ 依後端 multer 設定（upload.array('files')）上傳
    const form = new FormData();
    form.append("files", file);

    const res = await axios.post("http://localhost:3001/convert", form, {
      headers: { "Content-Type": "multipart/form-data" },
      responseType: "blob",
    });

    // ④ 取得 TTF Blob 並觸發下載
    const ttfBlob = new Blob([res.data], {
      type: res.headers["content-type"] || "font/ttf",
    });
    const url = URL.createObjectURL(ttfBlob);
    ttfUrl.value = url;

    const a = document.createElement("a");
    a.href = url;
    a.download = "fontpico.ttf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (e) {
    console.error(e);
    alert("轉換失敗：" + e.message);
  } finally {
    ttfLoading.value = false;
  }
}

// ✅ 當 thickness 調整時，自動即時呼叫 blend（前提是已啟用融合且已有圖）
watch(thickness, () => {
  if (enableBlend.value && imageUrl.value) {
    blend();
  }
});
</script>

<style scoped>
.input {
  @apply w-full border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition;
}

.btn-primary {
  @apply bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 shadow-md;
}

.btn-secondary {
  @apply bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 px-6 rounded-xl transition duration-200 shadow-md;
}
</style>
