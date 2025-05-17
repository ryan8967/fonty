<template>
  <div class="flex flex-col items-center justify-center pt-[6vw]">
    <h2 class="text-2xl font-semibold mb-4 text-[#3A6B60] underline">
      拍一個字 → 自動生成整套字型
    </h2>
    <div
      v-if="previewUrl"
      class="mt-4 flex items-center justify-center"
      style="height: 30vw"
    >
      <img
        :src="previewUrl"
        alt="Preview"
        class="max-h-full max-w-xs rounded-[5vw] shadow object-contain"
      />
    </div>
    <label
      for="file-upload"
      class="mt-4 flex items-center justify-center min-w-[30vw] min-h-[30vw] cursor-pointer"
    >
      <div
        class="bg-[#5EA897] opacity-25 min-w-[30vw] min-h-[30vw] rounded-[5vw] flex items-center justify-center"
      >
        <img src="/camera.png" alt="" class="h-[6vw]" />
      </div>
    </label>
    <!-- Custom Upload Button BELOW preview -->
    <label
      for="file-upload"
      class="cursor-pointer text-[#E29930] text-xl font-semibold rounded transition mb-4 mt-4"
    >
      <div class="flex flex-row items-center gap-2">
        <img src="/upload.png" alt="" class="h-6" />
        <span>上傳圖片</span>
      </div>
    </label>
    <input
      id="file-upload"
      type="file"
      accept="image/*"
      @change="onFileChange"
      class="hidden"
    />
  </div>
  <div
    class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#3A6B60] w-[30vw] rounded-[10vw] text-center py-2 shadow-lg flex flex-row items-center justify-center gap-2 cursor-pointer"
    @click="$router.push('/create')"
  >
    <img src="/pen-line.png" alt="" class="h-6" />
    <p class="text-white text-xl">進入編輯頁</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const previewUrl = ref(null);

function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    previewUrl.value = URL.createObjectURL(file);
  } else {
    previewUrl.value = null;
  }
}
</script>

<style scoped></style>
