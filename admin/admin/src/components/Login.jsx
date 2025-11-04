import React, { useState } from "react";
import axios from 'axios';
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({setToken}) => {

    const [email,setEmail]= useState("");
    const [password,setPassword] = useState("");

    const onSubmitHandler = async(e) =>{
        try {
           e.preventDefault();   
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
            
            if(response.data.success){
              setToken(response.data.token)
            }else{
              toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="bg-white shadow rounded px-4 py-4"
        style={{ maxWidth: "420px", width: "100%" }}
      >
        <h1 className="fs-3 fw-bold mb-4">Admin Panel</h1>
        <form  onSubmit={onSubmitHandler}>
          <div className="mb-3" style={{ minWidth: "18rem" }}>
            <label className="form-label small fw-medium mb-2">
              Email Address
            </label>
            <input onChange={(e)=>setEmail(e.target.value)}
            value={email}
              type="email"
              className="form-control"
              placeholder="your@email.com"
              required
              autoComplete="email"
            />
          </div>
          <div className="mb-3" style={{ minWidth: "18rem" }}>
            <label className="form-label small fw-medium mb-2">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)}
            value={password}
              type="password"
              className="form-control"
              placeholder="enter your password"
              required
               autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ backgroundColor: "black" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
