<template>
  <AdminLayout>
    <div class="shadow-xl p-8">
      <div class="text-3xl font-bold flex items-center space-x-2 cursor-pointer" @click="router.back()">
        <Back /> 
        <span>Order Detail ID: {{ orderData.no }}</span>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <div class="font-bold">Order Date</div>
          <div>{{ orderData.updatedAt }}</div>
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
      <div class="divider"></div>
      <div class="grid grid-cols-4 gap-2">
        <div><b>Product</b></div>
        <div><b></b></div>
        <div><b>Qty</b></div>
        <div><b>Subtotal</b></div>
      </div>
      <div class="divider "></div>
      <div v-for="products in orderData.products" :key="products.name" class="grid grid-cols-4 gap-2 my-5 items-center">
        <div>
          <img class="w-[150px] h-[150px] overflow-hidden object-cover" :src="products.imageUrl" />
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
      <div class="divider"></div>
      <div class="flex justify-between my-2">
        <div class="text-lg"><b>Order Summary</b></div>
        <div class="text-lg"><b>{{ orderData.orderItem }} Item(s)</b></div>
      </div>
      <div class="flex justify-between my-2">
        <div>Subtotal</div>
        <div>{{ summary.totalPrice }} THB</div>
      </div>
      <div class="flex justify-between my-2">
        <div>Shipping</div>
        <div>0 THB</div>
      </div>
      <div class="divider "></div>
      <div class="flex justify-between my-2">
        <div class="text-lg"><b>Total Price</b></div>
        <div class="text-lg"><b>{{ summary.totalPrice + 0 }} THB</b></div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { ref, onMounted } from 'vue';
import { useAdminOrderStore } from '@/stores/admin/order';
import { useRoute, useRouter } from 'vue-router';
import Back from '@/components/icons/Back.vue';

const router = useRouter()
const route = useRoute()
const adminOrderStore = useAdminOrderStore()
const orderId = ref('')
const summary = ref({ quantity: 0, totalPrice: 0 })

const orderData = ref({ products: [] })

onMounted(() => {
  if (route.params.id) {
    orderId.value = route.params.id
    const selected = adminOrderStore.getOrderById(orderId.value)
    summary.value = adminOrderStore.summaryOf(selected)
    orderData.value = selected
  }
})

</script>

<style></style>