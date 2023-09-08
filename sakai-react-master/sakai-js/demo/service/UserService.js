import axios from "axios";

const endpoint = "http://localhost:8080/api/users"


export const UserService = {  
    async getUser(params) {
        const res = axios.get(endpoint, {params});
        return (await res).data;
    },

    async createUser(user) {            
          const res = axios.post(endpoint, user);
          return await res
        
      },
      async updateUser(userId, updatedUser) {
        
          const res = axios.put(`${endpoint}/${userId}`, updatedUser);
          return await res;
      },
    
      async deleteUser(userId) {
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