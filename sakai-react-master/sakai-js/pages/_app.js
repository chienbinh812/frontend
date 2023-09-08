import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';


export default function MyApp({ Component, pageProps }) {
    
    if (Component.getLayout) {
        return <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>;
    } else {
        return (
            <LayoutProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </LayoutProvider>
        );
    }
    
}
// //GET
// function getPost() {
//     useEffect(() => {
//         axios.get(endpoint)
//         .then(res => setData(res.data))
//         .catch(err => console.log);
//     },
//     []);    
// }

// //Post
// function postPost() {
//     useEffect(() => {
//         axios.post(endpoint)
//         .then(res => setData(res.data))
//         .catch(err => console.log);
//     },
//     []);    
// }

// //PUT 
// function putPost() {
//     useEffect(() => {
//         axios.put(endpoint)
//         .then(res => setData(res.data))
//         .catch(err => console.log);
//     },
//     []);    
// }

// //DELETE
// function deletePost() {
//     useEffect(() => {
//         axios.delete(endpoint)
//         .then(res => setData(res.data))
//         .catch(err => console.log);
//     },
//     []);    
// }
