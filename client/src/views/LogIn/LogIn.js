import React, { useState } from "react";
import axios from "axios";
import "./LogIn.css"
import { Link } from "react-router-dom";

export default function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        if (!email || !password) {
            alert('Please enter all fields')
            return
        }
        const response = await axios.get("/login")
        alert(response?.data?.message);
        if (response?.data?.success) {
            window.location.href = "/";
        }

    }
    return (
        <>
            <div>
                <form className="login-form">
                    <h1 className="text-center">Login</h1>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => {
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }} />
                    </div>
                    <button type="button"
                        className="btn-1 login-btn"
                        onClick={login}
                    >Login</button>
<p className="text-right">Create new account &nbsp;
<Link to="/singup" className="register-link"
>Sign up</Link>   
</p>
                </form>
            </div>
        </>
    );
}