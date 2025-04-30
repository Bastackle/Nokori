<template>
  <UserLayoutVue>
    <div class="hero min-h-screen"
    :style="{
      backgroundImage: `url(${bgImage})`,
    }">
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="hero-content text-neutral-content text-center">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold">Made for every day.</h1>
          <p class="mb-5">
            Designed with a minimal spirit and thoughtful detail, our pieces bring calm and clarity to your wardrobe,
            day by day.
          </p>
          <button class="btn btn-md btn-white hover:btn-primary" @click="handleClick">Shop Now</button>
        </div>
      </div>
    </div>
    <Product
      :products="productStore.list"
    ></Product>
  </UserLayoutVue>
</template>

<script setup>
import UserLayoutVue from "@/layouts/UserLayout.vue";
import { useProductStore } from "@/stores/user/products";
import Product from "@/components/Product.vue";
import { useRouter } from "vue-router";
import bgImage from '@/assets/images/bg-hero.jpg'

const router = useRouter()
const productStore = useProductStore()

const handleClick = () => {
  router.push({
    name: 'search',
    query: {
      q: ''
    }
  })
}
</script>

<style></style>