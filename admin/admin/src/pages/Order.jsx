import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const statusHandler = async (event, orderId) => {
  try {
    const response = await axios.post(
      `${backendUrl}/api/order/status`,
      { orderId, status: event.target.value },
      { headers: { token } }
    );

    if (response.data.success) {
      await fetchAllOrders();
      toast.success('Status updated');
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error('Something went wrong');
  }
};


  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
  <div className="container my-4">
  <h3 className="mb-4">Order Page</h3>
  <div className="row">
    {orders.map((order, index) => (
      <div key={index} className="col-12 mb-4 p-3 border rounded shadow-sm">
        {/* TOP ROW: left = product/user/address, right = status select */}
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex gap-3 flex-grow-1">
            {/* icon */}
            <div className="flex-shrink-0">
              <img
                src={assets.parcel_icon}
                alt="Parcel"
                className="img-fluid"
                style={{ width: 60 }}
              />
            </div>

            {/* left content */}
            <div className="flex-grow-1">
              {/* product names + sizes (comma separated) */}
              <div className="fw-semibold">
                {order.items.map((it, i) => (
                  <span key={i}>
                    {it.name} <small className="text-muted">({it.size})</small>
                    {i !== order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>

              {/* user + street + city/state/pincode */}
              <div className="text-muted small mt-2">
                <div className="fw-medium">
                  {order.address.firstName} {order.address.lastName}
                </div>
                <div>{order.address.street}</div>
                <div>
                  {order.address.city}, {order.address.state} -{" "}
                  {order.address.zipcode}
                </div>
              </div>
            </div>
          </div>

          {/* select (status) - top right */}
          <div className="ms-2" style={{ minWidth: 180 }}>
            <select value={order.status} className="form-select form-select-sm"onChange={(event)=>statusHandler(event,order._id)}>
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* SECOND ROW: quantity | method | payment | date */}
        <div className="mt-3 d-flex flex-column flex-md-row gap-3 gap-md-4 align-items-start align-items-md-center">
          <div className="small text-muted">
            <strong>Items:</strong>{" "}
            {order.items.reduce((sum, it) => sum + (it.quantity || 1), 0)}
          </div>

          <div className="small text-muted">
            <strong>Method:</strong> {order.paymentMethod}
          </div>

          <div className="small text-muted">
            <strong>Payment:</strong> {order.payment ? "Done" : "Pending"}
          </div>

          <div className="small text-muted">
            <strong>Date:</strong> {new Date(order.date).toLocaleString()}
          </div>
        </div>

        {/* THIRD ROW: price on the right */}
        <div className="mt-2 d-flex justify-content-end">
          <div className="fw-bold">
            {currency}
            {order.amount}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default Orders;
