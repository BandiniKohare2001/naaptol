import React, { useState } from "react";
import axios from 'axios'
import "./SignUp.css"

export default function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [address, setAddress] = useState("");
    const [gender, setGender] = useState("male");

    const signup = async ()=>{
        if(!name || !email || !mobile || !password || !address ) {
            alert('Please enter all fields')
            return
          }

      const response = await axios.post("/signup" , {
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender: gender
      } )
      alert(response?.data?.message);
      if(response?.data?.success){
        window.location.href = "/login";
      }
     
    }

    return (
        <>
            <div>
                <form className="signup-form">
                  
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e)=>{
                            setName(e.target.value);
                        }} />
                    </div>

                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text"
                        id="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }} />
                    </div>


                    <div>
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }} />
                    </div>


                    <div>
                        <label htmlFor="mobile">Mobile</label>
                        <input type="mobile"
                        id="mobile"
                        className="form-control"
                        placeholder="Enter your mobile"
                        value={mobile}
                        onChange={(e)=>{
                            setMobile(e.target.value);
                        }} />
                    </div>

                   
                    <div>
                     
                        <label htmlFor="address">Address</label>
                        <input type="address"
                        id="address"
                        className="form-control"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e)=>{
                            setAddress(e.target.value);
                        }} />
                    </div>
                    <label>Gender</label>
                    <div>
                   
                        <input type="radio" 
                        name="gender" 
                        className="gender" 
                        checked={gender === "male"}
                        onClick={()=>{
                            setGender("male")
                        }}
                        />
                        <label htmlFor="male">Male</label>

                        <input type="radio" 
                        name="gender" 
                        className="gender" 
                        checked={gender === "female"}
                        onClick={()=>{
                            setGender("female")
                        }}
                        />
                        <label htmlFor="female">Female</label>
                    </div>


                    <button type="button" 
                    className="btn signup-btn"
                    onClick={signup}
                    >Register</button>
                </form>
            </div>
        </>
    );

}