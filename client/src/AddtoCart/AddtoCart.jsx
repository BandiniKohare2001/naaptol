import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard/ProductCard';

function AddtiCart() {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products when the component mounts
    fetchProducts();
    // Fetch cart items when the component mounts
    getCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
    //   Refresh the cart after adding an item
      getCart();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
    <h1>Shopping Cart App</h1>

    <h2>Products</h2>
    <div className="products">
      {
      products.map((product) => {
                  const {title, description, price} = product;
        <div key={product._id} className="product-card">
          {
          product ? (
            <>
              <h3>{title}</h3>
              <p>{description}</p>
              <p>Price: ${price}</p>
              <button onClick={() => addToCart(product._id, 1)}>Add to Cart</button>
            </>
          ) : (
            <p>Loading...</p>
            // or any other fallback UI when product is null/undefined
          )}
        </div>
})}
    </div>

    <h2>Shopping Cart</h2>
    <ul>
      {cart.map((item) => (
        <li key={item._id}>
          {/* Add conditional check for item.product existence */}
          {item.product ? (
            <>
              {item.product.title} - Quantity: {item.quantity}
            </>
          ) : (
           <div><ProductCard/></div>
            // or any other fallback UI when item.product is null/undefined
          )}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default AddtiCart;
