import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({token}) => {

   const [list,setList] = useState([])

   const fetchList = async () =>{
    
   try {
    const token = localStorage.getItem("token");
    const response = await axios.get(backendUrl + '/api/product/list',{headers:{token}})
     
    if(response.data.success){
      setList(response.data.products);

    } else{
      toast.error(response.data.message)
    }     

    
    
   } catch (error) {
        console.log(error);
        toast.error(error.message);
        
   }
  }
   const removeProduct = async (id) => {
  try {
    const token = localStorage.getItem("token"); // ✅ access token here
    const response = await axios.post(
      backendUrl + "/api/product/remove",
      { _id:id },
      { headers: { token } }
    );

    if (response.data.success) {
      toast.success(response.data.message);
      await fetchList(); // ✅ refresh after delete
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
           
useEffect(()=>{
  fetchList()
},[])

  return (
    <>
  <p className="mb-2">All Product List</p>

  <div className="d-flex flex-column gap-2">
    {/* List Table Title */}
    <div className="d-none d-md-grid" style={{ 
      display: "grid", 
      gridTemplateColumns: "1fr 3fr 1fr 1fr 1fr" 
    }}>
      <div className="py-1 px-2 border bg-light text-sm">
        <b>Image</b>
      </div>
      <div className="py-1 px-2 border bg-light text-sm">
        <b>Name</b>
      </div>
      <div className="py-1 px-2 border bg-light text-sm">
        <b>Category</b>
      </div>
      <div className="py-1 px-2 border bg-light text-sm">
        <b>Price</b>
      </div>
      <div className="py-1 px-2 border bg-light text-sm text-center">
        <b>Action</b>
      </div>
    </div>

    {/* Product List */}
    {list.map((item, index) => (
      <div key={index} className="d-flex align-items-center border p-2 gap-3">
        <img
          src={item.image[0]}
          alt=""
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
        <p className="mb-0 flex-grow-1">{item.name}</p>
        <p className="mb-0 flex-grow-1">{item.category}</p>
        <p className="mb-0 flex-grow-1">
          {currency}
          {item.price}
        </p>
        <p onClick={()=>removeProduct(item._id)} className="mb-0 text-danger" style={{ cursor: "pointer" }}>
          X
        </p>
      </div>
    ))}
  </div>
</>

  )
}

export default List