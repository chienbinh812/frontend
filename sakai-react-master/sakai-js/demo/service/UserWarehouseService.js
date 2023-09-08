import axios from "axios";

const endpoint = "http://localhost:8080/api/user-warehouse"


export const UserWarehouseService = {  
    async getUserWarehouse(params) {
        const res = axios.get(endpoint, {params});
        return (await res).data;
    },

    async createUserWarehouse(user) {            
          const res = axios.post(endpoint, user);
          return await res
        
      },
      async updateUserWarehouse(userId, updatedUser) {
        try {
          const res = await axios.put(`${endpoint}/${userId}`, updatedUser);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error updating user:", error);
          throw error;
        }
      },
    
      async deleteUserWarehouse(userId) {
        try {
          const res = await axios.delete(`${endpoint}/${userId}`);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error deleting user:", error);
          throw error;
        }
      },
}; 