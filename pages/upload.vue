<template>
  <div class="flex flex-col items-center justify-center pt-[6vw]">
    <h2 class="text-2xl font-semibold mb-4 text-[#3A6B60] underline">
      拍一個字 → 自動生成整套字型
    </h2>
    <div
      v-if="previewUrl"
      class="mt-4 flex items-center justify-center"
      style="height: 25vw"
    >
      <img
        :src="previewUrl"
        alt="Preview"
        class="max-h-full max-w-xs rounded-[5vw] shadow object-contain"
      />
    </div>
    <label
    v-if="!previewUrl"
      for="file-upload"
      class="mt-4 flex items-center justify-center w-[25vw] h-[25vw] cursor-pointer"
    >
      <div
        class="bg-[#5EA897] opacity-25 w-[25vw] h-[25vw] rounded-[5vw] flex items-center justify-center"
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
    class="fixed left-1/2 -translate-x-1/2 bg-[#3A6B60] w-[30vw] rounded-[10vw] text-center py-2 shadow-lg flex flex-row items-center justify-center gap-2 cursor-pointer mt-[3vw]"
    @click="generate"
  >
    <img src="/pen-line.png" alt="" class="h-6" />
    <p class="text-white text-xl">進入編輯頁</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"
const router = useRouter();
// ✅ 改為你的正式 Cloudflare 代理域名，前後端都走 HTTPS 避免混合內容問題
const API_BASE_URL = 'https://typersonal.dy6.click/8000'

const character = ref('體')
const samplingStep = ref(15)
const referenceImage = ref(null)
const imageUrl = ref('')
const loading = ref(false)


// function onFileChange(e) {
//   referenceImage.value = e.target.files[0] || null
// }

async function generate() {
  if (character.value.length !== 1) {
    alert('請輸入單一字元')
    return
  }
  if (!referenceImage.value) {
    alert('請上傳手寫字圖片')
    return
  }

  const form = new FormData()
  form.append('character', character.value)
  form.append('sampling_step', samplingStep.value)
  form.append('reference_image', referenceImage.value)

  loading.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/ai/generate`, {
      method: 'POST',
      body: form
    })
    if (!res.ok) throw new Error('伺服器回應失敗')
    const data = await res.json()
    imageUrl.value = data.image
    localStorage.setItem('fonty_api_image', data.image)
    previewUrl.value = null // <-- 新增這行，清空 preview
    router.push('/create');
  } catch (err) {
    alert('發生錯誤，請檢查伺服器')
    console.error(err)
  } finally {
    loading.value = false
  }
}
const previewUrl = ref(null);

function onFileChange(event) {
  const file = event.target.files[0];
  referenceImage.value = file || null
  if (file) {
    previewUrl.value = URL.createObjectURL(file);
  } else {
    previewUrl.value = null;
  }
}

</script>

<style scoped></style>
