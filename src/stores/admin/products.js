import { defineStore } from 'pinia'

export const useAdminProductStore = defineStore('admin-product', {
  state: () => ({
    list: [
      {
        id: 1,
        name: 'Short-sleeve Shirt',
        imageUrl: 'https://img.freepik.com/free-photo/man-beige-shirt-pants-casual-wear-fashion_53876-102165.jpg?t=st=1744617543~exp=1744621143~hmac=56067fefda6813e44f963cf4b7ad98af90b72240e81b4f5d47a3238da5ad7e0e&w=1380',
        quantity: 20,
        remain: 10, 
        about: 'Lightweight linen shirt inspired by clear sky mornings in Tokyo.',
        status: 'in stock',
        price: 890,
        type: "Shirts",
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 2,
        name: 'Kumo Oversized Tee',
        imageUrl: 'https://d3lc44byil53r.cloudfront.net/sites/files/aforarcade/images/products/202409/640x960/takara_oversized_sheer_tee_in_kumo_6.jpg',
        quantity: 20,
        remain: 10, 
        about: 'Soft cotton tee with a cloud-like feel — oversized for daily comfort.',
        status: 'in stock',
        price: 590,
        type: "T-Shirts",
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 3,
        name: 'Hibi Everyday Pants',
        imageUrl: 'https://reliefwear.jp/cdn/shop/products/ec-01_1024x1024@2x.jpg?v=1645775121',
        quantity: 20,
        remain: 10, 
        about: 'Minimal tapered pants designed for everyday movement and ease.',
        status: 'in stock',
        price: 1090,
        type: "Pants",
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 4,
        name: 'Mizu Flow Shirt',
        imageUrl: 'https://i5.walmartimages.com/seo/Japanese-Calligraphy-Water-Mizu-Kanji-Love-Japan-T-Shirt_e3c26cd4-1018-43fb-8177-7053e62ada46.9c9eec1791a5e4af8c372204eba2bbce.jpeg',
        quantity: 20,
        remain: 10, 
        about: 'Fluid rayon shirt with subtle texture, perfect for calm days.',
        status: 'in stock',
        price: 990,
        type: "Shirts",
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 5,
        name: 'Shin Basic Tee',
        imageUrl: 'https://cf.shopee.vn/file/b8395ae8db5fcd3dc4906a20169f56f6',
        quantity: 20,
        remain: 10, 
        about: 'Classic fit t-shirt with clean lines and organic cotton.',
        status: 'in stock',
        price: 490,
        type: "T-Shirts",
        updatedAt: (new Date()).toISOString(),
      },
      {
        id: 6,
        name: 'Haiku Button-down',
        imageUrl: 'https://s7d5.scene7.com/is/image/UrbanOutfitters/49197171_031_b?$xlarge$&fit=constrain&qlt=80&wid=683',
        quantity: 20,
        remain: 10, 
        about: 'Semi-formal shirt with a poetic structure — effortless & clean.',
        status: 'in stock',
        price: 1190,
        type: "Shirts",
        updatedAt: (new Date()).toISOString(),
      },
    ],
    loaded: false
  }),
  actions: {
    loadProduct() {
      const product = localStorage.getItem('admin-products')
      if(product) {
        this.list = JSON.parse(product)
        this.loaded = true
      } else {
        localStorage.setItem('admin-products', JSON.stringify(this.list))
      }
    },
    filterProduct(searchText) {
      return this.list.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()))
    },
    getProductById(id) {
      if(!this.loaded) {
        this.loadProduct()
      }
      return this.list.find(product => product.id === id)
    },
    addProduct(productData) {
      try {
        const lastProduct = this.list[this.list.length - 1];
        const newId = lastProduct ? lastProduct.id + 1 : 1;
        productData.id = newId;

        productData.remain = productData.quantity
        productData.updatedAt = (new Date()).toISOString()

        this.list.push(productData)
        localStorage.setItem('admin-products', JSON.stringify(this.list))

        return { success: true, message: 'Add Product successfully!' }
      } catch (err) {
        return { success: false, message: 'Failed to add product!' }
      }
    },
    updateProduct(id, productData) {
      try {
        const product = this.list.find(product => product.id === id);
        if (product) {
          product.name = productData.name;
          product.imageUrl = productData.imageUrl;
          product.price = productData.price;
          product.quantity = productData.quantity;
          product.remain = productData.quantity
          product.status = productData.status;
          product.updatedAt = (new Date()).toISOString();
          localStorage.setItem('admin-products', JSON.stringify(this.list))
          return { success: true, message: 'Update Product successfully!' }
        }
      } catch (err) {
        return { success: false, message: 'Failed to update product!' }
      }
    },
    removeProduct(id) {
      try {
        const index = this.list.findIndex(product => product.id === id);
        if (index !== -1) {
          this.list.splice(index, 1);
          localStorage.setItem('admin-products', JSON.stringify(this.list))
          return { success: true, message: 'Delete Product successfully!' }
        }
      } catch (err) {
        return { success: false, message: 'Failed to delete product!' }
      }
    }
  }
})
