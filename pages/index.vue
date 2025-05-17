<template>
  <div class="home bg-[#F8F3EA]">
    <!-- Carousel Section -->
    <div class="carousel rounded-[30px] pt-[5vh]">
      <div
        class="carousel-wrapper"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          class="carousel-slide"
          v-for="(slide, index) in slides"
          :key="index"
        >
          <img :src="slide.image" :alt="slide.alt" />
        </div>
      </div>
      <button class="carousel-control prev" @click="prevSlide">‹</button>
      <button class="carousel-control next" @click="nextSlide">›</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const slides = ref([
  { image: "/image1.png", alt: "Slide 1" },
  { image: "/image2.png", alt: "Slide 2" },
  { image: "/image3.png", alt: "Slide 3" },
]);

const currentSlide = ref(0);

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};
</script>

<style scoped>
.carousel {
  position: relative;
  width: 50%;
  max-width: 60%;
  max-height: 20%;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-wrapper {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  min-width: 100%;
}

.carousel img {
  width: 100%;
  height: auto;
  display: block;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 30px;
  z-index: 10;
}

.carousel-control.prev {
  left: 14px;
}

.carousel-control.next {
  right: 14px;
}
</style>