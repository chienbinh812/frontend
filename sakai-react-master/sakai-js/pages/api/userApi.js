import axiosClient from "./axiosClient";
import axios from "axios";
const userApi = {
  getAllData: async () => {
    const url = "/users/all";
    return await axiosClient.get(url);
  },

  getAll: async (params) => {
    const url = "/users";
    return await axiosClient.get(url, { params });
  },
  get: async (id) => {
    const url = `/users/${id}`;
    return await axiosClient.get(url);
  },

  // getByName: async (name) => {
  //   const url = `/users/search?name=${name}`;
  //   return await axiosClient.get(url);
  // },
  create: async (req) => {
    const url = `/users`;
    return await axiosClient.post(url, JSON.stringify(req));
  },
  update: async (req) => {
    const url = "/users";
    return await axiosClient.put(url, JSON.stringify(req));
  },
//   deleteOne: (id) => {
//     const url = `/users/${id}`;
//     return axiosClient.delete(url);
//   },
//   deleteMany: (ids) => {
//     // const url = "/employees";
//     const url = `http://localhost:8080/api/users/many?ids=${ids}`;
//     return axiosClient.delete(url);
//   },
importExcel: async (formData) => {
  return await axios.post(
    "http://localhost:8080/api/excel/upload",
    formData,
    {
      headers: {
        Accept: "application/json",
        "content-type": "multipart/form-data",
      },
    }
  );
},

};
export default userApi;