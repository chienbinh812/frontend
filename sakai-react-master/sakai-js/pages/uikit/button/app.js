import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListDemo from './index' // Component thêm sản phẩm
import ButtonDemo from './index';

export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ButtonDemo />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="/uikit/list" element={<ListDemo />} />
            {/* <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
