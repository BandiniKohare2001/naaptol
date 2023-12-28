import React from 'react'
import axios from 'axios'
import './ProductCard.css'
import { Link } from 'react-router-dom'

export default function ProductCard({ _id, name, image, description, price }) {
  return (

    <div className='productcard'>
        <img src={image} className='product-img'/>
        <div className='product-body'>
            <div className='product-name'>{name}</div>
            <div className='product-price'>Price:₹{price}</div>
            <div className='discription'>{description} </div>
            <div className='btns'>
            <Link to={`/placeorder/${_id}`}><button type='button' className='btn-1 buynow-btn'>Buy now</button> </Link>
            <button type='button' className='btn-2'>Add to card</button>
            </div>


        </div>
      
    </div>
  
  )
}