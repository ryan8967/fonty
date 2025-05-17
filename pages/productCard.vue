<template>
  <div class="bg-white rounded-xl shadow-lg p-4 w-[20vw] flex flex-col items-center">
    <img :src="image" :alt="title" class="w-full h-[12vw] object-cover rounded-lg mb-4" />
    <h3 class="text-lg font-bold mb-2">{{ title }}</h3>
    <p class="text-gray-600 mb-2">{{ description }}</p>
    <div class="text-[#3A6B60] font-semibold text-xl mb-4">${{ price }}</div>
    <button
      class="bg-[#3A6B60] text-white px-6 py-2 rounded-full hover:bg-[#295347] transition"
      @click="$emit('buy', id)"
    >
      購買
    </button>
  </div>
</template>

<script setup>
defineProps({
  id: [String, Number],
  image: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  price: { type: [String, Number], required: true }
});
</script>