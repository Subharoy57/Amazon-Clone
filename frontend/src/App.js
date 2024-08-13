import React, { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import styled from "styled-components" 
import Home from './Components/Home'   
import Login from './Components/Login' 
import SignUp from './Components/Signup'
import Checkout from './Components/Checkout'
import Address from './Components/Address'
import Payment from './Components/Payment'  
import AddProduct from './Components/AddProduct' 
import { Elements } from '@stripe/react-stripe-js' 
import { loadStripe } from '@stripe/stripe-js'  
import Orders from './Components/Orders'
import SingleP from './Components/SingleP'
import SingleProduct from './Components/SingleProduct'

const promise=loadStripe(
  "write your keys here" 
);


function App() {  
 
  return (
      <Router>
       <Container>
        <Routes>
        <Route path="/" element={<Home  />} />    
        <Route path="/login" element={<Login />} />  
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/checkout" element={<Checkout />} />     
        <Route path="/singleproduct" element={<SingleProduct />} />      
        <Route path="/address" element={<Address />} />  
        <Route path="/payment" element={<Elements stripe={promise}><Payment /></Elements>} />      
        <Route path="/addproduct" element={<AddProduct />} />  
        <Route path="/orders" element={<Orders />} />  
       
        
        </Routes>
       </Container>
      </Router>
  ) 
}
const Container=styled.div`
 width:100%
`  
export default App 


