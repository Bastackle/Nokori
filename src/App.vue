<template>
  <RouterView />
</template>

<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useCartStore } from './stores/user/cart';
import { useProductStore } from './stores/user/products';

const cartStore = useCartStore()
const productStore = useProductStore()

onMounted(() => {
  productStore.loadProduct()
  cartStore.loadCart()
})

</script>
