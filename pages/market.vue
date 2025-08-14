<template>
  <div class="container mx-auto py-8 flex flex-row gap-8">
    <!-- Category Selection on the left -->
    <div class="w-[220px] min-w-[180px] bg-white rounded-lg shadow p-6 h-fit">
      <h2 class="text-xl font-semibold mb-4">分類</h2>
      <ul class="space-y-2">
        <li
          v-for="cat in categories"
          :key="cat"
          :class="[
            'cursor-pointer px-3 py-2 rounded transition',
            selectedCategory === cat
              ? 'bg-[#3A6B60] text-white'
              : 'hover:bg-gray-100',
          ]"
          @click="selectCategory(cat)"
        >
          {{ cat }}
        </li>
      </ul>
    </div>
    <!-- Product Grid -->
    <div class="flex-1">
      <h1 class="text-3xl font-bold mb-8">商城</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <productCard
          v-for="product in filteredProducts"
          :key="product.id"
          :title="product.title"
          :image="product.image"
          :price="product.price"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// 添加認證中介軟體
definePageMeta({
  middleware: 'auth'
})

import { ref, computed } from "vue";
import productCard from "./productCard.vue";

const categories = ["全部", "現代", "經典", "手寫"];
const selectedCategory = ref("全部");

const products = [
  {
    id: 1,
    title: "Elegant Font",
    image: "/image1.png",
    price: "$10",
    category: "現代",
  },
  {
    id: 2,
    title: "Modern Typeface",
    image: "/image2.png",
    price: "$12",
    category: "現代",
  },
  {
    id: 3,
    title: "Classic Script",
    image: "/image3.png",
    price: "$15",
    category: "經典",
  },
  // Add more products as needed
];

const selectCategory = (cat) => {
  selectedCategory.value = cat;
};

const filteredProducts = computed(() =>
  selectedCategory.value === "全部"
    ? products
    : products.filter((p) => p.category === selectedCategory.value)
);
</script>
