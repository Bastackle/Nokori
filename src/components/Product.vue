<template>
    <section class="grid grid-cols-1 gap-4 my-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-4">
        <div v-for="product in products" :key="product.id" @click="handleClick(product.id)"
            class="card bg-base-100 w-full shadow-md cursor-pointer">
            <figure class="w-full h-full overflow-hidden">
                <img class="w-full h-[500px] object-cover" :src="product.imageUrl" alt="Shoes" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    {{ product.name }}
                    <div class="badge badge-secondary">NEW</div>
                </h2>
                <p class="text-base">{{ product.about }}</p>
                <h2 class="font-bold">{{ product.price }} THB</h2>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">{{ product.type }}</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const handleClick = (id) => {
    router.push({
        name: "product",
        params: { id }
    })
}

defineProps({
    products: Array
})

</script>