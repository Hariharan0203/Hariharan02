import React from 'react'
import {assets} from '../assets/assets';
import { Button, Container, Row, Col } from 'react-bootstrap';


const Navbar = ({setToken}) => {
  return (
   <Container fluid className="py-2 px-4 d-flex justify-content-between align-items-center">
  <img
    src={assets.logo}
    alt=""
    style={{ width: 'max(10%, 80px)' }} // Keeps the same responsive width
  />
  <Button onClick={()=>setToken('')} variant="secondary" size="sm">
    Logout
  </Button>
</Container>
  )
}

export default Navbar