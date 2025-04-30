<template>
  <AdminLayout>
    <div class="shadow-xl p-8">
      <div class="text-3xl font-bold">Update User</div>
      <div class="divider"></div>
      <div class="grid grid-cols-1 gap-4">
        <label v-for="form in formData" :key="form" class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ form.name }}</span>
          </div>
          <input v-if="form.type === 'text'" type="text" v-model="userData[form.field]" :placeholder="form.placeholder"
            class="input input-bordered w-full" />
          <select v-if="form.type === 'select'" class="select select-bordered" v-model="userData[form.field]">
            <option disabled selected>-- {{ form.placeholder }} --</option>
            <option v-for="choice in form.dropdown" :key="choice">{{ choice }}</option>
          </select>
        </label>
      </div>
      <div class="flex justify-end gap-4 mt-4">
        <button class="btn btn-outline w-24" @click="router.back()">Back</button>
        <button class="btn btn-primary w-24" @click="handleClick">Update</button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref, onMounted, reactive } from "vue";
import { useAdminUserStore } from "@/stores/admin/users";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";

const adminUserStore = useAdminUserStore()
const router = useRouter()
const route = useRoute()
const userId = ref(-1)
const toast = useToast()

onMounted(() => {
  if (route.params.id) {
    userId.value = parseInt(route.params.id)

    const selectedUser = adminUserStore.getUserById(userId.value)
    if (selectedUser) {
      userData.fullname = selectedUser.fullname
      userData.role = selectedUser.role
      userData.status = selectedUser.status
    }
  }
})

const formData = [
  {
    name: "Name",
    field: "fullname",
    type: 'text',
    placeholder: 'Enter user name'
  },
  {
    name: "Role",
    field: "role",
    type: 'select',
    placeholder: 'Select user role',
    dropdown: ['admin', 'manager', 'staff']
  },
  {
    name: "Status",
    field: "status",
    type: 'select',
    placeholder: 'Select user status',
    dropdown: ['active', 'inactive']
  }
]

const userData = reactive({
  fullname: '',
  role: '',
  status: '',
})

const handleClick = () => {
  try {
    const res = adminUserStore.updateUser(userId.value, userData)
    if (res.success) {
      toast.success(res.message)
    } else {
      toast.error(res.message)
    }
    router.push({
      name: 'admin-users'
    })
  } catch (err) {
    toast.error('Something went wrong.')
  }
}
</script>

<style></style>