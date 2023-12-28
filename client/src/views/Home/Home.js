import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import axios from 'axios';
import Marquee from "react-fast-marquee";
import './Home.css';


function Home () {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(''); 
  const searchProduct = async () => {

    if (search === '') {
      getProduct();
      return;
    }

    const response = await axios.get(`/searchproduct`)
    setProducts(response?.data?.data)
  }

  useEffect(() => {
    searchProduct();
  }, [search])

  
  const getProduct = async () => {
    try{
      const responce = await axios.get('/getproducts');
      setProducts(responce?.data?.data)
    }
    catch(err){
      console.log(err.message)
    }
  }
  
  useEffect(() => {
    getProduct();
  }, [])

  const productsData = async () => {
   
    const response = await axios.get("/products")
    setProducts(response?.data?.data)

  
  }
  

  useEffect(() => {
     productsData()
  }, [])

    return(
       <>
      <Navbar/>
      
      <div className="marqee-div">
        
      <Marquee>Don't deposit money or share financial info to anyone claiming to offer reward / lucky draw prize on behalf of Naaptol. Please note we have no relation with NAAPTOLINDIA.COM or any other company having similar names. NAAPTOLINDIA.COM is doing fraud by giving lucrative business offers using name of Naaptol. Please do not pay or deposit any money for any business dealings with NAAPTOLINDIA.COM</Marquee>
      </div>
<div className="bac-color">
          
<div className="poster">
  <img src="https://layout.naptol.com/usr/local/csp/staticContent/naaptolAds/Portable-Electric-Grinder-EG1-Home-Banner-25-07-23.jpg" alt="poster"/>
</div>



       <div className="card-div">
       {
          products.map((product,i) => {
            const {_id, image, title, description,price} = product;

            return(
             
             <div>
               <ProductCard 
              image={image}
              title={title}
              description={description}
              price={price}
              id={_id}
              />
              </div>
            )
          })
        }
       </div>
</div>
       </>
    )
}

export default Home