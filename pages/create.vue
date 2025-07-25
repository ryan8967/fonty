<template>
  <div class="flex flex-row w-full gap-[3vw]">
    <div class="w-[50%] pl-[7vw] pt-[5vw]">
      <p class="text-[#3A6B60] underline font-semibold text-xl">預覽</p>
      <div
        class="bg-white w-full h-[20vw] rounded-[3vw] shadow flex items-center justify-center mt-[3vw]"
      >
        <img
          v-if="previewImage"
          :src="previewImage"
          alt="預覽"
          class="max-h-full max-w-full object-contain"
        />
        <span v-else class="text-gray-400">尚無預覽圖片</span>
      </div>
      <div class="flex justify-center mt-4">
        <button
          @click="blend"
          class="bg-[#E29930] text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-[#c47d1a] transition"
        >
          產生風格字型
        </button>
      </div>
      <div class="pt-[5vw]">
        <input
          type="text"
          class="border border-gray-300 rounded-[3vw] px-3 py-2 w-full"
          placeholder="輸入你想預覽的字"
          v-model="character"
        />
      </div>
    </div>

    <div class="w-[50%] pr-[7vw] flex flex-col">
      <div class="pt-[5vw] flex flex-col">
        <div class="flex flex-row items-start gap-6 mt-4">
          <div>
            <img src="/green-pen.png" alt="" class="w-[2vw]" />
          </div>
          <div class="flex flex-col gap-6 w-full pt-[3vw]">
            <div class="flex items-center gap-2 w-full">
              <span class="mr-2 w-10 text-right">比例</span>
              <input
                type="range"
                min="1"
                max="10"
                v-model="modern"
                class="flex-1 accent-[#FFFFFF] h-2 rounded-lg"
              />
              <span class="ml-2 w-10 text-left">書法</span>
            </div>
            <div class="flex items-center gap-2 w-full">
              <span class="mr-2 w-10 text-right">細</span>
              <input
                type="range"
                min="-1.5"
                max="1.5"
                v-model="thickness"
                class="flex-1 accent-[#FFFFFF] h-2 rounded-lg"
              />
              <span class="ml-2 w-10 text-left">粗</span>
            </div>
          </div>
        </div>
        <div class="items-start gap-6 pt-[5vw]">
          <div class="flex flex-row items-center gap-2 w-[20vw]">
            <img src="/star.png" alt="" class="w-[2vw]" />
            <span>風格標籤</span>
          </div>
          <div class="grid grid-cols-3 gap-4 w-full pt-[3vw] font-semibold">
            <div
              v-for="option in styleOptions"
              :key="option"
              @click="toggleTag(option)"
              class="rounded-[5vw] text-center py-2 shadow cursor-pointer transition-colors"
              :class="
                styleOption.includes(option)
                  ? 'bg-[#E29930] text-white'
                  : 'bg-[#C4583A] text-white'
              "
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#3A6B60] w-[25vw] rounded-[10vw] text-center py-2 shadow-lg flex flex-row items-center justify-center cursor-pointer"
    @click="$router.push('/create')"
  >
    <p class="text-white text-xl">確認生成</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const API_BASE_URL = "https://typersonal.dy6.click/8000";
const imageUrl = ref("");
const previewImage = ref("");
// const thickness = ref(5);
// const modern = ref(5);
// const cursive = ref(5);

const character = ref("體");
const enableBlend = ref(true);
const alpha = ref(0.5);
const thickness = ref(0);
const blendImageUrl = ref("");

onMounted(() => {
  const img = localStorage.getItem("fonty_api_image");
  imageUrl.value = img || "";
  previewImage.value = img || "";
});

// Use an array for multiple selection
const styleOption = ref([]);
const styleOptions = ["書法風", "簡約現代", "潑墨風", "潮流街頭", "可愛手繪"];

function toggleTag(option) {
  console.log("切換標籤:", option);
  if (styleOption.value[0] === option) {
    styleOption.value = [];
  } else {
    styleOption.value = [option];
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
    previewImage.value = data.image;
  } catch (err) {
    alert("融合失敗，請稍後重試");
    console.error("融合失敗", err);
  }
}
</script>
<style scoped>
input[type="range"] {
  /* Remove default styling for consistency */
  -webkit-appearance: none;
  appearance: none;
  /* width: 100%; */
  background: transparent;
  margin: 0;
  padding: 0;
  height: 32px; /* enough height for centering */
  position: relative;
}

/* Track */
input[type="range"]::-webkit-slider-runnable-track {
  background: #e4d5c7;
  height: 8px;
  border-radius: 8px;
  margin-top: 12px; /* push track down for centering */
}
input[type="range"]::-moz-range-track {
  background: #e4d5c7;
  height: 8px;
  border-radius: 8px;
}
input[type="range"]::-ms-fill-lower,
input[type="range"]::-ms-fill-upper {
  background: #e4d5c7;
  height: 8px;
  border-radius: 8px;
}

/* Thumb */
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #d0c2b5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  margin-top: -8px; /* half of thumb height minus half of track height */
  cursor: pointer;
  border: none;
  box-shadow: 0 0 2px #aaa;
}
input[type="range"]::-moz-range-thumb {
  background: #d0c2b5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 2px #aaa;
}
input[type="range"]::-ms-thumb {
  background: #d0c2b5;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 2px #aaa;
}

/* Remove outline and background on focus */
input[type="range"]:focus {
  outline: none;
}

/* Hide the outline for Firefox */
input[type="range"]::-moz-focus-outer {
  border: 0;
}

/* For IE */
input[type="range"]::-ms-tooltip {
  display: none;
}
</style>
