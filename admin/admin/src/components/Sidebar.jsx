import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className="border-end vh-100" style={{ width: '18%' }}>
      <div
        className="d-flex flex-column pt-4 ps-5"
        style={{ fontSize: '15px', gap: '1rem' }}
      >

        <Nav.Link
          as={NavLink}
          to="/add"
          className={({ isActive }) =>
            `d-flex align-items-center px-2 py-2 border rounded-start ${
              isActive ? 'bg-primary text-white' : ''
            }`
          }
        >
          <img src={assets.add_icon} alt="" style={{ width: '20px', height: '20px' }} />
          <span className="d-none d-md-block ms-2">Add Items</span>
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/list"
          className={({ isActive }) =>
            `d-flex align-items-center px-2 py-2 border rounded-start ${
              isActive ? 'bg-primary text-white' : ''
            }`
          }
        >
          <img src={assets.order_icon} alt="" style={{ width: '20px', height: '20px' }} />
          <span className="d-none d-md-block ms-2">List Items</span>
        </Nav.Link>

        <Nav.Link
          as={NavLink}
          to="/orders"
          className={({ isActive }) =>
            `d-flex align-items-center px-2 py-2 border rounded-start ${
              isActive ? 'bg-primary text-white' : ''
            }`
          }
        >
          <img src={assets.order_icon} alt="" style={{ width: '20px', height: '20px' }} />
          <span className="d-none d-md-block ms-2">Orders</span>
        </Nav.Link>

      </div>
    </div>
  );
};

export default Sidebar;
