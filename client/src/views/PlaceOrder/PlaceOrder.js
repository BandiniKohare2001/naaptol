import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import './PlaceOrder.css'


export default function PlaceOrder() {
    const {_id}=useParams()
    const [product,setproduct]=useState({})
   const loaddata=async()=>{
    const response=await axios.get(`/eco-productbyid/${_id}`)
    setproduct(response?.data?.products)

   }
   const [userid,setUserid]=useState('')
   console.log(userid)
   const checkvalidity=()=>{
    const response =JSON.parse(localStorage.getItem("user"))
    setUserid(response?._id)
     }

   useEffect(()=>{
    loaddata()
    checkvalidity()

   },[])

//    -----quantity-------
const [quantity,setQuantity]=useState(1)
const decre_quantity=()=>{
    if(quantity===1){
        return
    }
    setQuantity(quantity-1)

}
const incre_quantity=()=>{
    setQuantity(quantity+1)
}

const [address,setAddress]=useState('')





const placeorderfunc= async()=>{

     const obj={
        user:userid,
        product:_id,
        quantity:quantity,
        shipping_address:address,
        delivery_charges:delivery,
        status:"shipped"
    }
    const response=await axios.post('/orders',obj)
    if(response?.data?.Order){
        alert(response?.data?.message)
        window.location.href='/myorder'
    }
    else{
        alert(response?.data?.message)
    }
     
}

// -------radio------------
const [delivery,setDelivery]=useState('')
console.log(delivery)




  return (
    <div className='place-or-container'>
   <div className='place-or-child'>
    <img src={product?.image} className='placed-pr-img'/>
      
    </div>
    <div  className='place-or-child'>
        <div className='placed-pr-name'>{product?.name}</div>
        <div className='Placed-pr-des'>{product?.description}</div>
        <div className='placed-or-price'>price:{product?.price}</div>
         <div className='quntity-of-or'>
            <span className='quntity-btn' onClick={decre_quantity}>-</span>
            <span className='quntity'>{quantity}</span>
            <span  className='quntity-btn' onClick={incre_quantity}>+</span>
        </div> 
        <div>
            <div><label htmlFor='fatest'>Regular Delivery</label><input id='fatest' name='delivery_time'      onClick={()=>{
              setDelivery(100)
            }} value={100}  type='radio'/></div>
            <div><label htmlFor='slowest'>Fatest Delivery</label><input id='slowest' name='delivery_time' value={50}   type='radio'       onClick={()=>{
                setDelivery(50)
            }}/></div>
        </div>
        <input type='text' placeholder='enter your shipping address' className='address-field' value={address} onChange={(e)=>{
            setAddress(e.target.value)
        }}/>

        <button type='button' className='btn placed-or-btn' onClick={placeorderfunc}> place your order</button>
  

    </div> 
    </div>
  )
}