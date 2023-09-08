// import React, { use, useEffect, useState } from "react";
// import { BrowserRouter,Routes,Route } from "react-router-dom";

// import axios from "axios";

// const endpoint = "http://localhost:8000/api/product"

// export const UserService = {
//     async getUser() {
//         const res = axios.get(endpoint);
//         return await res;
//     },
// } 

//     // //POST
//     // useEffect(() => {
//     //     axios.post(endpoint, {

//     //     })
//     //     .then(res => setData(res.data))
//     //     .catch(err => console.log(err));
//     // },
//     // []);

//     // //PUT
//     // useEffect(() => {
//     //     axios.post(endpoint, {

//     //     })
//     //     .then(res => setData(res.data))
//     //     .catch(err => console.log(err));
//     // },
//     // []);

//     // //DELETE
//     // useEffect(() => {
//     //     axios.delete()
//     //     .then(res => setData(res.data))
//     //     .catch(err => console.log(err));
//     // });

//     return (
//         <div className="table">
//             <div className="mt-3">
//                 <h3>product</h3>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>id</th>
//                             <th>name</th>
//                             <th>price</th>
//                             <th>date</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             data.map((product, index) => {  
//                                 return <tr key={index}>
//                                     <td>{product.id}</td>
//                                     <td>{product.name}</td>
//                                     <td>{product.price}</td>
//                                     <td>{product.dateOfManufacture}</td>
//                                 </tr>
//                             })
//                         }
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     )
// }