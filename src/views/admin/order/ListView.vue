<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-8 mx-4">
      <div class="text-4xl font-bold text-gray-800">Orders</div>
    </div>

    <div class="overflow-x-auto">
      <Table :headers="[
        'id', 'Customer Name', 'Price', 'Status', 'Updated At', ''
      ]">
        <tr v-for="order in adminOrderStore.list" :key="order">
          <td>{{ order.no }}</td>
          <td>{{ order.customerName }}</td>
          <td>{{ adminOrderStore.summaryOf(order).totalPrice }}</td>
          <td>
            <div class="badge gap-2" :class="order.status === 'Payment Completed' ? 'badge-success' : 'badge-error'">{{order.status }}</div>
          </td>
          <td>{{ order.updatedAt }}</td>
          <td>
            <RouterLink :to="{ name: 'admin-oreders-detail', params: { id: order.no } }" class="btn btn-primary">
              SEE DETAILS
            </RouterLink>  
          </td>
        </tr>
      </Table>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import Table from '@/components/Table.vue';
import { useAdminOrderStore } from '@/stores/admin/order';

const adminOrderStore = useAdminOrderStore()

</script>

<style>

</style>