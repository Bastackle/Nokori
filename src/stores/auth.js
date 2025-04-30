import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isLogged: !!localStorage.getItem('isLogged'),
        profile: null
    }),
    actions: {
        login(userFormData) {
            this.isLogged = true
            localStorage.setItem('isLogged', true)

            const existingProfile = localStorage.getItem('profile-data')
            if (existingProfile) {
                this.profile = JSON.parse(existingProfile)
            } else {
                this.profile = userFormData
                localStorage.setItem('profile-data', JSON.stringify(userFormData))
            }
        },
        logout(){
            this.isLogged = false
            localStorage.removeItem('isLogged');
            localStorage.removeItem('cart-data')
            localStorage.removeItem('order-data')
        },
        loadProfile() {
            const data = localStorage.getItem('profile-data')
            if(data) {
                this.profile = JSON.parse(data)
            }
        },
        updateProfile(updatedProfile) {
            try {
                this.profile = { ...this.profile, ...updatedProfile }
                localStorage.setItem('profile-data', JSON.stringify(this.profile))
                return { success: true, message: 'Update Profile successfully!' }
            } catch (err) {
                return { success: false, message: 'Failed to update profile!' }
            }
        }
    }
})