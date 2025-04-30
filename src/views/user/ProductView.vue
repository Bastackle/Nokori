<template>
    <UserLayoutVue>
        <div class="flex flex-col md:flex-row justify-center p-10 md:pd-10 gap-6 max-w-6xl mx-auto">
            <div class="w-full md:w-1/2 flex items-center justify-center">
                <figure class="overflow-hidden p-4">
                <img
                    class="w-[400px] h-[500px] object-cover"
                    :src="product.imageUrl"/>
                </figure>   
            </div>
            <div class="w-full md:w-1/2 p-4 ">
                <div class="text-2xl font-semibold mt-4">{{ product.name }}</div>
                <div class="text-gray-500 mb-4">
                    Type: {{ product.type }}
                    <span v-if="product.remain > 0">| In Stock</span>
                </div>
                <div class="my-10 leading-relaxed">{{ product.about }}</div>
                <div class="text-3xl font-bold my-10">{{ product.price }} THB</div>
                <div>
                    <button class="btn btn-block btn-neutral" :disabled="product.remain <= 0" @click="handleClick(product)">
                        {{ product.remain <= 0 ? 'OUT OF STOCK' : 'ADD TO CART' }}
                    </button>
                </div>
            </div>
        </div>
    </UserLayoutVue>
</template>

<script setup>
import UserLayoutVue from "@/layouts/UserLayout.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "@/stores/user/products";
import { useCartStore } from "@/stores/user/cart";
import { useToast } from "vue-toastification";

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const toast = useToast()
const isLogged = ref(false)

const product = productStore.getProductById(parseInt(route.params.id))

const handleClick = (product) => {
    try {
        if(localStorage.getItem('isLogged')) {
            isLogged.value = true
        }
        if(isLogged.value === true) {
            console.log("Add to cart")
            const res = cartStore.addItem(product)
            if(res.success) {
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
        } else {
            toast.error('Please Login First')
        }
    } catch (err) {
        toast.error('Something went wrong.')
    }
}

</script>

<style>

</style>