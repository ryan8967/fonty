<template>
  <div
    class="fixed right-0 top-0 z-50 h-full w-[20vw] bg-white px-[16px] py-[16px] shadow-lg"
  >
    <div class="flex-col w-[20vw]">
      <div class="flex h-[5vw] items-center">
        <p class="ml-[2vw]">訪客User</p>
      </div>
      <hr class="h-1 my-1 bg-gray-200 border-0 rounded-sm dark:bg-gray-300" />
      <div class="pb-[2vw] pt-[2vw]">
        <NuxtLink to="/" @click="$emit('close')">
          <div class="flex h-[5vw] items-center">
            <p class="pl-[2vw]">主頁</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/upload" @click="$emit('close')">
          <div class="flex h-[5vw] items-center">
            <p class="pl-[2vw]">生成字形</p>
          </div>
        </NuxtLink>
        <NuxtLink to="/market" @click="$emit('close')">
          <div class="flex h-[5vw] items-center">
            <p class="pl-[2vw]">商城</p>
          </div>
        </NuxtLink>
      </div>
      <hr />
    </div>
  </div>
</template>

<script setup>
const isSideMenuOpen = useCookie("isSideMenuOpen");
const closeMenu = () => {
  isSideMenuOpen.value = false;
};
</script>

<style scoped></style>
