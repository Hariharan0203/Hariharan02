import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "./pages/Add";
import List from "./pages/List";
import Order from "./pages/Order";
import Login from "./components/Login";
 import { ToastContainer, toast } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = "₹"

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):"");

  useEffect(()=>{
          localStorage.setItem('token',token)
  },[token])
  

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <ToastContainer/>
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className="d-flex w-100">
            <Sidebar />
            <div
              className="text-secondary"
              style={{
                width: "70%",
                marginLeft: "max(5vw, 25px)",
                marginTop: "2rem",
                marginBottom: "2rem",
                fontSize: "1rem",
              }}
            >
              <Routes>
                <Route path="/add" element={<Add  token={token}/>} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Order token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
