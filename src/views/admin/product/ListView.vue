<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-8 mx-4">
      <div class="text-4xl font-bold text-gray-800">Products</div>
      <div>
        <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-sm btn-primary">
          <Add class="w-5 h-5"></Add>
          <div class="text-sm font-light">Add Product</div>
        </RouterLink>
      </div>
    </div>

    <div class="overflow-x-auto">
      <Table :headers="[
        'id', 'Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated At', ''
      ]">
        <tr v-for="product in adminProductStore.list" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>
            <img class="w-20 h-20 overflow-hidden object-cover" :src="product.imageUrl" />
          </td>
          <td>{{ product.price }}</td>
          <td>{{ product.remain }}/{{ product.quantity }}</td>
          <td>
            <div class="badge gap-2" :class="product.status === 'in stock' ? 'badge-success' : 'badge-error'">{{
              product.status }}</div>
          </td>
          <td>{{ product.updatedAt }}</td>
          <td>
            <div class="flex">
              <RouterLink :to="{ name: 'admin-products-update', params: { id: product.id } }" class="btn btn-ghost">
                <Edit></Edit>
              </RouterLink>
              <div class="btn btn-ghost" @click="handleRomove(product.id)">
                <Trash></Trash>
              </div>
            </div>
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import { onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useAdminProductStore } from '@/stores/admin/products';
import Add from '@/components/icons/Add.vue';
import Edit from '@/components/icons/Edit.vue';
import Trash from '@/components/icons/Trash.vue';
import Table from '@/components/Table.vue';
import { useToast } from 'vue-toastification';

const adminProductStore = useAdminProductStore()
const toast = useToast()

onMounted(() => {
  adminProductStore.loadProduct()
})

const handleRomove = (id) => {
  try {
    const res = adminProductStore.removeProduct(id)
    if(res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
  } catch (err) {
    toast.error('Something went wrong.')
  }
}

</script>

<style></style>