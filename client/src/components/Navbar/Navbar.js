import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [products, setProducts] = useState([]);
    const [user, setUser] = useState({});
    // const [fulluser,setFulluser]=useState("");
    const [search, setSearch] = useState('');
    // useEffect(()=>{
    //     const response=JSON.parse(localStorage.getItem("user") || "{}")
    //     setUser(response)
    //     loaduser()
    //  },[])
    // const logoutfunc=()=>{
    //   localStorage.removeItem("user")
    //   window.location.href='/login'
    // }
    // const loaduser=()=>{
    //   const response=JSON.parse(localStorage.getItem('user'))
    //   setFulluser(response)
      
    //   }
    
    

    useEffect(()=>{
      const localuser = JSON.parse(localStorage.getItem('localuser') || "{}");
      setUser(localuser);
    },[])
    
    const logout  = ()=>{
      localStorage.removeItem('localuser');
      window.location.href= '/login';
      alert('Logout Succesfully..!')
    }
     
  return (
    <div className='navbar'>
      <div className='logo'>
      <Link  className='navlink' to={'/'}><img src='https://images.naptol.com/usr/local/csp/staticContent/images_layout-html5/Logo_130X70.png' alt='logonaptol' /></Link>
   
      </div>
      <div>
     <input type="text" 
className="input-search"
placeholder="search product " 
value={search}
onChange={(e)=>{
  setSearch(e.target.value)
}}
/>
</div>
      <ul>
        <li><Link  className='navlink'  to={'/singup'}>Singup</Link></li>
        <li><Link  className='navlink' to={'/login'}>Login</Link></li>
        <li><Link  className='navlink' to={'/myorder'}>My Order</Link></li>
        
      </ul>
      <div className='user'>
      <p className="username">👨🏻‍💼{user?.name || ""}</p>
           {
            user?.name ?  <p className="logpout" onClick={logout}>Logout</p> : null
           }
      </div>
    </div>
  )
}