import React from 'react'
import './OrderCard.css'

export default function OrderCard({orderimg,ordname,quntity,price,shipping_address,delivery_charges,order_status}) {

  const state_of_status={
    pending:"status_danger",
    shipped:"status_warning",
    deliverd:"status_success"
  }
  return (

<div className='ordercard'>
<div className='orderchild1'>
<img className='ordercardimg' src={orderimg}/>
</div>
<div className='orderchild2'>
    <div className='prodname'>{ordname}</div>
    <div className='qunpri'>
        <div className='quntity'>Qyt:{quntity}</div>
        <div className='price'> price:{price}</div>

    </div>
    <div>ShippingAddress:{shipping_address}</div>
    <div>delivery charges:{delivery_charges}</div>

</div>
<div className='orderchild3'>
<div className={state_of_status[order_status] }>{order_status}</div>
</div>
      
    </div>
  )
}
