import axiosClient from "./axiosClient";

const productApi = {
  getAll: (params) => {
    const url = "/product";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/product/${id}`;
    return axiosClient.get(url);
  },
  create: (req) => {
    const url = `/product`;
    return axiosClient.post(url, { req });
  },
  update: (req) => {
    const url = "/product";
    return axiosClient.put(url, { req });
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
};
export default productApi;