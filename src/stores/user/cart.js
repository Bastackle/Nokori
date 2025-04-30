import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
      items: [],
      checkOut: {}
    }), 
    getters: {
        summaryQuantity(state) {
            return state.items.reduce((acc, item) => {
                return acc + item.quantity
            }, 0)
        },
        summaryPrice(state) {
            return state.items.reduce((acc, item) => {
                return acc + (item.price * item.quantity)
            },0)
        }
    },
    actions: {
        loadCart() {
            const previousCart = localStorage.getItem('cart-data')
            if(previousCart) {
                this.items = JSON.parse(previousCart)
            }
        },
        addItem(productData) {
            try {
                const findProduct = this.items.findIndex(item => {return item.id === productData.id})
                if(findProduct < 0) {
                    productData.quantity = 1 
                    this.items.push(productData)
                } else {
                    const currentItem = this.items[findProduct]
                    this.updateItem(findProduct, currentItem.quantity + 1)
                }
                localStorage.setItem('cart-data', JSON.stringify(this.items))
                return { success: true, message: 'Product Added to Cart!' }
            } catch (err) {
                return { success: false, message: 'Failed to add product to cart at the moment.' }
            }
        },
        updateItem(index, quantity) {
            this.items[index].quantity = quantity
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        removeItem(index) {
            this.items.splice(index, 1)
            localStorage.setItem('cart-data', JSON.stringify(this.items))
        },
        checkout(userData) {
            const orderData = {
                ...userData,
                totalPrice: this.summaryPrice,
                paymentMethod: 'Credit Card',
                createdDate: (new Date).toLocaleString(),
                orderNumber: `AA${Math.floor((Math.random()*90000)+10000 )}`,
                product: this.items,
                shippingPrice: 0,
                orderItem: this.summaryQuantity
            }
            localStorage.setItem('order-data', JSON.stringify(orderData))
            localStorage.removeItem('cart-data')
            this.items = []
        },
        loadCheckOut() {
            const orderData = localStorage.getItem('order-data')
            if(orderData) {
                this.checkOut = JSON.parse(orderData)
            }
        }
    }
  })
  