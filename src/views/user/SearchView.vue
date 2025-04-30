<template>
    <UserLayoutVue>
      <div v-if="route.query.q" class="text-3xl m-4">Search: <b>{{ searchText }}</b></div>
      <Product
        :products="filterProducts"
      ></Product>
    </UserLayoutVue>
  </template>
  
<script setup>
import UserLayoutVue from "@/layouts/UserLayout.vue";
import { ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

import { useProductStore } from "@/stores/user/products";
import Product from "@/components/Product.vue";

const route = useRoute()

const searchText = ref('')

const productStore = useProductStore()

watch(() => route.query.q, (newSearchText) => {
  searchText.value = newSearchText
}, { immediate: true })

const filterProducts = computed(() => {
  return productStore.filterProduct(searchText.value)
})

</script>
  
<style>
</style>