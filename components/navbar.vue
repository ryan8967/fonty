<template>
  <div class="w-full bg-[#E4D5C7]">
    <nav :class="{ 'shrinked-nav': isSideMenuOpen }">
      <div
        class="flex h-[4.5rem] items-center justify-between px-[5vh] transition-all duration-700"
      >
        <!-- Left Side: Logo and Title -->
        <NuxtLink to="/">
          <div class="flex flex-row items-center gap-2">
            <div class="flex item-start">
              <h1 class="font-bold text-3xl">Typersonal</h1>
            </div>
            <div>
              <img src="/typersonal.png" alt="Logo" class="h-auto w-auto" />
            </div>
          </div>
        </NuxtLink>

        <!-- Right Side: Login and Menu Icons -->
        <div class="flex items-center gap-5 justify-end">
          <NuxtLink to="/login">
            <img
              src="/login.png"
              alt="Login"
              class="h-8 w-8 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </NuxtLink>
          <img
            class="h-8 w-8 cursor-pointer transition-transform duration-300 hover:scale-110"
            src="/menus.png"
            alt="Menu"
            @click="toggleMenu"
          />
        </div>
      </div>
    </nav>
    <transition name="fade">
      <div v-if="isSideMenuOpen" class="overlay" @click="closeMenu"></div>
    </transition>
    <transition name="slide">
      <SideMenu
        class="fixed right-0 top-0 z-50 flex h-full bg-white px-[16px] py-[16px] shadow-lg"
        v-if="isSideMenuOpen"
        @close="isSideMenuOpen = false"
      />
    </transition>
  </div>
  <slot />
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useRouter } from "vue-router";

const isSideMenuOpen = ref(false);

const toggleMenu = () => {
  isSideMenuOpen.value = !isSideMenuOpen.value;
};

const closeMenu = () => {
  isSideMenuOpen.value = false;
};
</script>

<style scoped>
.shrinked-nav {
  width: 80vw;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to,
.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
</style>
