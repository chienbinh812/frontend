import axios from "axios";

const endpoint = "http://localhost:8080/api/warehouse"


export const WarehouseService = {  
    async getWarehouse(params) {
        const res = axios.get(endpoint, {params});
        return (await res).data;
    },

    async createWarehouse(warehouse) {            
          const res = axios.post(endpoint, warehouse);
          return await res
        
      },
      async updateWarehouse(warehouseId, updatedwarehouse) {
        try {
          const res = await axios.put(`${endpoint}/${warehouseId}`, updatedwarehouse);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error updating warehouse:", error);
          throw error;
        }
      },
    
      async deleteWarehouse(warehouseId) {
        try {
          const res = await axios.delete(`${endpoint}/${warehouseId}`);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error deleting warehouse:", error);
          throw error;
        }
      },
}; 