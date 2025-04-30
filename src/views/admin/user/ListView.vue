<template>
  <AdminLayout>
    <div class="flex items-center justify-between mb-8 mx-4">
      <div class="text-4xl font-bold text-gray-800">Users</div>
    </div>

    <div class="overflow-x-auto">
      <Table :headers="[
        'id', 'Name', 'Role', 'Status', 'Updated At', ''
      ]">
        <tr v-for="user in adminUserStore.list" :key="user">
          <td>{{ user.id }}</td>
          <td>{{ user.fullname }}</td>
          <td>{{ user.role }}</td>
          <td>
            <div class="badge gap-2" :class="user.status === 'active' ? 'badge-success' : 'badge-error'">{{
              user.status }}</div>
          </td>
          <td>{{ user.updatedAt }}</td>
          <td>
            <div class="flex">
              <RouterLink :to="{ name: 'admin-users-update', params: { id: user.id } }" class="btn btn-ghost">
                <Edit></Edit>
              </RouterLink>
              <div class="btn btn-ghost" @click="handleChange(user.id)">
                <Connect v-if="user.status !== 'active'"></Connect>
                <Disconnect v-if="user.status === 'active'"></Disconnect>
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
import Table from '@/components/Table.vue';
import Edit from '@/components/icons/Edit.vue';
import Connect from '@/components/icons/Connect.vue';
import Disconnect from '@/components/icons/Disconnect.vue';
import { useAdminUserStore } from '@/stores/admin/users';
import { useToast } from 'vue-toastification';

const adminUserStore = useAdminUserStore()
const toast = useToast()

const handleChange = (id) => {
  try {
    let selected = adminUserStore.getUserById(id)
    if(selected.status === 'active') {
      selected.status = 'inactive'
    } else {
      selected.status ='active'
    }
    const res = adminUserStore.updateUser(id, selected)
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }

  } catch (err) {
    toast.error('Something went wrong.')
  }
  
}

</script>

<style>

</style>