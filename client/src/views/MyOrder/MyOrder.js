import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import axios from 'axios'
import OrderCard from '../../components/OrderCard/OrderCard'
import "./MyOrder.css";

export default function MyOrder() {
    const [user,setUser]=useState('')
    const [orders,setOrders]=useState([])
    const userid=user?._id
 

const loadorder=async()=>{
    if(!user){
        return
    }
    const response= await axios.get(`/byuserid/${userid}`)
    setOrders(response?.data?.Order)
    
}
useEffect(()=>{
    loadorder()

},[user])

    const loaddata=()=>{
        const response =JSON.parse(localStorage.getItem("user"))
        setUser(response)
        // if(response==null){
        //     alert('you are not login yet ')
        //     window.location.href='/login'
        //   }
    }
    useEffect(()=>{
        loaddata()
   
      
    },[])
  return (
    <div>
        <Navbar/>
        <h1 className='headig-order'> My Order</h1>
        {
     orders?orders.map((order,i)=>{
        return  <OrderCard orderimg={order?.product?.image} ordname={order?.product?.name} price={order?.product?.price} shipping_address={order?.shipping_address} 
        quntity={order?.quantity} order_status={order?.status}
         delivery_charges={order?.delivery_charges}  />
  
       }):<h1>You have 0 Order</h1>
        }
      
    </div>
  )
}