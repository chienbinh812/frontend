import axiosClient from "./axiosClient";

// api/employeeApi.js
const warehouseApi = {
  getAll: (params) => {
    const url = "/warehouse";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/warehouse/${id}`;
    return axiosClient.get(url);
  },
  create: async (req) => {
    const url = `/warehouse`;
    return await axiosClient.post(url, JSON.stringify(req));
  },
  update: async (req) => {
    const url = "/warehouse";
    return await axiosClient.put(url, JSON.stringify(req));
  },
  deleteOne: (id) => {
    const url = `/warehouse/${id}`;
    return axiosClient.delete(url);
  },
  deleteMany: (ids) => {
    // const url = "/warehouse";
    const url = `/warehouse/many?ids=${ids}`;
    return axiosClient.delete(url);
  },
  // findByDept: (id) => {
  //   const url = `/departments/${id}`;
  //   return axiosClient.get(url);
  // },
  findByDeptAndPos: (idDept, idPos) => {
    const url = `/warehouse/dept/${idDept}/pos/${idPos}`;
    return axiosClient.get(url);
  },
};
export default warehouseApi;