import { defineStore } from 'pinia'

export const useAdminOrderStore = defineStore('admin-order', {
    state: () => ({
        list: [{
            no: 'AA30491',
            customerName: 'John Doe',
            status: 'Payment Completed',
            address: '123 Main St, City',
            paymentMethod: 'Credit card',
            updatedAt: '4/30/2025, 3:04:10 PM',
            products: [{
                id: 1,
                name: 'Short-sleeve Shirt',
                imageUrl: 'https://img.freepik.com/free-photo/man-beige-shirt-pants-casual-wear-fashion_53876-102165.jpg?t=st=1744617543~exp=1744621143~hmac=56067fefda6813e44f963cf4b7ad98af90b72240e81b4f5d47a3238da5ad7e0e&w=1380',
                quantity: 2, 
                about: 'Lightweight linen shirt inspired by clear sky mornings in Tokyo.',
                price: 890,
                type: "Shirts",
            },
            {
                id: 3,
                name: 'Hibi Everyday Pants',
                imageUrl: 'https://reliefwear.jp/cdn/shop/products/ec-01_1024x1024@2x.jpg?v=1645775121',
                quantity: 3, 
                about: 'Minimal tapered pants designed for everyday movement and ease.',
                price: 1090,
                type: "Pants",
            }]
        }],
    }),
    getters: {
        summaryOf: (state) => (order) => {
            return {
                quantity: order.products.reduce((sum, p) => sum + p.quantity, 0),
                totalPrice: order.products.reduce((sum, p) => sum + (p.price * p.quantity), 0)
            }
        }
    },
    actions: {
        getOrderById(id) {
            return this.list.find(order => order.no === id)
        }
    } 
})
  