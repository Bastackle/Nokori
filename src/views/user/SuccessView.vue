<template>
  <UserLayoutVue>
    <h1 class="text-3xl font-semibold m-4 flex items-center space-x-2 cursor-pointer" @click="handleClick">
      <Back />
      <span>Success</span>
    </h1>
    <Step :steps="['Cart', 'Shipping & Contact Information', 'Complete']" :active-step="3" />
    <div class="max-w-5xl mx-auto border border-base-200 p-8 my-10 shadow-md">
      <div>
        <div class="text-2xl font-bold">THANK YOU FOR YOUR ORDER</div>
        <div>Your order # is: <b>{{ orderData.orderNumber }}</b>.</div>
        <div>We've received your order will ship in 5-7 business days</div>
      </div>
      <div class="divider "></div>
      <div class="grid grid-cols-4 gap-2">
        <div>
          <div class="font-bold">Order Date</div>
          <div>{{ orderData.createdDate }}</div>
        </div>
        <div>
          <div class="font-bold">Order Number</div>
          <div>{{ orderData.orderNumber }}</div>
        </div>
        <div>
          <div class="font-bold">Payment Method</div>
          <div>{{ orderData.paymentMethod }}</div>
        </div>
        <div>
          <div class="font-bold">Address</div>
          <div>{{ orderData.address }}</div>
        </div>
      </div>
      <div class="divider "></div>
      <div class="grid grid-cols-4 gap-2">
        <div><b>Product</b></div>
        <div><b></b></div>
        <div><b>Qty</b></div>
        <div><b>Subtotal</b></div>
      </div>
      <div class="divider "></div>
      <div v-for="products in orderData.product" :key="products.id" class="grid grid-cols-4 gap-2 my-5 items-center">
        <div>
          <img class="w-[200px] h-[200px] overflow-hidden object-cover" :src="products.imageUrl" />
        </div>
        <div class="flex flex-col">
          <b>{{ products.name }}</b>
          Type: {{ products.type }}
        </div>
        <div>
          {{ products.quantity }}
        </div>
        <div>
          {{ products.price * products.quantity }} THB
        </div>
      </div>
      <div class="divider "></div>
      <div class="flex justify-between my-2">
         <div class="text-lg"><b>Order Summary</b></div>
         <div class="text-lg"><b>{{ orderData.orderItem }} Item(s)</b></div>
      </div>
      <div class="flex justify-between my-2">
         <div>Subtotal</div>
         <div>{{ orderData.totalPrice }} THB</div>
      </div>
      <div class="flex justify-between my-2">
         <div>Shipping</div>
         <div>{{ orderData.shippingPrice }} THB</div>
      </div>
      <div class="divider "></div>
      <div class="flex justify-between my-2">
         <div class="text-lg"><b>Total Price</b></div>
         <div class="text-lg"><b>{{ orderData.totalPrice + orderData.shippingPrice }} THB</b></div>
      </div>
      <div class="divider "></div>
      <div>If you have any questions, feel free to contact us.</div>
    </div>
  </UserLayoutVue>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/user/cart";
import UserLayoutVue from "@/layouts/UserLayout.vue";
import Back from "@/components/icons/Back.vue";
import Step from "@/components/Step.vue";

const router = useRouter()
const cartStore = useCartStore()
const orderData = ref({})

onMounted(() => {
  cartStore.loadCheckOut()
  if (cartStore.checkOut.orderNumber) {
    orderData.value = cartStore.checkOut
  }
})

const handleClick = () => {
  router.push({name: "home"})
}

</script>

<style></style>