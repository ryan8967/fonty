<template>
  <div class="flex flex-row w-full gap-[3vw]">
    <div class="w-[50%] pl-[7vw] pt-[5vw]">
      <p class="text-[#3A6B60] underline font-semibold text-xl">預覽</p>
      <div
        class="bg-white w-full h-[20vw] rounded-[3vw] shadow flex items-center justify-center mt-[3vw]"
      ></div>
      <div class="pt-[5vw]">
        <input
          type="text"
          class="border border-gray-300 rounded-[3vw] px-3 py-2 w-full"
          placeholder="輸入你想預覽的字"
          v-model="previewText"
        />
      </div>
    </div>

    <div class="w-[50%] pr-[7vw] flex flex-col">
      <div class="pt-[5vw] flex flex-col">
        <div class="flex flex-row items-start gap-6 mt-4">
          <div>
            <img src="/green-pen.png" alt="" class="w-[2vw]" />
          </div>
          <div class="flex flex-col gap-6 w-full">
            <div class="flex items-center gap-2 w-full">
              <span class="mr-2 w-10 text-right">現代</span>
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
              <span class="mr-2 w-10 text-right">標準</span>
              <input
                type="range"
                min="1"
                max="10"
                v-model="cursive"
                class="flex-1 accent-[#FFFFFF] h-2 rounded-lg"
              />
              <span class="ml-2 w-10 text-left">手寫</span>
            </div>
            <div class="flex items-center gap-2 w-full">
              <span class="mr-2 w-10 text-right">粗</span>
              <input
                type="range"
                min="1"
                max="10"
                v-model="thickness"
                class="flex-1 accent-[#FFFFFF] h-2 rounded-lg"
              />
              <span class="ml-2 w-10 text-left">細</span>
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
              v-for="tag in tags"
              :key="tag"
              @click="toggleTag(tag)"
              class="rounded-[5vw] text-center py-2 shadow cursor-pointer transition-colors"
              :class="
                selectedTags.includes(tag)
                  ? 'bg-[#E29930] text-white'
                  : 'bg-[#C4583A] text-white'
              "
            >
              {{ tag }}
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
const previewText = ref("");
const thickness = ref(5);
const modern = ref(6);
const cursive = ref(4);

// Use an array for multiple selection
const selectedTags = ref([]);
const tags = [
  "柔和",
  "剛硬",
  "可愛",
  "優雅",
  "個性",
  "復古",
  "現代",
  "科技",
  "浪漫",
];

// Toggle tag selection
function toggleTag(tag) {
  const idx = selectedTags.value.indexOf(tag);
  if (idx === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(idx, 1);
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
