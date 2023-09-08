import axios from "axios";

const endpoint = "http://localhost:8080/api/product"

export const ProductService = {

    // getProductsSmall() {
    //     return fetch('/demo/data/products-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // },

    // getProducts() {
    //     return fetch('/demo/data/products.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // },

    // getProductsWithOrdersSmall() {
    //     return fetch('/demo/data/products-orders-small.json', { headers: { 'Cache-Control': 'no-cache' } })
    //         .then((res) => res.json())
    //         .then((d) => d.data);
    // }

    async getProduct() {
        const res = axios.get(endpoint);
        return await res;
    },

    async createProduct(product) {            
          const res = axios.post(endpoint, product);
          return await res
        
      },
      async updateProduct(productId, updatedProduct) {
        try {
          const res = await axios.put(`${endpoint}/${productId}`, updatedProduct);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error updating product:", error);
          throw error;
        }
      },
    
      async deleteProduct(productId) {
        try {
          const res = await axios.delete(`${endpoint}/${productId}`);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error deleting product:", error);
          throw error;
        }
      },

};


