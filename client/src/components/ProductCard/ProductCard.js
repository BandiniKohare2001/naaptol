import React, {useEffect, useState} from 'react'
import axios from 'axios'
import './ProductCard.css'
import { Link } from 'react-router-dom'

export default function ProductCard({ _id, name, image, description, price }) {
  
  const [cart, setCart] = useState([]);
  // const [products, setProducts] = useState([]);

  useEffect(() => {
    getCart();
  }, []);
  
  const getCart = async () => {
    try {
      const response = await axios.get('/get-cart');
      setCart(response.data.cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post('/add-to-cart', {
        productId,
        quantity: parseInt(quantity),
      });
      console.log(response.data.message);
      // Refresh the cart after adding an item
      getCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    
  }
  return (

    <div className='productcard'>
        <img src={image} className='product-img'/>
        <div className='product-body'>
            <div className='product-name'>{name}</div>
            <div className='product-price'>Price:₹{price}</div>
            <div className='discription'>{description} </div>
            <div className='btns'>
            <Link to={`/placeorder/${_id}`}><button type='button' className='btn-1 buynow-btn'>Buy now</button> </Link>
            <button onClick={addToCart} className='btn2'>Add to Cart</button>
            </div>


        </div>
      
    </div>
  
  )
}