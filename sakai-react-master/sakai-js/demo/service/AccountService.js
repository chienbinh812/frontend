import axios from "axios";

const endpoint = "http://localhost:8080/api/account"


export const AccountService = {  
    async getAccount() {
        const res = axios.get(endpoint);
        return await res;
    },

    async createAccount(account) {            
          const res = axios.post(endpoint, account);
          return await res
        
      },
      async updateAccount(accountId, updatedAccount) {
        try {
          const res = await axios.put(`${endpoint}/${accountId}`, updatedAccount);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error updating Account:", error);
          throw error;
        }
      },
    
      async deleteAccount(accountId) {
        try {
          const res = await axios.delete(`${endpoint}/${accountId}`);
          return res.data;
        } catch (error) {
          // Handle error here
          console.error("Error deleting Account:", error);
          throw error;
        }
      },
}; 