import { defineStore } from 'pinia'
import { useAdminProductStore } from '../admin/products'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [],
    loaded: false
  }),
  actions: {
    loadProduct() {
      const admin = useAdminProductStore()
      if (!admin.loaded) {
        admin.loadProduct()
      }
      this.list = admin.list
      this.loaded = true
    },
    filterProduct(searchText) {
      return this.list.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
    },
    getProductById(id) {
      return this.list.find(product => product.id === id)
    }
  }
})
