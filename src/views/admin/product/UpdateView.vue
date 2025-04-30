<template>
  <AdminLayout>
    <div class="shadow-xl p-8">
      <div class="text-3xl font-bold">{{mode}} Product</div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-4">
        <label v-for="form in formData" :key="form" class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ form.name }}</span>
          </div>
          <input type="text" v-model="productData[form.field]" :placeholder="form.placeholder" class="input input-bordered w-full" />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Type</span>
          </div>
          <select v-model="productData.type" class="select select-bordered">
            <option disabled selected>-- Select product type --</option>
            <option v-for="type in productType" :key="type">{{ type }}</option>
          </select>
        </label> 
      </div>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <label class="form-control">
          <div class="label">
            <span class="label-text">About</span>
          </div>
          <textarea class="textarea textarea-bordered h-24" v-model="productData.about" placeholder="Write a short description"></textarea>
        </label>
      </div>
      <div class="divider"></div>
      <div class="grid grid-cols-2 gap-4">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Status</span>
          </div>
          <select v-model="productData.status" class="select select-bordered">
            <option disabled selected>-- Select product status --</option>
            <option>in stock</option>
            <option>Out of Stock</option>j
          </select>
        </label>
      </div>
      <div class="flex justify-end gap-4 mt-4">
        <button class="btn btn-outline w-24" @click="router.back()">Back</button>
        <button class="btn btn-primary w-24" @click="handleClick">{{ mode }}</button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref, onMounted, reactive } from "vue";
import { useAdminProductStore } from "@/stores/admin/products";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()
const productId = ref(-1)
const mode = ref('Add')
const toast = useToast();

onMounted(() => {
  if(route.params.id) {
    productId.value = parseInt(route.params.id)
    mode.value = 'Edit'

    const selectedProduct = adminProductStore.getProductById(productId.value)
    if(selectedProduct){
      productData.name = selectedProduct.name
      productData.imageUrl = selectedProduct.imageUrl
      productData.quantity = selectedProduct.quantity
      productData.about = selectedProduct.about
      productData.status = selectedProduct.status
      productData.price = selectedProduct.price
      productData.type = selectedProduct.type
    }
  }
})

const productType = ['Shirts', 'Pants', 'Shoes', 'Accessories', 'Others']

const productData = reactive({
  name: '',
  imageUrl: '',
  quantity: '',
  about: '',
  status: '',
  price: '',
  type: '',

})

const formData = [
  {
    name: "Name",
    field: "name",
    placeholder: "Enter product name"
  },
  {
    name: "Image",
    field: "imageUrl",
    placeholder: "Upload product image"
  },
  {
    name: "Quantity",
    field: "quantity",
    placeholder: "Enter quantity in stock"
  },
  {
    name: "Price",
    field: "price",
    placeholder: "Enter product price"
  },
];

const handleClick = () => {
  const product = {
    ...productData,
    quantity: parseInt(productData.quantity),
    price: parseFloat(productData.price),
  }
  console.log(product)
  if(mode.value === 'Edit') {
    try{
      const res = adminProductStore.updateProduct(productId.value, product)
      if(res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  } else {
    try {
      const res = adminProductStore.addProduct(product)
      if(res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (err) {
      toast.error('Something went wrong.')
    }
  }
  router.push({
    name: "admin-products"
  })
}
</script>

<style></style>
