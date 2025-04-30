import { defineStore } from 'pinia'

export const useAdminUserStore = defineStore('admin-user', {
  state: () => ({
    list: [
      {
        id: 1,
        fullname: 'Bastackle',
        role: 'admin',
        status: 'active',
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 2,
        fullname: 'MintyNova',
        role: 'manager',
        status: 'inactive',
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 3,
        fullname: 'CodeSama',
        role: 'staff',
        status: 'active',
        updatedAt: (new Date()).toISOString(),
      },   
    ],
    loaded: false
  }),
  actions: {
    getUserById(id) {
      return this.list.find(user => user.id === id)
    },
    updateUser(id, userData) {
      try {
        const user = this.list.find(user => user.id === id);
        if (user) {
          user.fullname = userData.fullname
          user.role = userData.role
          user.status = userData.status
          user.updatedAt = (new Date()).toISOString();
          return { success: true, message: 'Update User successfully!' }
        }
      } catch (err) {
        return { success: false, message: 'Failed to update user!' }
      }
    },
  }
})
