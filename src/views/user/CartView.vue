<template>
  <UserLayoutVue>
    <h1 class="text-3xl font-semibold m-4 flex items-center space-x-2 cursor-pointer" @click="router.back()">
      <Back />
      <span>Shoping Cart</span>
    </h1>
    <Step :steps="['Cart', 'Shipping & Contact Information', 'Complete']" :active-step="1" />
    <div class="flex my-20 flex-col md:flex-row items-center md:items-start">
      <div class="flex-auto w-full md:w-64 p-5 mx-10 overflow-y-auto md:max-h-[calc(70vh-5rem)]">
        <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center">
          <img 
            class="w-64 h-64"
            :src="emptyCart" 
          />
          <div class="text-2xl font-bold my-5">Your Cart is Empty</div>
          <button class="btn btn-wide btn-primary" @click="handleClick">Continue Shopping</button>
        </div>
        <div class="flex cursor-pointer hover:bg-base-200" v-for="(item, index) in cartStore.items" :key="index">
          <div class="flex flex-1 p-5 items-center justify-center">
            <img 
              class="w-[250px] h-[250px] overflow-hidden object-cover" 
              :src="item.imageUrl" 
            />
          </div>
          <div class="flex-1 relative grid grid-cols-2 py-2">
            <div>
              <div class="text-lg font-bold">{{ item.name }}</div>
              <div class="mt-1">Type: {{ item.type }}</div>
              <div div class="text-xl mt-1">{{ item.price }} THB</div>
              <select v-model="item.quantity" @change="changeQuantity($event, index)"
                class="select select-bordered w-full my-2">
                <option v-for="quantity in item.remain" :key="quantity">{{ quantity }}</option>
              </select>
              <div>Subtotal: <b>{{ item.quantity * item.price }} THB</b></div>
            </div>
            <div @click="cartStore.removeItem(index)" class="absolute top-2 right-0">
              <Close />
            </div>
          </div>
        </div>
      </div>
      <div class="flex-auto w-full md:w-32 bg-base-200 p-4 overflow-y-auto">
        <div class="text-xl font-bold">Order Summary</div>
        <div class="my-4">
          <div class="flex justify-between">
            <div>Subtotal</div>
            <div>{{ cartStore.summaryPrice }} THB</div>
          </div>
          <div class="flex justify-between py-4">
            <div>Shipping</div>
            <div>0 THB</div>
          </div>
          <div class="border-t border-base-content py-4 flex justify-between font-semibold">
            <div>Total</div>
            <div>{{ cartStore.summaryPrice }} THB</div>
          </div>
          <button class="btn btn-block btn-neutral" :disabled="cartStore.summaryPrice <= 0" @click="handeCheckout">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  </UserLayoutVue>
</template>

<script setup>
import UserLayoutVue from "@/layouts/UserLayout.vue";
import Close from "@/components/icons/Close.vue";
import Back from "@/components/icons/Back.vue";
import Step from "@/components/Step.vue";
import emptyCart from "@/assets/images/empty-cart.jpg"
import { useCartStore } from "@/stores/user/cart";
import { useRouter } from "vue-router";

const cartStore = useCartStore()
const router = useRouter()

const changeQuantity = (event, index) => {
  const quantity = parseInt(event.target.value)
  cartStore.updateItem(index, quantity)
}

const handeCheckout = () => {
  router.push({ name: 'checkout' })
}

const handleClick = () => {
  router.push({ name: 'search', query: { q: '' } })
}
</script>

<style></style>
