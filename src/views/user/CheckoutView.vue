<template>
  <UserLayoutVue>
    <h1 class="text-3xl font-semibold m-4 flex items-center space-x-2 cursor-pointer" @click="router.back()">
      <Back />
      <span>Checkout</span>
    </h1>
    <Step :steps="['Cart', 'Shipping & Contact Information', 'Complete']" :active-step="2" />
    <div class="flex my-20 flex-col md:flex-row items-center md:items-start">
      <section class="flex-auto w-full md:w-64 p-5 overflow-y-auto">
        <div v-for="form in FormData" :key="form" class="form-control w-full">
          <label class="label">
            <span class="label-text">{{ form.name }}</span>
          </label>
          <textarea v-if="form.field === 'address'" v-model="userFormData[form.field]"
            class="textarea textarea-bordered textarea-secondary w-full"
            :placeholder="form.placeholder || 'Enter your information'" />
          <input v-if="form.field !== 'address'" v-model="userFormData[form.field]" type="text"
            class="input input-bordered input-secondary w-full"
            :placeholder="form.placeholder || 'Enter your information'" />
        </div>
        <button class="btn btn-block btn-neutral my-10" @click="handleClick">
          CONFIRM CHECKOUT
        </button>
      </section>
      <section class="flex-auto w-full md:w-32 bg-base-200 p-4 overflow-y-auto md:max-h-[calc(70vh-5rem)]">
        <div v-for="item in cartStore.items" :key="item" class="flex">
          <div class="flex flex-1 p-2 items-center justify-center">
            <img class="w-[250px] h-[250px] overflow-hidden object-cover" :src="item.imageUrl" />
          </div>
          <div class="flex-1">
            <div class="flex flex-col justify-start h-full">
              <div class="text-lg font-bold">{{ item.name }}</div>
              <div class="mt-1">Type: {{ item.type }}</div>
              <div class="text-xl mt-1">{{ item.price }} THB</div>
              <div class="mt-1">Quantity: {{ item.quantity }}</div>
              <div class="mt-1">Subtotal: <b>{{ item.quantity * item.price }} THB</b></div>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="px-2">
          <div class="flex justify-between">
            <div class="text-lg"><b>Order Summary</b></div>
            <div class="text-lg"><b>{{ cartStore.summaryQuantity }} Item(s)</b></div>
          </div>
          <div class="flex justify-between mt-2">
            <div>Subtotal</div>
            <div>{{ cartStore.summaryPrice }} THB</div>
          </div>
          <div class="flex justify-between mt-2">
            <div>Shipping</div>
            <div>0 THB</div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="px-2">
          <div class="flex justify-between">
            <div class="text-lg"><b>Order Total</b></div>
            <div class="text-lg"><b>{{ cartStore.summaryPrice }} THB</b></div>
          </div>
        </div>
        <div>

        </div>
      </section>
    </div>
  </UserLayoutVue>
</template>

<script setup>
import UserLayoutVue from "@/layouts/UserLayout.vue";
import { useCartStore } from "@/stores/user/cart";
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import Back from "@/components/icons/Back.vue";
import Step from "@/components/Step.vue";

const router = useRouter()

const userFormData = reactive({
  email: '',
  name: '',
  address: '',
  note: ''
})

const FormData = [
  {
    name: 'Email Address',
    field: 'email',
    placeholder: 'yourname@example.com'
  },
  {
    name: 'Name',
    field: 'name',
    placeholder: 'John Doe'
  },
  {
    name: 'Address',
    field: 'address',
    placeholder: '123 Main St, City'
  },
  {
    name: 'Note',
    field: 'note',
    placeholder: 'Additional notes here'
  }
]

const cartStore = useCartStore()

onMounted(() => {
  const userData = localStorage.getItem('profile-data')
  if(userData){
    const user = JSON.parse(userData)
    userFormData.email = user.email
    userFormData.name = user.name
    userFormData.address = user.address
  }
})

const handleClick = () => {
  cartStore.checkout(userFormData)
  router.push({ name: "success" })
}
</script>

<style></style>