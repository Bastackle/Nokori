<template>
  <UserLayoutVue>
    <h1 class="text-3xl font-semibold m-4 flex items-center space-x-2 cursor-pointer" @click="router.back()">
      <Back />
      <span>Profile</span>
    </h1>
    <div class="max-w-5xl mx-auto border border-base-200 p-8 my-10 shadow-md">
      <div class="text-3xl font-extrabold">PROFILE</div>
      <div class="flex flex-col items-center my-5">
        <div class="avatar mb-5">
          <div class="w-72 rounded-full">
            <img :src="userFormData.imageUrl" />
          </div>
        </div>
        <label for="file-upload"
          class="text-sm text-primary hover:underline underline-offset-2 cursor-pointer flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
          <span>Change Profile Picture</span>
        </label>
        <input type="file" id="file-upload" class="hidden" @change="handleFileUpload" />
        <div v-for="form in FormData" :key="form" class="form-control w-full">
          <label class="label mt-2">
            <span class="label-text text-2xl font-extrabold">{{ form.name }}</span>
          </label>
          <textarea v-if="form.field === 'address'" v-model="userFormData[form.field]"
            class="textarea textarea-bordered textarea-secondary w-full"
            :placeholder="form.placeholder || 'Enter your information'"/>
          <input v-if="form.field !== 'address'" v-model="userFormData[form.field]" type="text" 
            class="input input-bordered input-secondary w-full"
            :placeholder="form.placeholder || 'Enter your information'" />
        </div>
        <button class="btn btn-primary w-full mt-5" @click="handleClick">SAVE</button>
      </div>
    </div>
  </UserLayoutVue>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import UserLayoutVue from "@/layouts/UserLayout.vue";
import Back from "@/components/icons/Back.vue";
import { useAuthStore } from "@/stores/auth";
import { useToast } from "vue-toastification";

const router = useRouter()
const authStore = useAuthStore()
const toast = useToast()

const userFormData = reactive({
  email: '',
  name: '',
  address: '',
  imageUrl: ''
})

const FormData = [
  {
    name: 'EMAIL ADDRESS',
    field: 'email',
    placeholder: 'yourname@example.com'
  },
  { 
    name: 'NAME',
    field: 'name',
    placeholder: 'John Doe'
  },
  {
    name: 'ADDRESS',
    field: 'address',
    placeholder: '123 Main St, City'
  }
]

onMounted(() => {
  console.log(authStore.profile)
  if (authStore.profile) {
    userFormData.email = authStore.profile.email;
    userFormData.name = authStore.profile.name;
    userFormData.address = authStore.profile.address;
    userFormData.imageUrl = authStore.profile.imageUrl;
  }
})

const handleClick = () => {
  try {
    const res = authStore.updateProfile(userFormData)
    if(res.success) {
      window.location.reload()
    } else {
      toast.error(res.message)
    }
  } catch (err) {
    toast.error('Something went wrong.')
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];  
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      userFormData.imageUrl = e.target.result;
      console.log(userFormData.imageUrl)
    };
    reader.readAsDataURL(file);  
  }
}

</script>

<style></style>